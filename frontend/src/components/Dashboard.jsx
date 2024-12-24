import React, { useEffect, useState } from "react";
import {
  Divider,
  Tooltip,
  List,
  Avatar,
  Spin,
  Tabs,
  Button,
} from "antd";
import {
  LogoutOutlined,
  QuestionCircleOutlined,
  ImportOutlined,
  ExportOutlined,
  SendOutlined,
  QrcodeOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = ({ wallet, setwallet, seedPhrase, setSeedPhrase, selectedNetwork }) => {
  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);
  const [userNfts, setUserNfts] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [fetching, setFetching] = useState(false);

  const getAssetAndHistory = async () => {
    setFetching(true);
    try {
      //http://localhost:3000/getTokens
      //https://flash-wallet.vercel.app/getTokens
      const res = await axios.get(`https://flash-wallet.vercel.app/getTokens`, {
        params: { userAddress: wallet, chain: selectedNetwork },
      });
      const response = res.data;

      setTokens(response.tokens || []);
      setUserNfts(response.nfts || []);
      setTransactions(response.txns.result || []);
      setBalance(response.native_balance || 0);
    } catch (error) {
      console.error("Error fetching assets:", error);
    } finally {
      setFetching(false);
    }
  };

  const logout = () => {
    setSeedPhrase(null);
    setwallet(null);
    setUserNfts(null);
    setTokens(null);
    setBalance(0);
    navigate("/");
  };

  useEffect(() => {
    if (!wallet || !selectedNetwork) return;
    getAssetAndHistory();
  }, [wallet, selectedNetwork]);

  const items = [
    {
      label: <span className="text-zinc-200">Transactions</span>,
      key: "1",
      children: fetching ? (
        <Spin />
      ) : transactions?.length ? (
        <List
          bordered
          className='max-h-72 overflow-auto '
          itemLayout="horizontal"
          dataSource={transactions}
          renderItem={(item) => (
            <List.Item className="!border-zinc-800 hover:bg-zinc-900 transition-colors">
              <List.Item.Meta
                avatar={
                  <Avatar
                  className={item.from_address.toLowerCase() === wallet.toLowerCase() ? 
                    "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}
                    icon={
                      item.from_address.toLowerCase() === wallet.toLowerCase()
                        ? <ExportOutlined />
                        : <ImportOutlined />
                    }
                  />
                }
                title={<span className="text-zinc-200">{item.block_timestamp.slice(0, 10)}</span>}
                description={
                  item.from_address.toLowerCase() === wallet.toLowerCase() ? (
                    <span className="text-red-500">
                      Sent {(item.value / 1e18).toFixed(2)} Sepolia ETH
                    </span>
                  ) : (
                    <span className="text-green-500">
                      Received {(item.value / 1e18).toFixed(2)} Sepolia ETH
                    </span>
                  )
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <p>No transactions found.</p>
      ),
    },
    {
      label: <span className="text-zinc-200">Tokens</span>,
      key: "2",
      children: fetching ? (
        <div className="flex justify-center p-4">
        <Spin />
      </div>
      ) : tokens?.length ? (
        <List
         className="max-h-72 overflow-auto"
          bordered
          itemLayout="horizontal"
          dataSource={tokens}
          renderItem={(item) => (
            <List.Item className="!border-zinc-800 hover:bg-zinc-900 transition-colors">
              <List.Item.Meta
                avatar={<Avatar src={item.logo || <QuestionCircleOutlined />} 
                className="bg-zinc-800"/>}
                title={<span className="text-zinc-200">{item.symbol}</span>}
                description={<span className="text-zinc-400">{item.name}</span>}
              />
              <div className="text-zinc-200">
                {(
                  Number(item.balance) /
                  10 ** Number(item.decimals)
                ).toFixed(2)}{" "}
                Tokens
              </div>
            </List.Item>
          )}
        />
      ) : (
        <p className="text-zinc-400 text-center p-4">You seem to not have any tokens yet.</p>
      ),
    },
    {
      label:<span className="text-zinc-200">NFTs</span>,
      key: "3",
      children: fetching ? (
        <Spin />
      ) : userNfts?.length ? (
        userNfts.map((e, i) => (
          <div key={i} className="m-10">
            <img alt="nftimage" src={e} className="h-56" />
          </div>
        ))
      ) : (
        <p className="text-zinc-400 text-center p-4">You seem to not have any NFTs yet.</p>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
          <div
            className="w-full max-w-md bg-gradient-to-b from-black via-gray-900 to-black rounded-2xl p-6 border border-zinc-800 shadow-lg"
            style={{ maxHeight: "700px", maxWidth: "400px", width: "90%" }}
          >
            
            <div className="flex justify-between text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 mb-6 border
             border-gray-800 shadow-inner">
            <Tooltip title={wallet}>
              
            <span className="text-zinc-100 font-mono">
            {`Balance: ${(balance.balance / 1e18).toFixed(1)}`}<br />
             { `Address: ${wallet.slice(0, 4)}...${wallet.slice(-4)}`}
              
            </span>
            <br />
            </Tooltip>
           
           
            </div>
            <div className="flex justify-center space-x-10">
            <Button 
            type="default"
            className="bg-zinc-700 hover:bg-zinc-700 text-white border-none"
            onClick={() => navigate("/send")}>
            <SendOutlined />Send</Button>
            <Button
            type="default"
            className="bg-zinc-700 hover:bg-zinc-700 text-white border-none"
            onClick={() => navigate("/receive")}
            ><QrcodeOutlined />Receive</Button>
            </div>
            <Divider  className="border-zinc-800"/>
            <Tabs defaultActiveKey="1" items={items} 
            className="text-white"
            style={{
            color: 'white',
          }}/>
          <div className="justify-center flex">          
             <Button onClick={logout}
            className="hover:text-white hover:bg-zinc-800 items-center  mt-4">
              Logout <LogoutOutlined />
            </Button>
            </div>

          </div>
          
  
    </div>
  );
};

export default Dashboard;
