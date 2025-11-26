import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import Airdrop from './components/Airdrop';
import ShowBalance from './components/ShowBalance';
import SendTokens from './components/SendTokens';
import SendMessage from './components/SendMessage';
import Notification from './components/Notifications';
import { useState, useEffect } from 'react';



function App() {
const [notification, setNotification] = useState({ message: '', type: '' });
    
    // Auto-hide notification
    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => setNotification({ message: '', type: '' }), 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500/30 font-sans pb-20">
            {/* Background Effects */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
            </div>

            <Notification 
                message={notification.message} 
                type={notification.type} 
                onClose={() => setNotification({ message: '', type: '' })} 
            />

            {/* Navbar */}
            <header className="relative z-10 border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-md sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <span className="font-bold text-xl text-white">S</span>
                        </div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            SolFlux
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <WalletMultiButton className="!bg-slate-800 hover:!bg-slate-700 !rounded-xl !h-10 !px-4 !font-medium !text-sm !transition-all" />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    {/* Balance Hero Section */}
                    <section className="mb-12">
                        <ShowBalance setNotification={setNotification} />
                    </section>

                    {/* Features Grid */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Airdrop setNotification={setNotification} />
                        <SendTokens setNotification={setNotification} />
                        <SendMessage setNotification={setNotification} />
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 text-center py-8 text-slate-500 text-sm">
                <p>Designed for the Solana Ecosystem</p>
            </footer>
        </div>
    );
}

export default App
