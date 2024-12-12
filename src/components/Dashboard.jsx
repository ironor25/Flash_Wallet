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
  const Tokens = [
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

const items = [
  { label: 'Transfer', key: '1' ,children: <>Transfer</>},
  { label: 'Tokens', key: '2',children: <>{Tokens ? (
    <>
    <List
      bordered
      itemLayout='Horizontal'
      dataSource={Tokens}/>
    </>  ):
    (
      <></>
    )}
    </> 
    },
  { label: 'NFTs', key: '3' ,children: <>NFTs</>},
];

function logout(){
  setSeedPhrase(null)
  setwallet(null)
  navigate('/')
}
  return (
    <div
    className="flex items-center justify-center h-screen bg-gray-100"
    style={{
        textAlign: 'center',
        padding: '20px',
    }}
>
            <div className="space-y-5 mb-32 p-8 bg-white shadow-lg rounded-lg"
            style={{
                maxWidth: '400px',
                width: '90%',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.3s ease',
            }}>
              <div  >
                <Button onClick={logout}>Logout <LogoutOutlined/></Button>
              </div>

              <div className='' >Wallet</div>
              <Tooltip title={wallet}>
                <div>{wallet.slice(0,4)}....{wallet.slice(38)}</div>
              </Tooltip>
              <Divider></Divider>
              <Tabs defaultActiveKey='1' items={items}></Tabs>
            </div>
        </div>
  );
};

export default Dashboard;