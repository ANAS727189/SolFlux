import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import React, { useEffect, useState, useCallback } from 'react'
import { CheckCircle, X, Wallet, RefreshCw} from 'lucide-react';


const ShowBalance = ({ setNotification }) => {
    const [balance, setBalance] = useState(null);
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [isLoading, setIsLoading] = useState(false);

    const getWalletBalance = useCallback(async () => {
        if (!publicKey) return;
        try {
            setIsLoading(true);
            const bal = await connection.getBalance(publicKey);
            setBalance(bal / LAMPORTS_PER_SOL);
        } catch (error) {
            console.error(error);
            setNotification({ message: "Failed to fetch balance", type: 'error' });
        } finally {
            setIsLoading(false);
        }
    }, [connection, publicKey, setNotification]);

    useEffect(() => {
        if (publicKey) {
            getWalletBalance();
        } else {
            setBalance(null);
        }
    }, [publicKey, getWalletBalance]);

    return (
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 w-full shadow-xl relative overflow-hidden group">
            {/* Background Gradient Blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-700"></div>

            <div className="flex justify-between items-start relative z-10">
                <div>
                    <h2 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1 flex items-center gap-2">
                        <Wallet size={14} /> Total Balance
                    </h2>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-white tracking-tight">
                            {balance !== null ? balance.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '---'}
                        </span>
                        <span className="text-lg text-purple-400 font-semibold">SOL</span>
                    </div>
                </div>
                <button 
                    onClick={getWalletBalance} 
                    disabled={isLoading || !publicKey}
                    className={`p-2 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white transition-all ${isLoading ? 'animate-spin' : ''}`}
                >
                    <RefreshCw size={18} />
                </button>
            </div>
        </div>
    );
};


export default ShowBalance