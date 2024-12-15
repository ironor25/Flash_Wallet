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

    const jsonResponse = {
        tokens: tokens.raw
    }

    return res.status(200).json(jsonResponse)
    
})

await Moralis.start({
    apiKey: process.env.API_KEY,
}).then((response) => {
    app.listen(port,() => {
        console.log('Moralis started successfully')
        console.log( process.env.API_KEY)
    })
    
})