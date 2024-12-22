import React from 'react'
import { BulbOutlined } from '@ant-design/icons';
import { Button,Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {ethers} from "ethers";

const {TextArea} = Input
function Import_page  ({setSeedPhrase,setWallet}){
  const navigate = useNavigate()
  const [typedSeed, settypedSeed] = useState("")
  const [nonValid, setnonValid] = useState(false)

  function seedStore(e){
    setnonValid(false)
    settypedSeed(e.target.value)
  }
  function recoverWallet(){
    let recoverWallet;
    try{
      recoverWallet = ethers.Wallet.fromPhrase(typedSeed)

    }
    catch(e){
      setnonValid(true)
      return;
    }
    setWallet(recoverWallet.address)
    setSeedPhrase(typedSeed)
   
    return  navigate("/dashboard");
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center px-4 py-12">
    <div className="w-full max-w-md space-y-6 bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-800">
      {/* Alert Box */}
      <div className="flex items-center space-x-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-left">
        <BulbOutlined className="h-6 w-6 text-yellow-500 flex-shrink-0" />
        <p className="text-yellow-200 text-sm">
          Type your seed phrase in the field below to recover your wallet 
          (it should include 12 words separated with spaces)
        </p>
      </div>
     <TextArea 
     value={typedSeed}
     onChange={seedStore} 
     rows={4} 
     placeholder='Type your seed phrase here....'
     className="w-full bg-black/50 placeholder-gray-500 rounded-lg p-4 border border-gray-800 focus:border-gray-600 focus:ring-1
      focus:ring-gray-600 focus:outline-none transition-colors resize-none"/>

     <Button 
     disabled={
       typedSeed.split(' ').length!== 12 || typedSeed.slice(-1) === ''
     }
     type="primary" 
     size="large" 
     style={{ width: '100%' }} 
      onClick={() => recoverWallet()}
      className="w-full bg-white text-black py-3 rounded-lg font-semibold shadow-lg 
                   disabled:opacity-100 disabled:cursor-not-allowed
                   hover:bg-gray-100 transition-all duration-300
                   enabled:hover:shadow-white/"
    >
      Recover Wallet
    </Button>
    {nonValid && <p style={{ color: 'red' }}>Invalid Seed Phrase</p>}
    <p
         onClick={() => navigate('/')}
         className="text-blue-500 cursor-pointer hover:underline"
      >
          Back Home
      </p>
    </div>
  </div>
  )
}

export default Import_page;