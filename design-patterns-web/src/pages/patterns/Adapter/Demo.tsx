import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

type PlugType = 'US' | 'EU';

const AdapterDemo = () => {
  const { t } = useTranslation();
  const [plugType, setPlugType] = useState<PlugType>('US');
  const [hasAdapter, setHasAdapter] = useState(false);
  const socketType = 'EU'; // The wall socket is always EU in this demo

  const isCompatible = plugType === socketType || (plugType === 'US' && hasAdapter && socketType === 'EU');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('adapter.demo.title')}</h3>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 block mb-2">{t('adapter.demo.devicePlug')}</label>
            <div className="flex gap-2">
              <button 
                onClick={() => setPlugType('US')}
                className={clsx("px-4 py-2 rounded border", plugType === 'US' ? "bg-blue-600 border-blue-500 text-white text-gray-900 dark:text-white" : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300")}
              >
                {t('adapter.demo.usPlug')}
              </button>
              <button 
                onClick={() => setPlugType('EU')}
                className={clsx("px-4 py-2 rounded border", plugType === 'EU' ? "bg-blue-600 border-blue-500 text-white text-gray-900 dark:text-white" : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300")}
              >
                {t('adapter.demo.euPlug')}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 block mb-2">{t('adapter.demo.inventory')}</label>
            <button 
              onClick={() => setHasAdapter(!hasAdapter)}
              className={clsx(
                "w-full px-4 py-3 rounded border flex items-center justify-between transition-colors", 
                hasAdapter ? "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-400 text-green-400" : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"
              )}
            >
              <span>{t('adapter.demo.adapterName')}</span>
              {hasAdapter ? <CheckCircle size={18} /> : <div className="w-4 h-4 rounded-full border border-gray-500" />}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center min-h-[300px] relative">
         <div className="flex items-center gap-1">
            {/* Device Plug */}
            <motion.div 
              animate={{ x: isCompatible ? 20 : 0 }}
              className="flex flex-col items-center z-10"
            >
              <div className="w-24 h-16 bg-gray-300 rounded-l-lg flex items-center justify-center text-gray-800 font-bold border-2 border-gray-400">
                {t('adapter.demo.device')}
              </div>
              <div className="w-8 h-8 bg-black flex items-center justify-center relative">
                 {plugType === 'US' ? (
                   <div className="flex gap-1"><div className="w-1 h-4 bg-gray-400"></div><div className="w-1 h-4 bg-gray-400"></div></div>
                 ) : (
                   <div className="flex gap-1"><div className="w-1 h-4 bg-gray-400 rounded-full"></div><div className="w-1 h-4 bg-gray-400 rounded-full"></div></div>
                 )}
              </div>
            </motion.div>

            {/* Adapter (Optional) */}
            {hasAdapter && plugType === 'US' && (
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="w-12 h-10 bg-green-600 rounded flex items-center justify-center text-xs text-gray-900 dark:text-white z-0"
              >
                {t('adapter.demo.adapt')}
              </motion.div>
            )}

            {/* Wall Socket */}
            <div className="flex flex-col items-center z-10">
               <div className="w-16 h-24 bg-gray-200 rounded-lg border-4 border-gray-400 flex flex-col items-center justify-center gap-2 shadow-inner">
                  <div className="flex gap-2">
                     <div className="w-3 h-3 bg-black rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"></div>
                     <div className="w-3 h-3 bg-black rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"></div>
                  </div>
                  <span className="text-[10px] text-gray-500 dark:text-gray-500 font-mono">EU 220V</span>
               </div>
            </div>
         </div>

         {/* Connection Status */}
         <div className="mt-12">
            {isCompatible ? (
               <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-green-400 text-xl font-bold">
                 <Zap className="fill-current" /> {t('adapter.demo.powerConnected')}
               </motion.div>
            ) : (
               <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-red-400 text-xl font-bold">
                 <XCircle /> {t('adapter.demo.incompatible')}
               </motion.div>
            )}
         </div>
      </div>
    </div>
  );
};

export default AdapterDemo;
