import React, { useEffect,useState } from 'react';
import { 
  Divider,
  Tooltip,
  List,
  Avatar,
  Spin,
  Input,
  Tabs,
  Button,
 } from 'antd';

 import { LogoutOutlined } from '@ant-design/icons';
 import { useNavigate } from 'react-router-dom';

function Dashboard({ 
   wallet,      
  setwallet,   
  seedPhrase,
  setSeedPhrase,
  selectedNetwork}) {
  const [balance, setBalance] = useState({
    total: 42578.45,
    bitcoin: 1.25,
    ethereum: 15.73,
    usdc: 25000
  });

  const cryptoAssets = [
    { 
      name: 'Bitcoin', 
      symbol: 'BTC', 
      amount: 1.25, 
      price: 34062.82, 
      change: 2.45,
      color: 'bg-orange-100',
      borderColor: 'border-orange-500'
    },
    { 
      name: 'Ethereum', 
      symbol: 'ETH', 
      amount: 15.73, 
      price: 1876.54, 
      change: -1.22,
      color: 'bg-blue-100',
      borderColor: 'border-blue-500'
    },
    { 
      name: 'USDC', 
      symbol: 'USDC', 
      amount: 25000, 
      price: 1, 
      change: 0.01,
      color: 'bg-purple-100',
      borderColor: 'border-purple-500'
    }
  ];

const  navigate = useNavigate()
function logout(){
  setSeedPhrase(null)
  setwallet(null)
  navigate('/')
}
  return (
    <div className="bg-white max-w-md mx-auto shadow-xl rounded-2xl p-6 font-sans border-2 border-purple-50">
      <div  >
        <Button onClick={logout}>Logout <LogoutOutlined/></Button>
        <div>{wallet}</div>
        {seedPhrase}
      </div>
    
    </div>
  );
};

export default Dashboard;