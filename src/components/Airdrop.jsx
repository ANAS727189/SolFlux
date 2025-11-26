import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from 'react'
import { Download, RefreshCw } from 'lucide-react';

const Airdrop = ({ setNotification }) => {
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { publicKey } = useWallet();
    const { connection } = useConnection();

    const handleAirdrop = async () => {
        if (!publicKey) return;
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setNotification({ message: "Please enter a valid amount", type: 'error' });
            return;
        }

        try {
            setIsLoading(true);
            const signature = await connection.requestAirdrop(publicKey, parseFloat(amount) * LAMPORTS_PER_SOL);
            
            // Wait for confirmation for better UX
            const latestBlockHash = await connection.getLatestBlockhash();
            await connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: signature,
            });

            setNotification({ message: `Successfully airdropped ${amount} SOL!`, type: 'success' });
            setAmount('');
        } catch (error) {
            console.error(error);
            setNotification({ message: "Airdrop failed (Devnet limits may apply)", type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 flex flex-col gap-4 h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50"></div>
            
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
                    <Download size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white">Request Airdrop</h3>
            </div>

            <div className="flex-1 flex flex-col gap-3">
                <p className="text-slate-400 text-sm">Top up your devnet wallet with test SOL.</p>
                <input
                    type="number"
                    placeholder="Amount (e.g., 1)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                />
            </div>

            <button
                onClick={handleAirdrop}
                disabled={isLoading || !publicKey}
                className="w-full mt-auto py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-cyan-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
                {isLoading ? (
                    <>
                        <RefreshCw size={18} className="animate-spin" /> Processing...
                    </>
                ) : (
                    'Confirm Airdrop'
                )}
            </button>
        </div>
    );
};


export default Airdrop