import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import React, {useState} from 'react'
import { Send, RefreshCw } from 'lucide-react';

const SendTokens = ({ setNotification }) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [amount, setAmount] = useState("");
    const [receiver, setReceiver] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!publicKey) return;
        if (!receiver || !amount) {
            setNotification({ message: "Please fill in all fields", type: 'error' });
            return;
        }
        try {
            setIsLoading(true);
            const transaction = new Transaction();
            transaction.add(SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(receiver),
                lamports: parseFloat(amount) * LAMPORTS_PER_SOL
            }));

            const signature = await sendTransaction(transaction, connection);
            
            // Optional: Wait for confirmation
            const latestBlockHash = await connection.getLatestBlockhash();
            await connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: signature,
            });

            setNotification({ message: `Sent ${amount} SOL to ${receiver.slice(0,4)}...${receiver.slice(-4)}`, type: 'success' });
            setAmount("");
            setReceiver("");
        } catch (error) {
            console.error(error);
            setNotification({ message: "Transaction failed. Check address or balance.", type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 flex flex-col gap-4 h-full relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-50"></div>
            
            <div className="flex items-center gap-3 mb-2">
                 <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                    <Send size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white">Send Solana</h3>
            </div>

            <div className="flex-1 flex flex-col gap-3">
                <div className="space-y-1">
                    <label className="text-xs text-slate-400 ml-1">Recipient Address</label>
                    <input 
                        placeholder="Wallet Address"
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono text-sm"
                    />
                </div>
                <div className="space-y-1">
                     <label className="text-xs text-slate-400 ml-1">Amount (SOL)</label>
                    <input
                        type="number"
                        placeholder="0.00"  
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                </div>
            </div>

            <button
                onClick={handleSend}
                disabled={isLoading || !publicKey}
                className="w-full mt-auto py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
                {isLoading ? (
                    <>
                        <RefreshCw size={18} className="animate-spin" /> Sending...
                    </>
                ) : (
                    'Send Transaction'
                )}
            </button>
        </div>
    );
};

export default SendTokens