import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Monitor, Watch, Package, AlertCircle, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

// Types
type Ecosystem = 'apple' | 'samsung';
type ProductType = 'phone' | 'laptop' | 'watch';

interface Product {
  id: string;
  type: ProductType;
  ecosystem: Ecosystem;
  name: string;
}

const AbstractFactoryDemo = () => {
  const { t } = useTranslation();
  // Bad Practice: Mixing ecosystems randomly
  const [mixedProducts, setMixedProducts] = useState<Product[]>([]);
  
  // Abstract Factory: Guaranteed consistent ecosystem
  const [ecosystemProducts, setEcosystemProducts] = useState<Product[]>([]);
  const [currentFactory, setCurrentFactory] = useState<Ecosystem>('apple');

  // --- Bad Practice Logic ---
  const createRandomProduct = (type: ProductType) => {
    // Randomly choosing ecosystem for each product -> Inconsistency risk!
    const randomEco = Math.random() > 0.5 ? 'apple' : 'samsung';
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 5),
      type,
      ecosystem: randomEco,
      name: getName(randomEco, type)
    };
    setMixedProducts(prev => [...prev, newProduct]);
  };

  // --- Abstract Factory Logic ---
  // The Factory guarantees that all created products belong to the same family
  const createFamilyProduct = (type: ProductType) => {
    // We use the current factory (AppleFactory or SamsungFactory)
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 5),
      type,
      ecosystem: currentFactory,
      name: getName(currentFactory, type)
    };
    setEcosystemProducts(prev => [...prev, newProduct]);
  };

  const getName = (eco: Ecosystem, type: ProductType) => {
    if (eco === 'apple') {
      if (type === 'phone') return 'iPhone 15';
      if (type === 'laptop') return 'MacBook Pro';
      if (type === 'watch') return 'Apple Watch';
    } else {
      if (type === 'phone') return 'Galaxy S24';
      if (type === 'laptop') return 'Galaxy Book';
      if (type === 'watch') return 'Galaxy Watch';
    }
    return 'Unknown';
  };

  const getStyle = (eco: Ecosystem) => {
    return eco === 'apple' 
      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500' 
      : 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 border-blue-300 dark:border-blue-700';
  };

  const renderIcon = (type: ProductType) => {
    switch (type) {
      case 'phone': return <Smartphone size={20} />;
      case 'laptop': return <Monitor size={20} />;
      case 'watch': return <Watch size={20} />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT: Bad Practice (Inconsistent Families) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-red-500 dark:text-red-400 flex items-center gap-2">
            <AlertCircle size={20} />
            {t('abstractFactory.demo.inconsistentFamilies')}
          </h3>
          <button onClick={() => setMixedProducts([])} className="text-xs text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1">
             <Trash2 size={12} /> {t('common.clear')}
          </button>
        </div>

        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {t('abstractFactory.demo.inconsistentFamiliesDesc')}
          </p>
          <div className="flex gap-2">
            <button onClick={() => createRandomProduct('phone')} className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded text-sm text-gray-700 dark:text-gray-200 shadow-sm transition-all flex items-center gap-2">
              <Smartphone size={16} /> +Phone
            </button>
            <button onClick={() => createRandomProduct('laptop')} className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded text-sm text-gray-700 dark:text-gray-200 shadow-sm transition-all flex items-center gap-2">
              <Monitor size={16} /> +Laptop
            </button>
          </div>
        </div>

        <div className="min-h-[150px] bg-gray-100 dark:bg-gray-950 rounded-lg p-3 flex flex-wrap gap-2 content-start border border-gray-200 dark:border-gray-800">
            <AnimatePresence>
              {mixedProducts.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className={clsx(
                    "px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-medium border shadow-sm",
                    getStyle(p.ecosystem)
                  )}
                >
                  {renderIcon(p.type)}
                  <span>{p.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {mixedProducts.length === 0 && <span className="text-gray-400 dark:text-gray-600 text-xs w-full text-center mt-10">{t('abstractFactory.demo.emptyDesk')}</span>}
        </div>
        
        {/* Warning about mixing */}
        {mixedProducts.some(p => p.ecosystem === 'apple') && mixedProducts.some(p => p.ecosystem === 'samsung') && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded text-red-600 dark:text-red-300 text-xs flex items-center gap-2"
          >
            <AlertCircle size={14} />
            {t('abstractFactory.demo.warning')}
          </motion.div>
        )}
      </div>

      {/* RIGHT: Abstract Factory */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-purple-200 dark:border-purple-500/30 shadow-sm dark:shadow-[0_0_15px_rgba(168,85,247,0.1)]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
            <Package size={20} />
            {t('abstractFactory.demo.abstractFactory')}
          </h3>
          <button onClick={() => setEcosystemProducts([])} className="text-xs text-gray-500 hover:text-purple-500 transition-colors flex items-center gap-1">
             <Trash2 size={12} /> {t('common.clear')}
          </button>
        </div>

        <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-100 dark:border-purple-900/30">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {t('abstractFactory.demo.abstractFactoryDesc')}
          </p>
          
          <div className="flex items-center justify-between bg-white dark:bg-gray-950 p-2 rounded-lg mb-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentFactory('apple')}
                className={clsx(
                  "px-3 py-1.5 rounded text-sm transition-colors",
                  currentFactory === 'apple' 
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold shadow-sm" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {t('abstractFactory.demo.appleFactory')}
              </button>
              <button
                onClick={() => setCurrentFactory('samsung')}
                className={clsx(
                  "px-3 py-1.5 rounded text-sm transition-colors",
                  currentFactory === 'samsung' 
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-bold shadow-sm" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {t('abstractFactory.demo.samsungFactory')}
              </button>
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-wider font-mono px-2">
              {t('abstractFactory.demo.active')}
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => createFamilyProduct('phone')} className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded text-sm text-white flex justify-center items-center gap-2 shadow-sm transition-all active:scale-95">
              <Smartphone size={16} /> {t('abstractFactory.demo.createPhone')}
            </button>
            <button onClick={() => createFamilyProduct('laptop')} className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded text-sm text-white flex justify-center items-center gap-2 shadow-sm transition-all active:scale-95">
              <Monitor size={16} /> {t('abstractFactory.demo.createLaptop')}
            </button>
          </div>
        </div>

        <div className="min-h-[150px] bg-gray-100 dark:bg-gray-950 rounded-lg p-3 flex flex-col gap-2 border border-gray-200 dark:border-gray-800">
            <AnimatePresence>
              {ecosystemProducts.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  className={clsx(
                    "px-4 py-3 rounded-lg flex items-center justify-between text-sm border-l-4 shadow-sm bg-white dark:bg-gray-900",
                    p.ecosystem === 'apple' 
                      ? "text-gray-900 dark:text-gray-100 border-gray-400" 
                      : "text-blue-900 dark:text-blue-100 border-blue-500"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {renderIcon(p.type)}
                    <span className="font-semibold">{p.name}</span>
                  </div>
                  <span className="text-[10px] opacity-60 uppercase tracking-wider">{p.ecosystem} Family</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {ecosystemProducts.length === 0 && <span className="text-gray-400 dark:text-gray-600 text-xs w-full text-center my-auto">{t('abstractFactory.demo.productionLineEmpty')}</span>}
        </div>
      </div>
    </div>
  );
};

export default AbstractFactoryDemo;
