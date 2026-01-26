import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Car, Bike, Settings, AlertCircle, ShoppingCart } from 'lucide-react';
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
  // The client code has to know exactly HOW to create each object
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
  // The client asks the Factory to create a product, without worrying about instantiation details
  const orderFromFactory = () => {
    // This represents the "Creator" class logic
    const createProduct = (type: ProductType): Product => {
      // Factory Method Logic
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
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-red-400 flex items-center gap-2">
            <AlertCircle size={20} />
            {t('factory.demo.tightCoupling')}
          </h3>
          <button onClick={clearAll} className="text-xs text-gray-500 hover:text-white">{t('common.clearAll')}</button>
        </div>

        <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-red-900/20">
          <p className="text-sm text-gray-400 mb-3">
             <Trans i18nKey="factory.demo.tightCouplingDesc" />
          </p>
          <div className="flex flex-wrap gap-2">
            <button onClick={createCarManually} className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm text-blue-300">
              new Car()
            </button>
            <button onClick={createTruckManually} className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm text-red-300">
              new Truck()
            </button>
            <button onClick={createBikeManually} className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm text-green-300">
              new Bike()
            </button>
          </div>
        </div>

        <div className="min-h-[150px] bg-gray-950 rounded-lg p-3 flex flex-wrap gap-2 content-start">
            <AnimatePresence>
              {badProducts.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={clsx(getProductColor(p.type), "w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md")}
                >
                  {renderIcon(p.type)}
                </motion.div>
              ))}
            </AnimatePresence>
            {badProducts.length === 0 && <span className="text-gray-700 text-xs w-full text-center mt-10">{t('factory.demo.noMessyObjects')}</span>}
        </div>
      </div>

      {/* RIGHT: Factory Method Pattern */}
      <div className="bg-gray-800 rounded-xl p-6 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-blue-400 flex items-center gap-2">
            <Settings size={20} />
            {t('factory.demo.factoryPattern')}
          </h3>
        </div>

        <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-blue-900/20">
          <p className="text-sm text-gray-400 mb-3">
             <Trans i18nKey="factory.demo.factoryPatternDesc" />
          </p>
          
          <div className="flex items-center gap-4 bg-gray-950 p-3 rounded-lg border border-gray-700">
            <div className="flex-1">
              <label className="text-xs text-gray-500 block mb-1">{t('factory.demo.selectLogistics')}</label>
              <div className="flex gap-2">
                {(['car', 'truck', 'bike'] as ProductType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedFactory(type)}
                    className={clsx(
                      "p-2 rounded-md transition-all",
                      selectedFactory === type ? "bg-blue-600 text-white shadow-lg" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    )}
                  >
                    {renderIcon(type)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-10 w-[1px] bg-gray-700"></div>

            <button 
              onClick={orderFromFactory}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-lg shadow-lg transition-all active:scale-95"
            >
              <ShoppingCart size={18} />
              <span>{t('factory.demo.order')}</span>
            </button>
          </div>
        </div>

        {/* Assembly Line Visualization */}
        <div className="min-h-[150px] bg-gray-950 rounded-lg p-3 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-800 -translate-y-1/2 rounded-full"></div>
            
            <div className="flex gap-4 items-center h-full overflow-x-auto px-4 pb-2 relative z-10">
              <AnimatePresence>
                {factoryProducts.map((p, index) => (
                  <motion.div
                    key={p.id}
                    initial={{ x: -50, opacity: 0, rotate: -90 }}
                    animate={{ x: 0, opacity: 1, rotate: 0 }}
                    className={clsx(
                      "flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center text-white shadow-xl border border-white/10",
                      getProductColor(p.type)
                    )}
                  >
                    {renderIcon(p.type)}
                    <span className="text-[10px] font-mono mt-1 opacity-80">{p.type}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {factoryProducts.length === 0 && <span className="text-gray-600 text-xs absolute top-2 left-2">{t('factory.demo.assemblyLineEmpty')}</span>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default FactoryDemo;
