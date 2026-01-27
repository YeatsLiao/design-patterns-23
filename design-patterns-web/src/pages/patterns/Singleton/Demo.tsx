import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Plus, RefreshCw, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

// Type definition for our "Database Instance"
interface DBInstance {
  id: string;
  color: string;
  createdAt: number;
}

const COLORS = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];

const SingletonDemo = () => {
  const { t } = useTranslation();
  
  // State for "Bad Practice" (Multiple Instances)
  const [multipleInstances, setMultipleInstances] = useState<DBInstance[]>([]);
  
  // State for "Singleton Pattern" (Single Instance)
  const [singletonInstance, setSingletonInstance] = useState<DBInstance | null>(null);
  const [accessLog, setAccessLog] = useState<string[]>([]);

  // --- Actions for Bad Practice ---
  const createNewInstance = () => {
    const newInstance: DBInstance = {
      id: Math.random().toString(36).substr(2, 9),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      createdAt: Date.now(),
    };
    setMultipleInstances(prev => [...prev, newInstance]);
  };

  const clearMultipleInstances = () => {
    setMultipleInstances([]);
  };

  // --- Actions for Singleton Pattern ---
  const getSingletonInstance = () => {
    if (!singletonInstance) {
      // First time creation (Lazy Initialization)
      const newInstance: DBInstance = {
        id: "SINGLE-001", // Fixed ID
        color: "bg-blue-600", // Fixed Color
        createdAt: Date.now(),
      };
      setSingletonInstance(newInstance);
      logAccess(t('singleton.demo.logCreated'));
    } else {
      logAccess(t('singleton.demo.logExisting'));
    }
  };

  const logAccess = (msg: string) => {
    setAccessLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5));
  };

  const resetSingleton = () => {
    setSingletonInstance(null);
    setAccessLog([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT: Bad Practice (No Singleton) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-red-400">{t('singleton.demo.withoutSingleton')}</h3>
          <div className="flex gap-2">
            <button 
              onClick={createNewInstance}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors text-sm font-medium"
            >
              <Plus size={16} /> {t('singleton.demo.newInstance')}
            </button>
            <button 
              onClick={clearMultipleInstances}
              className="p-1.5 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:text-white transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="min-h-[200px] bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-4 relative overflow-hidden">
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4 text-center">
            {t('singleton.demo.instructionBad')}
          </p>
          <div className="flex flex-wrap gap-3 justify-center content-start">
            <AnimatePresence>
              {multipleInstances.map((instance) => (
                <motion.div
                  key={instance.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className={clsx(
                    instance.color,
                    "w-12 h-12 rounded-lg flex items-center justify-center shadow-lg text-gray-900 dark:text-white font-bold text-xs"
                  )}
                  title={`ID: ${instance.id}`}
                >
                  <Database size={20} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-950 p-3 rounded">
          {t('singleton.demo.instancesCreated')}: {multipleInstances.length}
        </div>
      </div>

      {/* RIGHT: Singleton Pattern */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-blue-400">{t('singleton.demo.withSingleton')}</h3>
          <div className="flex gap-2">
            <button 
              onClick={getSingletonInstance}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-gray-900 dark:text-white hover:bg-blue-500 rounded-lg transition-colors text-sm font-medium shadow-lg shadow-blue-900/20"
            >
              <RefreshCw size={16} /> {t('singleton.demo.getInstance')}
            </button>
            <button 
              onClick={resetSingleton}
              className="p-1.5 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:text-white transition-colors"
              title="Reset Demo"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="min-h-[200px] bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-4 flex flex-col items-center justify-center relative">
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4 absolute top-4 w-full text-center px-4">
            {t('singleton.demo.instructionGood')}
          </p>
          
          <AnimatePresence mode='wait'>
            {singletonInstance ? (
              <motion.div
                key="singleton"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.1, 1], opacity: 1 }} // Pulse effect on access
                className="w-24 h-24 bg-blue-600 rounded-2xl flex flex-col items-center justify-center shadow-xl text-gray-900 dark:text-white z-10"
              >
                <Database size={32} className="mb-2" />
                <span className="text-xs font-mono opacity-80">{singletonInstance.id}</span>
              </motion.div>
            ) : (
              <div className="w-24 h-24 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-center text-gray-700">
                <span className="text-xs">Null</span>
              </div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-32 bg-gray-100 dark:bg-gray-950 p-3 rounded overflow-hidden font-mono text-xs">
          <div className="text-gray-500 dark:text-gray-500 mb-1 border-b border-gray-200 dark:border-gray-800 pb-1">{t('singleton.demo.accessLog')}:</div>
          <div className="flex flex-col gap-1">
            {accessLog.map((log, i) => (
              <motion.div 
                key={i}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-green-400"
              >
                &gt; {log}
              </motion.div>
            ))}
            {accessLog.length === 0 && <span className="text-gray-700 italic">{t('singleton.demo.noAccess')}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingletonDemo;
