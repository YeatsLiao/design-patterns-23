import { useState } from 'react';
import { Download, Database, Shield, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

// Real Subject
const RealVideoDownloader = {
  download: (id: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Video Data for ID: ${id}`);
      }, 2000); // Simulate slow network
    });
  }
};

const ProxyDemo = () => {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<string[]>([]);
  const [cache, setCache] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'idle' | 'requesting' | 'checking' | 'fetching' | 'returning'>('idle');
  const [currentId, setCurrentId] = useState<string | null>(null);

  const addLog = (msg: string) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

  // Proxy Logic
  const downloadVideo = async (id: string) => {
    if (loading) return;
    
    setLoading(true);
    setCurrentId(id);
    
    // Phase 1: Client -> Proxy
    setStep('requesting');
    addLog(t('proxy.demo.logRequest', { id }));
    await new Promise(r => setTimeout(r, 600));

    // Phase 2: Checking Cache
    setStep('checking');
    await new Promise(r => setTimeout(r, 800));

    if (cache[id]) {
      addLog(t('proxy.demo.logCacheHit', { id }));
      setStep('returning');
      await new Promise(r => setTimeout(r, 600));
      setLoading(false);
      setStep('idle');
      setCurrentId(null);
      return;
    }

    // Phase 3: Proxy -> Server (Cache Miss)
    addLog(t('proxy.demo.logCacheMiss'));
    setStep('fetching');
    const data = await RealVideoDownloader.download(id);
    
    // Phase 4: Server -> Proxy -> Client
    setCache(prev => ({ ...prev, [id]: data }));
    addLog(t('proxy.demo.logReceived'));
    setStep('returning');
    await new Promise(r => setTimeout(r, 600));
    
    setLoading(false);
    setStep('idle');
    setCurrentId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('proxy.demo.title')}</h3>
        
        <div className="flex gap-4 mb-8">
           <button 
             onClick={() => downloadVideo('Video #1')}
             disabled={loading}
             className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-400 dark:disabled:bg-gray-700 rounded text-white font-medium flex items-center gap-2 transition-colors"
           >
             <Download size={18} /> {t('proxy.demo.downloadVid1')}
           </button>
           <button 
             onClick={() => downloadVideo('Video #2')}
             disabled={loading}
             className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-400 dark:disabled:bg-gray-700 rounded text-white font-medium flex items-center gap-2 transition-colors"
           >
             <Download size={18} /> {t('proxy.demo.downloadVid2')}
           </button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 h-[300px] overflow-y-auto font-mono text-xs border border-gray-200 dark:border-gray-800">
           {logs.length === 0 && <div className="text-gray-500 italic">Waiting for requests...</div>}
           {logs.map((log, i) => (
             <div key={i} className="mb-1 text-blue-600 dark:text-green-400">{log}</div>
           ))}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]">
         {/* Status Indicator */}
         <div className="absolute top-4 left-0 right-0 text-center">
            <span className={clsx(
              "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
              step === 'idle' ? "bg-gray-200 dark:bg-gray-800 text-gray-500" : "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 animate-pulse"
            )}>
              {t(`proxy.demo.status${step.charAt(0).toUpperCase() + step.slice(1)}`)}
            </span>
         </div>

         <div className="flex items-center justify-between w-full max-w-md relative">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 -z-0" />
            
            {/* Client */}
            <div className="flex flex-col items-center gap-2 z-10">
               <motion.div 
                  animate={step === 'requesting' || (step === 'returning' && !loading) ? { scale: [1, 1.1, 1] } : {}}
                  className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 shadow-sm"
               >
                  <Globe size={24} className="text-gray-600 dark:text-gray-400" />
               </motion.div>
               <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{t('proxy.demo.client')}</span>
            </div>

            {/* Proxy */}
            <div className="flex flex-col items-center gap-2 z-10">
               <motion.div 
                  animate={step === 'checking' ? { 
                    borderColor: ['#3b82f6', '#10b981', '#3b82f6'],
                    scale: [1, 1.05, 1],
                    boxShadow: ['0 0 0px rgba(59,130,246,0)', '0 0 20px rgba(59,130,246,0.5)', '0 0 0px rgba(59,130,246,0)']
                  } : {}}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className={clsx(
                    "w-24 h-24 rounded-xl flex flex-col items-center justify-center border-2 shadow-lg transition-colors relative bg-white dark:bg-gray-800",
                    step === 'checking' ? "border-blue-500" : "border-gray-300 dark:border-gray-600"
                  )}
               >
                  <Shield size={32} className={clsx("mb-1 transition-colors", step === 'checking' ? "text-blue-500" : "text-gray-400")} />
                  <div className="flex flex-wrap gap-1 justify-center px-2">
                    {Object.keys(cache).map(id => (
                      <span key={id} className="text-[8px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1 rounded border border-green-200 dark:border-green-800/50">
                        {id}
                      </span>
                    ))}
                    {Object.keys(cache).length === 0 && <span className="text-[8px] text-gray-400 italic">{t('proxy.demo.cacheEmpty')}</span>}
                  </div>
               </motion.div>
               <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{t('proxy.demo.proxyCache')}</span>
            </div>

            {/* Real Subject */}
            <div className="flex flex-col items-center gap-2 z-10">
               <motion.div 
                  animate={step === 'fetching' ? { 
                    scale: [1, 1.05, 1],
                    borderColor: ['#ef4444', '#f87171', '#ef4444']
                  } : {}}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className={clsx(
                    "w-16 h-16 rounded-lg flex items-center justify-center border-2 bg-white dark:bg-gray-800 shadow-sm",
                    step === 'fetching' ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]" : "border-gray-300 dark:border-gray-600"
                  )}
               >
                  <Database size={24} className={clsx("transition-colors", step === 'fetching' ? "text-red-500" : "text-gray-400")} />
               </motion.div>
               <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{t('proxy.demo.realServer')}</span>
            </div>

            {/* Packet Animation */}
            {step === 'requesting' && (
              <motion.div 
                initial={{ x: -140, opacity: 0 }}
                animate={{ x: -40, opacity: 1 }}
                className="absolute top-1/2 left-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] z-20 flex items-center justify-center"
              >
                <div className="w-1 h-1 bg-white rounded-full animate-ping" />
              </motion.div>
            )}

            {step === 'fetching' && (
              <motion.div 
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 140, opacity: 1 }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="absolute top-1/2 left-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] z-20 flex items-center justify-center"
              >
                 <div className="w-1 h-1 bg-white rounded-full animate-ping" />
              </motion.div>
            )}

            {step === 'returning' && (
              <motion.div 
                initial={{ x: -40, opacity: 1 }}
                animate={{ x: -140, opacity: 1 }}
                className="absolute top-1/2 left-1/2 -translate-y-1/2 w-5 h-5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)] z-20 flex items-center justify-center"
              >
                <Download size={10} className="text-white" />
              </motion.div>
            )}
         </div>

         {/* Explainer Overlay */}
         <div className="mt-12 text-center max-w-xs">
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
               {t(`proxy.demo.explainer${step.charAt(0).toUpperCase() + step.slice(1)}`, { id: currentId })}
            </p>
         </div>
      </div>
    </div>
  );
};

export default ProxyDemo;
