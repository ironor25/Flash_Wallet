import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Create_page from './components/create_page';
import Import_page from './components/import_page';
import Dashboard from './components/Dashboard';

function CryptoWallet(){
  const [selectedNetwork, setSelectedNetwork] = useState('Ethereum');
  const [seedPhrase,setSeedPhrase] = useState(null)
  const [wallet,setWallet] = useState(null)
  const networks = [
    'Ethereum', 
    'Binance Smart Chain', 
    'Polygon', 
    'Avalanche'
  ];

  return (
    <div className="min-h-screen flex flex-col"
    >
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-100 h-24">
        {/* Left Side - Logo/Name */}
        <div className="flex items-center space-x-2">
          <div className="h-28">
            <img src="public\light.gif" alt="" className='ml-9 h-28 w-40' />
          </div>
          {/* <span className="text-3xl font-bold text-gray-800">Wallet</span> */}
        </div>

        {/* Right Side - Network Selection */}
        <div className="relative">
          <select 
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value)}
            className="appearance-none bg-purple-50 text-purple-700 px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            {networks.map((network) => (
              <option key={network} value={network}>{network}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-purple-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
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