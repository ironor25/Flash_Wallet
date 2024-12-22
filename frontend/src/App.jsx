import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Create_page from './components/create_page';
import Import_page from './components/import_page';
import Dashboard from './components/Dashboard';
import { Select } from 'antd';

function CryptoWallet(){
  const [selectedNetwork, setSelectedNetwork] = useState('0xaa36a7');
  const [seedPhrase,setSeedPhrase] = useState(null)
  const [wallet,setWallet] = useState(null)


  return (
    <div className="min-h-screen flex flex-col"
    >
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b h-24 ">
        {/* Left Side - Logo/Name */}
        <div className="flex items-center space-x-2">
          <div className="h-28">
            <img src="/light.gif" alt="" className='ml-9 h-28 w-40' />
          </div>
          {/* <span className="text-3xl font-bold text-gray-800">Wallet</span> */}
        </div>

        {/* Right Side - Network Selection */}
        <div className="relative">
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
            className="rounded-lg border-2 border-purple-600 w-52 text-center"
          >


          </Select>
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