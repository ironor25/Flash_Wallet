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
import axios from 'axios';


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
      const  navigate = useNavigate()

      const [balance, setBalance] = useState(0);
      const [nfts, setNfts] = useState(null);
      const [Tokens, setTokens] = useState(null);
      const [fromDate, setfromDate] = useState("");
      const [toDate, settoDate] = useState("");
      const [fetching, setfetching] = useState(true);
      const [trxns, settrxns] = useState(null)
        
      async function getAssetandHistory(){
        setfetching(true)
        const res = await axios.get(`http://localhost:3001/getTokens`,{
          params: {
            userAddress: wallet,
            chain: selectedNetwork
          }
        })
        const response = res.data
        
        if (response.tokens.length > 0)  {
          setTokens(response.tokens)
          console.log(Tokens)
        }
        
        if (response.nfts.length > 0) {
          setNfts(response.nfts)
          console.log(response.nfts)
        }

        if (response.txns.length > 0) {
          settrxns(response.txns)
          console.log(response.txns)
        }

        setBalance(response.balance)

        setfetching(false)
      }

      //table content transaction ,nfts , tokens
      const items = [
        { label: 'Transactions', key: '1' ,children: <div className='max-h-96 overflow-auto'>{trxns} </div>},


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
          (<>
        <span>You seem to not have any NFTs yet.</span>
        <p>Find Alt coin Gems:{""}
          <a href= "https://moralismoney.com/" target="_blank" rel="no_referrer">
          moralis.money.io
          </a>
        </p>
        </>)
        } </div> },


        { label: 'NFTs', key: '3' ,children:   <div className='max-h-80 overflow-auto '>{nfts ? 
          (<>
            {nfts.map((e,i)=> {
              return (
                <div className='m-10'>
                {
                  e && (
                    <img key={i}
                    alt='nftimage'
                    src={e}
                    className='h-56'/>
                  )
                }
                </div>
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
        setNfts(null)
        setTokens(null)
        setBalance(0)
        navigate('/')
      }

      useEffect(() => {
        if (!wallet || !selectedNetwork) return
          setNfts(null);
          setTokens(null);
          setBalance(0);
          getAssetandHistory();
      },[]
      )

      useEffect(() => {
        if (!wallet ) return
          setNfts(null);
          setTokens(null);
          setBalance(0);
          getAssetandHistory();
      },[selectedNetwork]
      )




        return (
          <div
          className="flex items-center justify-center  bg-gray-200 h-screen"
          style={{
            
              textAlign: 'center',
              padding: '20px',
          }}
      >
                  <div className="space-y-5 mb-32 p-8 bg-white shadow-lg rounded-lg"
                  style={{
                    maxHeight: "600px",
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