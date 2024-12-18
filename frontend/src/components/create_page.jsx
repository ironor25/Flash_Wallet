import {useState,React} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ethers } from "ethers";
import Dashboard from './Dashboard';

function Create_page  ({setwallet, setseedPhrase}) {
    const [seedPhrase, NewSeedPhrase] = useState(null)
    const navigate = useNavigate()
    function generateWallet() {
        const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase
        NewSeedPhrase(mnemonic)
    }
    function setWalletAndMnemonic(){
        setseedPhrase(seedPhrase)
        setwallet(ethers.Wallet.fromPhrase(seedPhrase).address)
        return navigate("/dashboard")
    
       
    }
 
        return (
            <div
                className="flex items-center justify-center h-screen bg-gray-100"
                style={{
                    textAlign: 'center',
                    padding: '20px',
                }}
            >
                <div
                    className="space-y-6 p-8 bg-white shadow-lg rounded-lg"
                    style={{
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'box-shadow 0.3s ease',
                    }}
                >
                    <div className="flex items-center space-x-4  border-2 rounded-md border-yellow-500 bg-yellow-100">
                        <ExclamationCircleOutlined style={{ fontSize: '25px', color: '#fa8c16' }} />
                        <div style={{ textAlign: 'left' }}>
                            Once you generate the seed phrase, save it securely in order to recover your wallet.
                        </div>
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        style={{
                            width: '100%',
                        }}
                       onClick={() => generateWallet()}
                    >
                        Generate Seed Phrase
                    </Button>
                    <Card
                        title="Seed Phrase"
                        style={{
                            width: '100%',
                            transition: 'box-shadow 0.3s ease',
                        }}
                        className="hover:shadow-xl"
                    >
                        {seedPhrase && <pre style={{whiteSpace: "pre-wrap"}}>{seedPhrase}</pre>}
                    </Card>
                    <button
                        type="primary"
                        size="large"
                        style={{
                            width: '100%',
                        }}
                        onClick={() =>{ setWalletAndMnemonic(); }}
                         
                    >
                        Open Your wallet
                    </button>
                    <p
                        onClick={() => navigate('/')}
                        className="text-blue-500 cursor-pointer hover:underline"
                    >
                        Back Home
                    </p>
                </div>
            </div>
        );
    };
    

export default Create_page;