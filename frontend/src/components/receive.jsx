import React from 'react'
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

function Receive(wallet) {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div
            className="w-full max-w-md bg-gradient-to-b from-black via-gray-900 to-black rounded-2xl p-6 border border-zinc-800 shadow-lg"
            style={{ maxHeight: "700px", maxWidth: "400px", width: "90%" }}
            >
                <div className=" text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 mb-6 border
                 border-gray-800 shadow-inner">
                    <QRCodeSVG 
                    value={wallet.wallet} 
                    size="256"
                    className='ml-5'/>
                    <br />
                    <span className="text-zinc-100 font-mono">
                    {wallet.wallet.slice(0,((wallet.wallet).length)-6)}<br />
                    </span>
                    <span className="text-zinc-100 font-mono ml-32">
                    {wallet.wallet.slice(((wallet.wallet).length)-6,((wallet.wallet).length))}
                    </span>
                </div>
                <p
                    onClick={() => navigate('/dashboard')}
                    className="text-blue-500 cursor-pointer hover:underline"
                >
                    Back to Dashboard
                </p>
            </div>
        </div>
    )
}

export default Receive;