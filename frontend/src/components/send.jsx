import {useState,React} from 'react'
import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Chains_Config } from '../chain';
import {ethers} from 'ethers';


const [sendToAddress, setSendToAddress] = useState(null);
const [amountToSend, setAmountToSend] = useState(null);
const [processing, setProcessing] = useState(false);
const [hash, setHash] = useState(null);

function Send(wallet,selectedNetwork,seedPhrase) {
    const navigate = useNavigate();


    async function sendCrypto(to , amount){
        const chain =  Chains_Config[selectedNetwork]   
        const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
        const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey;

        const wallet = new ethers.Wallet(privateKey, provider);
        const tx = {
            to: to,
            value: ethers.parseEther(amount.toString())
        }

        setProcessing(true);
        try{
            const transaction = await wallet.sendTransaction(tx);
            setHash(transaction.hash);
            const receipt = await transaction.wait();
            setHash(null)
            setProcessing(false);
            setAmountToSend(null);
            setSendToAddress(null);

            
                
        }
    catch(error){
        console.error("Error sending transaction:", error);
        setAmountToSend(null);
        setSendToAddress(null);
    }
    }


    return (
        <div className="min-h-screen flex items-center justify-center p-4">
        <div
        className="w-full max-w-md bg-gradient-to-b from-black via-gray-900 to-black rounded-2xl p-6 border
         border-zinc-800 shadow-lg space-y-3"
        style={{ maxHeight: "700px", maxWidth: "400px", width: "90%" }}
        >
            <div className=" text-white bg-gray-700 rounded-xl p-6 mb-6 border
             border-gray-800 shadow-inner space-y-5">
                
                <div className="flex flex-col w-full">
                    <label className="text-zinc-100 font-mono">Recipient Address</label>
                    <input type="text" 
                    value={sendToAddress}
                    onChange={(e) => setSendToAddress(e.target.value)}
                    className="bg-gray-800 border border-zinc-800 rounded p-2 text-zinc-100 font-mono" 
                    placeholder="Enter receiver's address"/>
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-zinc-100 font-mono">Amount</label>
                    <input type="text" 
                    value={amountToSend}
                    onChange={(e) => setAmountToSend(e.target.value)}
                    className="bg-gray-800 border border-zinc-800 rounded p-2 text-zinc-100 font-mono"
                    placeholder="Enter crypto amount" />
                </div>
                
                <Button 
            type="default"
            className="bg-zinc-400 hover:bg-zinc-700 text-black border-none ml-24"
           >
            <SendOutlined />Send</Button>
            {processing && <>  
            
             </>}
            </div>
            <p
         onClick={() => navigate('/dashboard')}
         className="text-blue-500 cursor-pointer hover:underline"
          >
          Back to Dashboard
      </p>
        </div>
    </div>
    )
}

export default Send;