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
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md space-y-6 bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-800">
                 {/* Warning Box */}
                 <div className="flex items-center space-x-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-left">
                     <ExclamationCircleOutlined className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                        <p className="text-yellow-200 text-sm">
                         Once you generate the seed phrase, save it securely in order to recover your wallet.
                        </p>
                 </div>


                    <Button
                        type="primary"
                        size="large"
                         className="w-full bg-white text-black py-3 rounded-lg font-semibold
                   hover:bg-gray-100 transition-all duration-300
                   shadow-lg hover:shadow-white/10"
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
                        className="text-white border-white bg-slate-800"
                    >
                        {seedPhrase && <pre style={{whiteSpace: "pre-wrap"}}>{seedPhrase}</pre>}
                    </Card>
                    <Button
                        type="primary"
                        size="large"
                        disabled={!seedPhrase}
                         className="w-full bg-white text-black py-3 rounded-lg font-semibold
                   hover:bg-gray-100 transition-all duration-300
                   shadow-lg hover:shadow-white/10"
                       onClick={() =>{ setWalletAndMnemonic(); }}
                    >
                       Open Your wallet
                    </Button>
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