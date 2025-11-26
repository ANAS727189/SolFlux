import { AlertCircle, CheckCircle, X } from 'lucide-react';

const Notification = ({ message, type, onClose }) => {
    if (!message) return null;
    const isError = type === 'error';
    
    return (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-top-5 border ${
            isError ? 'bg-red-500/10 border-red-500/20 text-red-200' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200'
        }`}>
            {isError ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
            <span className="font-medium text-sm">{message}</span>
            <button onClick={onClose} className="ml-2 hover:opacity-70">
                <X size={16} />
            </button>
        </div>
    );
};


export default Notification