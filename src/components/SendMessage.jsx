import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import bs58 from "bs58";
import { useState } from 'react';
import {ed25519} from "@noble/curves/ed25519.js";
import React from 'react'
import { MessageSquare } from 'lucide-react';

const SendMessage = ({ setNotification }) => {
    const { publicKey, signMessage } = useWallet();
    const [msg, setMsg] = useState("");
    const [signature, setSignature] = useState("");

    const handleSign = async () => {
        if (!publicKey) {
            setNotification({ message: "Wallet not connected", type: 'error' });
            return;
        }
        if (!signMessage) {
             setNotification({ message: "Wallet does not support signing", type: 'error' });
             return;
        }
        if (!msg) {
            setNotification({ message: "Please enter a message", type: 'error' });
            return;
        }

        try {
            const encodedMessage = new TextEncoder().encode(msg);
            const signedMessage = await signMessage(encodedMessage);
            
            // In a real app with bs58 installed: 
            // const signatureBase58 = bs58.encode(signedMessage);
            
            // For this demo (without bs58), we'll convert to hex string
            const signatureHex = Array.from(signedMessage).map(b => b.toString(16).padStart(2, '0')).join('');
            
            setSignature(signatureHex);
            setNotification({ message: "Message signed successfully!", type: 'success' });
        } catch (error) {
            console.error(error);
            setNotification({ message: "Signing failed", type: 'error' });
        }
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 flex flex-col gap-4 h-full relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-rose-500 opacity-50"></div>
            
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400">
                    <MessageSquare size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white">Sign Message</h3>
            </div>

            <div className="flex-1 flex flex-col gap-3">
                 <p className="text-slate-400 text-sm">Verify ownership by signing a message.</p>
                <textarea
                    rows={3}
                    placeholder="Enter your message here..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all resize-none"
                />
                {signature && (
                    <div className="mt-2 p-3 bg-slate-900/80 rounded-lg border border-slate-700">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Signature (Hex):</p>
                        <p className="text-xs text-slate-300 font-mono break-all">{signature.slice(0, 30)}...</p>
                    </div>
                )}
            </div>

            <button
                onClick={handleSign}
                disabled={!publicKey}
                className="w-full mt-auto py-3 px-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-pink-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Sign Message
            </button>
        </div>
    );
};



export default SendMessage