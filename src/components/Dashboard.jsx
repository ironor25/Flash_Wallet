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

 import { LogoutOutlined ,QuestionCircleOutlined} from '@ant-design/icons';
 import { useNavigate } from 'react-router-dom';


 

const Tokens = [
  { 
    name: 'Bitcoin', 
    symbol: 'BTC', 
    balance: 10005635645645,
    decimals: 9,
  },
  { 
    name: 'Ethereum', 
    symbol: 'ETH', 
    amount: 15.73, 
    balance: 104000,
    decimals: 3,
  },
  { 
    name: 'USDC', 
    symbol: 'USDC', 
    balance: 10000,
    decimals: 2,
  }
];


const nfts = ["https://stickers.freenft.com/stickers/heroes-and-villains/image/4545.json",
              "https://stickers.freenft.com/stickers/billion/image/145399.png"
]
const logo = <QuestionCircleOutlined/>
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
    

const  navigate = useNavigate()

const items = [
  { label: 'Transfer', key: '1' ,children: <>Transfer</>},
  { label: 'Tokens', key: '2',children: <div className='max-h-96 overflow-auto'>{Tokens ? (
    <>
         <List
     bordered
      itemLayout="horizontal"
      dataSource={Tokens}
      renderItem={(item,index) => (
        <List.Item
          style={{textAlign: 'left'}}
        >
            <List.Item.Meta
              avatar={<Avatar src={item.logo || logo} />}
              title={item.symbol}
              description={item.name}
            />
            <div>
              {(Number(item.balance)
              / 10 ** Number(item.decimals)).toFixed(2)}{""}
              Tokens
           

              
            </div>
          
        </List.Item>
      )}
    />

    </>  
    ):
    (
      <></>
    )} </div> },
  { label: 'NFTs', key: '3' ,children:   <div className='max-h-96 overflow-auto'>{nfts ? 
    (<>
      {nfts.map((e,i)=> {
        return (
          <>
          {
            e && (
              <img key={i}
              alt='nftimage'
              src={e}/>
            )
          }
          </>
        )
      })}
    </>)
      :
   (<>
   <span>You seem to not have any NFTs yet.</span>
   <p>Find Alt coin Gems:{""}
    <a href= "https://moralismoney.com/" target="_blank" rel="no_referrer">
    moralis.money.io
    </a>
   </p>
   </>)}
  </div>},
];

function logout(){
  setSeedPhrase(null)
  setwallet(null)
  navigate('/')
}
  return (
    <div
    className="flex items-center justify-center  bg-gray-100"
    style={{
        textAlign: 'center',
        padding: '20px',
    }}
>
            <div className="space-y-5 mb-32 p-8 bg-white shadow-lg rounded-lg"
            style={{
              maxHeight: "800px",
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

                <div>{wallet}</div>
                <div>{wallet.slice(0,4)}....{wallet.slice(38)}</div>
              </Tooltip>
              <Divider></Divider>
            
              <Tabs defaultActiveKey='1' items={items}></Tabs>
          
            </div>
        </div>
  );
};

export default Dashboard;