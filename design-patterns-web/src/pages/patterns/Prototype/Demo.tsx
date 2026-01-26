import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Trash2, Circle, Square } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface Shape {
  id: string;
  type: 'circle' | 'square';
  color: string;
  x: number;
  y: number;
}

const PrototypeDemo = () => {
  const { t } = useTranslation();
  const [shapes, setShapes] = useState<Shape[]>([
    { id: 'orig-1', type: 'circle', color: 'bg-red-500', x: 20, y: 20 },
    { id: 'orig-2', type: 'square', color: 'bg-blue-500', x: 80, y: 20 }
  ]);

  const cloneShape = (shape: Shape) => {
    const newShape: Shape = {
      ...shape, // The "Clone" magic happens here (shallow copy in JS)
      id: Math.random().toString(36).substr(2, 5),
      x: shape.x + 20,
      y: shape.y + 20,
    };
    setShapes(prev => [...prev, newShape]);
  };

  const clearClones = () => {
    setShapes(prev => prev.filter(s => s.id.startsWith('orig')));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('prototype.demo.title')}</h3>
           <button onClick={clearClones} className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white flex items-center gap-1">
             <Trash2 size={12} /> {t('prototype.demo.clearClones')}
           </button>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {t('prototype.demo.instruction')}
        </p>

        <div className="space-y-2">
          {shapes.map(shape => (
            <div key={shape.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
               <div className="flex items-center gap-3">
                 <div className={clsx("w-6 h-6", shape.type === 'circle' ? 'rounded-full' : 'rounded-sm', shape.color)}></div>
                 <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">{shape.id} ({shape.type})</span>
               </div>
               <button 
                 onClick={() => cloneShape(shape)}
                 className="p-2 bg-white dark:bg-gray-800 hover:bg-gray-700 rounded-md text-blue-400 transition-colors"
                 title={t('prototype.demo.cloneTooltip')}
               >
                 <Copy size={16} />
               </button>
            </div>
          ))}
        </div>
      </div>

      {/* Visualization Canvas */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 relative min-h-[400px] overflow-hidden">
        <div className="absolute top-4 left-4 text-xs text-gray-600 font-mono">{t('prototype.demo.canvas')}</div>
        <AnimatePresence>
          {shapes.map((shape) => (
            <motion.div
              key={shape.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1, x: shape.x * 3, y: shape.y * 3 }}
              drag
              dragConstraints={{ left: 0, right: 300, top: 0, bottom: 300 }}
              className={clsx(
                "absolute w-16 h-16 shadow-lg flex items-center justify-center text-gray-900 dark:text-white/50 cursor-grab active:cursor-grabbing hover:ring-2 ring-white/30",
                shape.type === 'circle' ? 'rounded-full' : 'rounded-xl',
                shape.color
              )}
            >
              {shape.type === 'circle' ? <Circle size={24} /> : <Square size={24} />}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PrototypeDemo;
