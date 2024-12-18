import express from 'express';
import Moralis from "moralis"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()



const port = 3001

// Initialize Moralis with your app ID and server URL
app.use(cors())
app.use(express.json())

app.get('/getTokens', async (req,res) => {
    

    const {userAddress, chain} = req.query
    const tokens = await Moralis.EvmApi.token.getWalletTokenBalances({
        "chain": chain,
        "address": userAddress
    })
    
    const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
        chain: chain,
        address: userAddress,
        mediaItems: true,
    })
    const txns = await Moralis.EvmApi.transaction.getWalletTransactions({
        "chain": "0xaa36a7",
        "order": "DESC",
        "address": "0xc692033998618c14b448f640Dc82C5fE1158Efa5"
      });

    const jsonResponse = {
        tokens: tokens.raw,
        nfts: nfts.raw,
        trxns: txns.raw,
    }

    return res.status(200).json(jsonResponse)
    
})
    app.get('/txns', async (req, res) => {
        try {
       
          
        
          console.log(response.raw);
        } catch (e) {
          console.error(e);
        }

    })

await Moralis.start({
    apiKey: process.env.API_KEY,
}).then((response) => {
    app.listen(port,() => {
        console.log('Moralis started successfully')
    })
    
})