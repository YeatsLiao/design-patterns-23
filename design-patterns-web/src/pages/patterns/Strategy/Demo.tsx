import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Wallet, Landmark, CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

// Strategy Interface Idea: 
// pay(amount)

type PaymentMethod = 'credit-card' | 'paypal' | 'bank-transfer';

const StrategyDemo = () => {
  const { t } = useTranslation();
  const [selectedStrategy, setSelectedStrategy] = useState<PaymentMethod>('credit-card');
  const [amount] = useState(100);
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  // --- Strategy Implementations ---
  const processPayment = () => {
    setProcessing(true);
    setStatus('idle');
    addLog(t('strategy.demo.delegating', { strategy: selectedStrategy }));

    // Simulate different strategies having different processing times/logic
    setTimeout(() => {
      let message = "";
      switch (selectedStrategy) {
        case 'credit-card':
          message = t('strategy.demo.ccCharged', { amount });
          break;
        case 'paypal':
          message = t('strategy.demo.paypalPaid', { amount });
          break;
        case 'bank-transfer':
          message = t('strategy.demo.bankInvoice', { amount });
          break;
      }
      addLog(message);
      setProcessing(false);
      setStatus('success');
    }, 1500);
  };

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  const renderStrategyForm = () => {
    switch (selectedStrategy) {
      case 'credit-card':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
              <div className="flex justify-between mb-2">
                <div className="w-12 h-8 bg-gray-300 dark:bg-gray-500 rounded"></div>
                <div className="text-xs text-gray-600 dark:text-gray-400">VISA</div>
              </div>
              <div className="text-sm font-mono tracking-widest text-gray-700 dark:text-gray-300 mb-2">•••• •••• •••• 4242</div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>John Doe</span>
                <span>12/25</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('strategy.demo.requiresCard')}</p>
          </motion.div>
        );
      case 'paypal':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 text-center py-4">
            <div className="bg-blue-900/30 p-4 rounded-full inline-block mb-2">
              <Wallet size={32} className="text-blue-400" />
            </div>
            <p className="text-sm text-blue-300">{t('strategy.demo.redirectPayPal')}</p>
          </motion.div>
        );
      case 'bank-transfer':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
             <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
                   <span>Bank:</span> <span className="font-mono">Chase</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
                   <span>Account:</span> <span className="font-mono">*****8899</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
                   <span>Routing:</span> <span className="font-mono">021***</span>
                </div>
             </div>
             <p className="text-xs text-yellow-500/80">{t('strategy.demo.bankProcessing')}</p>
          </motion.div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT: Client / Context */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <ShoppingBag size={20} className="text-green-400" />
          {t('strategy.demo.title')}
        </h3>

        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400">{t('strategy.demo.totalAmount')}</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">${amount}.00</span>
          </div>

          <div className="space-y-4">
            <label className="text-sm text-gray-600 dark:text-gray-400">{t('strategy.demo.selectStrategy')}</label>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => setSelectedStrategy('credit-card')}
                className={clsx(
                  "p-3 rounded-lg border flex flex-col items-center gap-2 transition-all",
                  selectedStrategy === 'credit-card' ? "bg-green-900/30 border-green-500 text-green-400" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-700"
                )}
              >
                <CreditCard size={20} />
                <span className="text-xs">{t('strategy.demo.creditCard')}</span>
              </button>
              <button 
                onClick={() => setSelectedStrategy('paypal')}
                className={clsx(
                  "p-3 rounded-lg border flex flex-col items-center gap-2 transition-all",
                  selectedStrategy === 'paypal' ? "bg-blue-900/30 border-blue-500 text-blue-400" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-700"
                )}
              >
                <Wallet size={20} />
                <span className="text-xs">{t('strategy.demo.paypal')}</span>
              </button>
              <button 
                onClick={() => setSelectedStrategy('bank-transfer')}
                className={clsx(
                  "p-3 rounded-lg border flex flex-col items-center gap-2 transition-all",
                  selectedStrategy === 'bank-transfer' ? "bg-yellow-900/30 border-yellow-500 text-yellow-400" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-700"
                )}
              >
                <Landmark size={20} />
                <span className="text-xs">{t('strategy.demo.bank')}</span>
              </button>
            </div>
          </div>

          <div className="mt-8">
            <button 
              onClick={processPayment}
              disabled={processing}
              className="w-full py-3 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-gray-900 dark:text-white font-bold rounded-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {processing ? t('strategy.demo.processing') : t('strategy.demo.payNow', { amount })}
              {!processing && <ArrowRight size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: Strategy Execution & Logs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('strategy.demo.executionTitle')}</h3>

        {/* Dynamic Form Area */}
        <div className="bg-gray-100 dark:bg-gray-950 rounded-lg p-6 mb-6 min-h-[160px] flex items-center justify-center border border-gray-200 dark:border-gray-800 relative overflow-hidden">
           <div className="absolute top-2 left-3 text-xs text-gray-600 font-mono">{t('strategy.demo.context')}</div>
           {renderStrategyForm()}
           
           <AnimatePresence>
             {status === 'success' && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.5 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0 }}
                 className="absolute inset-0 bg-green-900/90 flex flex-col items-center justify-center text-gray-900 dark:text-white z-10"
                 onClick={() => setStatus('idle')} // Click to dismiss
               >
                 <CheckCircle size={48} className="mb-2 text-green-400" />
                 <span className="font-bold">{t('strategy.demo.success')}</span>
                 <span className="text-xs text-green-300 mt-2">{t('strategy.demo.reset')}</span>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Logs */}
        <div className="flex-1 bg-black rounded-lg p-4 font-mono text-xs overflow-y-auto max-h-[300px] border border-gray-200 dark:border-gray-800">
          <div className="text-gray-500 dark:text-gray-500 mb-2 border-b border-gray-200 dark:border-gray-800 pb-1">{t('strategy.demo.logs')}</div>
          {logs.length === 0 && <span className="text-gray-700 italic">{t('strategy.demo.waiting')}</span>}
          {logs.map((log, i) => (
            <div key={i} className="mb-1 text-green-400">
              <span className="opacity-50 mr-2">&gt;</span>{log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrategyDemo;
