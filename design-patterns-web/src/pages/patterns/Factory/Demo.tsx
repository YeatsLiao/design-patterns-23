import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Car, Bike, Settings, AlertCircle, ShoppingCart, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation, Trans } from 'react-i18next';

// Types of products
type ProductType = 'car' | 'truck' | 'bike';

interface Product {
  id: string;
  type: ProductType;
  createdAt: number;
}

const FactoryDemo = () => {
  const { t } = useTranslation();
  // --- Bad Practice State ---
  const [badProducts, setBadProducts] = useState<Product[]>([]);
  
  // --- Factory Pattern State ---
  const [factoryProducts, setFactoryProducts] = useState<Product[]>([]);
  const [selectedFactory, setSelectedFactory] = useState<ProductType>('car');

  // --- Bad Practice Actions ---
  const createCarManually = () => {
    const p: Product = { id: Math.random().toString(36).substr(2, 5), type: 'car', createdAt: Date.now() };
    setBadProducts(prev => [...prev, p]);
  };
  const createTruckManually = () => {
    const p: Product = { id: Math.random().toString(36).substr(2, 5), type: 'truck', createdAt: Date.now() };
    setBadProducts(prev => [...prev, p]);
  };
  const createBikeManually = () => {
    const p: Product = { id: Math.random().toString(36).substr(2, 5), type: 'bike', createdAt: Date.now() };
    setBadProducts(prev => [...prev, p]);
  };

  // --- Factory Pattern Actions ---
  const orderFromFactory = () => {
    const createProduct = (type: ProductType): Product => {
      return { id: Math.random().toString(36).substr(2, 5), type, createdAt: Date.now() };
    };

    const newProduct = createProduct(selectedFactory);
    setFactoryProducts(prev => [...prev, newProduct]);
  };

  const clearAll = () => {
    setBadProducts([]);
    setFactoryProducts([]);
  };

  const renderIcon = (type: ProductType) => {
    switch (type) {
      case 'car': return <Car size={20} />;
      case 'truck': return <Truck size={20} />;
      case 'bike': return <Bike size={20} />;
    }
  };

  const getProductColor = (type: ProductType) => {
    switch (type) {
      case 'car': return 'bg-blue-500';
      case 'truck': return 'bg-red-500';
      case 'bike': return 'bg-green-500';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT: Bad Practice (Tight Coupling) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-red-500 dark:text-red-400 flex items-center gap-2">
            <AlertCircle size={20} />
            {t('factory.demo.tightCoupling')}
          </h3>
          <button onClick={clearAll} className="text-xs text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1">
             <Trash2 size={12} /> {t('common.clearAll')}
          </button>
        </div>

        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
             <Trans i18nKey="factory.demo.tightCouplingDesc" />
          </p>
          <div className="flex flex-wrap gap-2">
            <button onClick={createCarManually} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded text-sm text-blue-600 dark:text-blue-300 shadow-sm transition-all">
              new Car()
            </button>
            <button onClick={createTruckManually} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded text-sm text-red-600 dark:text-red-300 shadow-sm transition-all">
              new Truck()
            </button>
            <button onClick={createBikeManually} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded text-sm text-green-600 dark:text-green-300 shadow-sm transition-all">
              new Bike()
            </button>
          </div>
        </div>

        <div className="max-h-[300px] overflow-y-auto min-h-[150px] bg-gray-100 dark:bg-gray-950 rounded-lg p-3 flex flex-wrap gap-2 content-start border border-gray-200 dark:border-gray-800 custom-scrollbar">
            <AnimatePresence>
              {badProducts.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className={clsx(getProductColor(p.type), "w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md")}
                >
                  {renderIcon(p.type)}
                </motion.div>
              ))}
            </AnimatePresence>
            {badProducts.length === 0 && <span className="text-gray-400 dark:text-gray-600 text-xs w-full text-center mt-10">{t('factory.demo.noMessyObjects')}</span>}
        </div>
      </div>

      {/* RIGHT: Factory Method Pattern */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-blue-200 dark:border-blue-500/30 shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.1)]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Settings size={20} />
            {t('factory.demo.factoryPattern')}
          </h3>
        </div>

        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/30">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
             <Trans i18nKey="factory.demo.factoryPatternDesc" />
          </p>
          
          <div className="flex items-center gap-4 bg-white dark:bg-gray-950 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex-1">
              <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-2">{t('factory.demo.selectLogistics')}</label>
              <div className="flex gap-2">
                {(['car', 'truck', 'bike'] as ProductType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedFactory(type)}
                    className={clsx(
                      "p-2 rounded-md transition-all",
                      selectedFactory === type 
                        ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500 dark:ring-blue-400" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    )}
                  >
                    {renderIcon(type)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-10 w-[1px] bg-gray-200 dark:bg-gray-700"></div>

            <button 
              onClick={orderFromFactory}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <ShoppingCart size={18} />
              <span>{t('factory.demo.order')}</span>
            </button>
          </div>
        </div>

        {/* Assembly Line Visualization */}
        <div className="min-h-[150px] bg-gray-100 dark:bg-gray-950 rounded-lg p-3 relative overflow-hidden border border-gray-200 dark:border-gray-800">
            {/* Track Line */}
            <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 rounded-full"></div>
            
            <div className="flex gap-4 items-center h-full overflow-x-auto px-4 pb-2 relative z-10 custom-scrollbar hide-scrollbar-thumb">
              <AnimatePresence>
                {factoryProducts.map((p, index) => (
                  <motion.div
                    key={p.id}
                    initial={{ x: -50, opacity: 0, rotate: -90 }}
                    animate={{ x: 0, opacity: 1, rotate: 0 }}
                    className={clsx(
                      "flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center text-white shadow-lg border border-white/10",
                      getProductColor(p.type)
                    )}
                  >
                    {renderIcon(p.type)}
                    <span className="text-[10px] font-mono mt-1 opacity-90">{p.type}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {factoryProducts.length === 0 && <span className="text-gray-400 dark:text-gray-600 text-xs absolute top-2 left-2">{t('factory.demo.assemblyLineEmpty')}</span>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default FactoryDemo;
