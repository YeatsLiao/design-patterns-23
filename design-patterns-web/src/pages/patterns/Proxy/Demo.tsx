import React, { useState } from 'react';
import { Download, Database, Shield, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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

  const addLog = (msg: string) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

  // Proxy Logic
  const downloadVideo = async (id: string) => {
    setLoading(true);
    addLog(t('proxy.demo.logRequest', { id }));

    // 1. Check Cache (Proxy Check)
    if (cache[id]) {
      addLog(t('proxy.demo.logCacheHit', { id }));
      setLoading(false);
      return;
    }

    // 2. Forward to Real Subject
    addLog(t('proxy.demo.logCacheMiss'));
    const data = await RealVideoDownloader.download(id);
    
    // 3. Update Cache
    setCache(prev => ({ ...prev, [id]: data }));
    addLog(t('proxy.demo.logReceived'));
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">{t('proxy.demo.title')}</h3>
        
        <div className="flex gap-4 mb-8">
           <button 
             onClick={() => downloadVideo('vid-1')}
             disabled={loading}
             className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 rounded text-white font-medium flex items-center gap-2"
           >
             <Download size={18} /> {t('proxy.demo.downloadVid1')}
           </button>
           <button 
             onClick={() => downloadVideo('vid-2')}
             disabled={loading}
             className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 rounded text-white font-medium flex items-center gap-2"
           >
             <Download size={18} /> {t('proxy.demo.downloadVid2')}
           </button>
        </div>

        <div className="bg-black rounded-lg p-4 h-[300px] overflow-y-auto font-mono text-xs border border-gray-800">
           {logs.map((log, i) => (
             <div key={i} className="mb-1 text-green-400">{log}</div>
           ))}
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex flex-col items-center justify-center relative">
         <div className="flex items-center gap-8">
            {/* Client */}
            <div className="flex flex-col items-center gap-2">
               <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center border-2 border-white">
                  <Globe size={24} className="text-white" />
               </div>
               <span className="text-xs text-gray-400">{t('proxy.demo.client')}</span>
            </div>

            {/* Proxy */}
            <div className="relative">
               <div className="w-20 h-20 bg-blue-900 rounded-lg flex items-center justify-center border-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] z-10 relative">
                  <Shield size={32} className="text-blue-300" />
               </div>
               <span className="text-xs text-blue-400 absolute -bottom-6 w-full text-center">{t('proxy.demo.proxyCache')}</span>
               
               {/* Cache Indicator */}
               <div className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                 {Object.keys(cache).length} items
               </div>
            </div>

            {/* Real Subject */}
            <div className="flex flex-col items-center gap-2">
               <div className="w-16 h-16 bg-red-900 rounded-lg flex items-center justify-center border-2 border-red-500 border-dashed">
                  <Database size={24} className="text-red-400" />
               </div>
               <span className="text-xs text-gray-400">{t('proxy.demo.realServer')}</span>
            </div>
         </div>
         
         {loading && (
            <motion.div 
               layoutId="packet"
               className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full"
               animate={{ 
                 x: [0, 100, 0],
                 opacity: [1, 0.5, 1]
               }}
               transition={{ repeat: Infinity, duration: 1 }}
            />
         )}
      </div>
    </div>
  );
};

export default ProxyDemo;
