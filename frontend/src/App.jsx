import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Create_page from './components/create_page';
import Import_page from './components/import_page';
import Dashboard from './components/Dashboard';
import Receive from './components/receive';
import Send from './components/send';
import { Select } from 'antd';

function CryptoWallet(){
  const [selectedNetwork, setSelectedNetwork] = useState('0xaa36a7');
  const [seedPhrase,setSeedPhrase] = useState(null)
  const [wallet,setWallet] = useState(null)


  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col">
          {/* Header */}
          <header className="py-6 bg-black/50 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white tracking-wider">
            Flash <span className="text-gray-400">Wallet</span>
          </h1>
         
          <Select
            onChange={(value) => setSelectedNetwork(value)}
            value={selectedNetwork}
            options={[
             
              { label: 'Sepolia Testnet', value: '0xaa36a7' },
              { label: 'Ethereum', value: '0x1' },
              { label: 'Polygon', value: '0x89' },
              { label: 'Avalanche', value: '0xa86a' },
              {label: "Polygon Amoy", value: '0x13882'},
              {label: "Optimism", value: '0xa'}
            ]}
            className="rounded-lg border-4 border-gray-800 w-52 text-center"
          >


          </Select>
        
        </div>
        <div className="relative">
          
        </div>
      </header>
      
      {wallet && seedPhrase ?
      (<Routes>
        <Route path="/dashboard"  element={<Dashboard 
        wallet          = {wallet}
        setwallet       = {setWallet}
        seedPhrase       ={seedPhrase}
        setSeedPhrase    = {setSeedPhrase}
        selectedNetwork  = {selectedNetwork}
        />} />
        <Route path="/receive" element={<Receive 
        wallet = {wallet}
        />} />
        <Route path="/send" element={<Send 
        wallet = {wallet}
        selectedNetwork =  {selectedNetwork}
        seedPhrase = {seedPhrase}/>} />
      </Routes>
      ) :
     ( <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/import" exact element={<Import_page 
      setSeedPhrase = {setSeedPhrase}
      setWallet={setWallet}/>} />
      <Route path="/new_wallet" exact element={<Create_page 
      setseedPhrase = {setSeedPhrase}
      setwallet = {setWallet}/>} />
    </Routes>
  )}
      

    </div>
  );
};

export default CryptoWallet;