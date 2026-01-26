import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

// The "Product"
interface Burger {
  layers: string[];
}

const BuilderDemo = () => {
  const { t } = useTranslation();
  const [burger, setBurger] = useState<Burger>({ layers: ['bottom-bun'] });
  
  // Builder Methods
  const addLayer = (layer: string) => {
    setBurger(prev => ({ ...prev, layers: [layer, ...prev.layers] }));
  };

  const reset = () => {
    setBurger({ layers: ['bottom-bun'] });
  };

  const finish = () => {
    if (burger.layers[0] !== 'top-bun') {
      addLayer('top-bun');
    }
  };

  const ingredients = [
    { id: 'patty', label: 'Beef Patty', color: 'bg-amber-900', h: 'h-4' },
    { id: 'cheese', label: 'Cheese', color: 'bg-yellow-400', h: 'h-2' },
    { id: 'lettuce', label: 'Lettuce', color: 'bg-green-500', h: 'h-2' },
    { id: 'tomato', label: 'Tomato', color: 'bg-red-500', h: 'h-2' },
    { id: 'bacon', label: 'Bacon', color: 'bg-red-800', h: 'h-2' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Builder Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('builder.demo.title')}</h3>
        
        <div className="space-y-3 mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">{t('builder.demo.step1')}</p>
          <div className="grid grid-cols-2 gap-2">
            {ingredients.map(ing => (
              <button
                key={ing.id}
                onClick={() => addLayer(ing.id)}
                className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm text-gray-900 dark:text-white transition-colors border border-gray-200 dark:border-gray-600"
              >
                <span>{ing.label}</span>
                <Plus size={16} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
           <p className="text-sm text-gray-600 dark:text-gray-400">{t('builder.demo.step2')}</p>
           <button 
             onClick={finish}
             className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
           >
             <Check size={18} /> {t('builder.demo.complete')}
           </button>
           <button 
             onClick={reset}
             className="w-full py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg flex items-center justify-center gap-2 transition-all border border-gray-200 dark:border-gray-600"
           >
             <RotateCcw size={18} /> {t('builder.demo.reset')}
           </button>
        </div>
      </div>

      {/* Product Visualization */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-end min-h-[400px] relative overflow-hidden">
        <div className="flex flex-col items-center w-48 gap-1">
          <AnimatePresence>
            {burger.layers.map((layer, index) => {
              const ing = ingredients.find(i => i.id === layer);
              
              if (layer === 'bottom-bun') {
                return (
                  <motion.div key="bottom" layout initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full h-8 bg-amber-600 rounded-b-xl shadow-sm border-b-4 border-amber-700" />
                );
              }
              if (layer === 'top-bun') {
                return (
                  <motion.div key={`top-${index}`} layout initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full h-12 bg-amber-600 rounded-t-full shadow-sm border-b-4 border-amber-700 relative z-10">
                     <div className="absolute top-2 left-4 w-1 h-1 bg-amber-200 rounded-full opacity-50"></div>
                     <div className="absolute top-4 left-8 w-1 h-1 bg-amber-200 rounded-full opacity-50"></div>
                     <div className="absolute top-3 right-6 w-1 h-1 bg-amber-200 rounded-full opacity-50"></div>
                  </motion.div>
                );
              }
              
              return (
                <motion.div
                  key={`${layer}-${index}`}
                  layout
                  initial={{ y: -100, opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className={clsx(
                    "w-full rounded-sm shadow-sm border border-black/10 dark:border-white/10",
                    ing?.color,
                    ing?.h
                  )}
                />
              );
            })}
          </AnimatePresence>
        </div>
        <div className="mt-8 text-center">
            <h4 className="text-gray-900 dark:text-white font-bold text-lg">{t('builder.demo.yourBurger')}</h4>
            <p className="text-gray-500 dark:text-gray-500 text-xs">{burger.layers.length} {t('builder.demo.layers')}</p>
        </div>
      </div>
    </div>
  );
};

export default BuilderDemo;
