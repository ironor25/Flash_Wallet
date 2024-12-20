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
      const res = await axios.get(`http://localhost:3001/getTokens`, {
        params: { userAddress: wallet, chain: selectedNetwork },
      });
      const response = res.data;

      setTokens(response.tokens || []);
      setUserNfts(response.nfts || []);
      setTransactions(response.txns.result || []);
      setBalance(response.balance || 0);
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
      label: "Transactions",
      key: "1",
      children: fetching ? (
        <Spin />
      ) : transactions?.length ? (
        <List
          bordered
          className='max-h-72 overflow-auto'
          itemLayout="horizontal"
          dataSource={transactions}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={
                      item.from_address.toLowerCase() === wallet.toLowerCase()
                        ? <ExportOutlined />
                        : <ImportOutlined />
                    }
                  />
                }
                title={item.block_timestamp.slice(0, 10)}
                description={
                  item.from_address.toLowerCase() === wallet.toLowerCase() ? (
                    <span className="text-red-600">
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
      label: "Tokens",
      key: "2",
      children: fetching ? (
        <Spin />
      ) : tokens?.length ? (
        <List
          bordered
          itemLayout="horizontal"
          dataSource={tokens}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.logo || <QuestionCircleOutlined />} />}
                title={item.symbol}
                description={item.name}
              />
              <div>
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
        <p>You seem to not have any tokens yet.</p>
      ),
    },
    {
      label: "NFTs",
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
        <p>You seem to not have any NFTs yet.</p>
      ),
    },
  ];

  return (
    <div className="flex items-center justify-center bg-gray-200 h-screen">
      <div
        className="space-y-5 mb-32 p-8 bg-white shadow-lg rounded-lg"
        style={{ maxHeight: "600px", maxWidth: "400px", width: "90%" }}
      >
        <Button onClick={logout}>
          Logout <LogoutOutlined />
        </Button>
        <div>Wallet</div>
        <Tooltip title={wallet}>
          <div>{wallet.slice(0, 4)}....{wallet.slice(-4)}</div>
        </Tooltip>
        <Divider />
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default Dashboard;
