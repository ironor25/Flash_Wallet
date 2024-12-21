const cors = require('cors');
const Moralis = require('moralis').default;
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Use the dynamic port provided by Render or default to 3000
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route to handle '/'
app.get('/', (req, res) => {
    res.send('Server is running. Use /getTokens for API.');
});

// Route for getting tokens, NFTs, and transactions
app.get('/getTokens', async (req, res) => {
    try {
        const { userAddress, chain } = req.query;
        
        const tokens = await Moralis.EvmApi.token.getWalletTokenBalances({
            chain: chain,
            address: userAddress,
        });

        const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
            chain: chain,
            address: userAddress,
            mediaItems: true,
        });

        const txns = await Moralis.EvmApi.transaction.getWalletTransactions({
            chain: chain,
            order: 'DESC',
            address: userAddress,
        });

        const jsonResponse = {
            tokens: tokens.raw,
            nfts: nfts.raw,
            txns: txns.raw,
        };

        return res.status(200).json(jsonResponse);
    } catch (e) {
        console.error(e.message);
        return res.status(400).json({ message: 'Internal Server Error' });
    }
});

// Start Moralis and the server
Moralis.start({
    apiKey: process.env.API_KEY,
}).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log('Moralis started successfully');
    });
});
