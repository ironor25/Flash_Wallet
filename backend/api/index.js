// Import required modules
const cors = require('cors');
const Moralis = require('moralis').default;
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

// Initialize the app
const app = express();

// Use dynamic port provided by Render or fallback to 3000
const port = process.env.PORT || 3000;

// Middleware

const corsOrigin ={
    origin:'*', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Server is running. Use /getTokens for API.');
});

// /getTokens route
app.get('/getTokens', async (req, res) => {
    try {
        const { userAddress, chain } = req.query;

        // Validate query parameters
        if (!userAddress || !chain) {
            return res.status(400).json({ message: 'Missing required query parameters: userAddress and chain' });
        }

        console.log('Received request:', { userAddress, chain });

        // Fetch wallet token balances
        const tokens = await Moralis.EvmApi.token.getWalletTokenBalances({
            chain,
            address: userAddress,
        });

        // Fetch wallet NFTs
        const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
            chain,
            address: userAddress,
            mediaItems: true,
        });

        // Fetch wallet transactions
        const txns = await Moralis.EvmApi.transaction.getWalletTransactions({
            chain,
            address: userAddress,
            order: 'DESC',
        });

        console.log('Data fetched successfully:', { tokens: tokens.raw.length, nfts: nfts.raw.length, txns: txns.raw.length });

        // Respond with the data
        return res.status(200).json({
            tokens: tokens.raw,
            nfts: nfts.raw,
            txns: txns.raw,
        });
    } catch (error) {
        console.error('Error in /getTokens:', error.message);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Start Moralis and the server
Moralis.start({
    apiKey: process.env.API_KEY,
}).then(() => {
    console.log('Moralis started successfully');

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error('Failed to start Moralis:', error);
});
