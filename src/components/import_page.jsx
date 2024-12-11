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
    <div className="bg-white max-w-md mx-auto shadow-xl rounded-2xl p-6 
    font-sans border-2 border-purple-50 space-y-6 m-28"
    style={{
      textAlign: 'center',
      padding: '20px',
  }}>
      <div className="flex items-center space-x-4  border-2 rounded-md border-yellow-500 bg-yellow-100">
            <BulbOutlined style={{ fontSize: '25px', color: '#fa8c16' }} />
            <div style={{ textAlign: 'left' }}>
                Type your seed phrase in the field given below to recover your 
                wallet (it should include 12 words separated with spaces)
            </div>
     </div>
     <TextArea 
     value={typedSeed}
     onChange={seedStore} 
     rows={4} 
     placeholder='Type your seed phrase here....'/>

     <Button 
     disabled={
       typedSeed.split(' ').length!== 12 || typedSeed.slice(-1) === ''
     }
     type="primary" size="large" style={{ width: '100%' }} 
      onClick={() => recoverWallet()}
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
  )
}

export default Import_page;