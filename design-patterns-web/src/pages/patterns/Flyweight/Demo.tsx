import { useState, useMemo } from 'react';
import { TreeDeciduous, TreePine } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation, Trans } from 'react-i18next';

// Flyweight: The shared intrinsic state
interface TreeType {
  name: string;
  color: string;
  icon: any;
}

const TreeTypes: Record<string, TreeType> = {
  oak: { name: 'Oak', color: 'text-green-600', icon: TreeDeciduous },
  pine: { name: 'Pine', color: 'text-emerald-800', icon: TreePine },
};

// Context: The unique extrinsic state
interface Tree {
  x: number;
  y: number;
  type: string; // Reference to Flyweight
}

const FlyweightDemo = () => {
  const { t } = useTranslation();
  const [trees, setTrees] = useState<Tree[]>([]);
  const [count, setCount] = useState(0);

  const plantForest = (amount: number) => {
    const newTrees: Tree[] = [];
    for (let i = 0; i < amount; i++) {
      newTrees.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: Math.random() > 0.5 ? 'oak' : 'pine'
      });
    }
    setTrees(prev => [...prev, ...newTrees]);
    setCount(prev => prev + amount);
  };

  const clear = () => {
    setTrees([]);
    setCount(0);
  };

  // Memory calculation simulation
  const memoryUsage = useMemo(() => {
    // Without Flyweight: Each tree object has full data (~20 bytes per tree)
    // With Flyweight: Each tree has only coordinates + reference (~12 bytes), plus 2 shared type objects
    const withoutFlyweight = count * 20; 
    const withFlyweight = (count * 12) + 100; // 100 arbitrary size for shared types
    return { withoutFlyweight, withFlyweight };
  }, [count]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">{t('flyweight.demo.title')}</h3>
        
        <div className="space-y-4 mb-8">
           <button onClick={() => plantForest(10)} className="w-full py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-600 rounded text-white">{t('flyweight.demo.plant10')}</button>
           <button onClick={() => plantForest(100)} className="w-full py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-600 rounded text-white">{t('flyweight.demo.plant100')}</button>
           <button onClick={() => plantForest(1000)} className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-bold">{t('flyweight.demo.plant1000')}</button>
           <button onClick={clear} className="w-full py-2 bg-red-900/50 hover:bg-red-900/70 text-red-200 rounded">{t('flyweight.demo.clear')}</button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg font-mono text-xs">
           <div className="flex justify-between mb-2">
             <span className="text-gray-600 dark:text-gray-400">{t('flyweight.demo.totalTrees')}</span>
             <span className="text-white font-bold">{count.toLocaleString()}</span>
           </div>
           <div className="flex justify-between mb-2">
             <span className="text-gray-600 dark:text-gray-400">{t('flyweight.demo.estMemoryNaive')}</span>
             <span className="text-red-400">{memoryUsage.withoutFlyweight.toLocaleString()} units</span>
           </div>
           <div className="flex justify-between border-t border-gray-200 dark:border-gray-800 pt-2">
             <span className="text-gray-600 dark:text-gray-400">{t('flyweight.demo.estMemoryFlyweight')}</span>
             <span className="text-green-400">{memoryUsage.withFlyweight.toLocaleString()} units</span>
           </div>
           <p className="mt-2 text-gray-500 dark:text-gray-500 italic">{t('flyweight.demo.savings')} {Math.round((1 - memoryUsage.withFlyweight/memoryUsage.withoutFlyweight)*100)}%</p>
        </div>
      </div>

      <div className="bg-[#e8f5e9] rounded-xl overflow-hidden relative min-h-[400px] border border-green-900/20 shadow-inner">
         {/* Render Limit for DOM performance, though Flyweight pattern logic applies to data structure */}
         {trees.slice(0, 2000).map((tree, i) => {
            const type = TreeTypes[tree.type];
            const Icon = type.icon;
            return (
               <div 
                 key={i}
                 className={clsx("absolute", type.color)}
                 style={{ left: `${tree.x}%`, top: `${tree.y}%` }}
               >
                 <Icon size={16} fill="currentColor" className="opacity-80" />
               </div>
            );
         })}
         {trees.length > 2000 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/70 backdrop-blur-md p-6 rounded-xl shadow-xl text-white text-center">
                 <p className="font-bold text-lg mb-1"><Trans i18nKey="flyweight.demo.renderingCapped" values={{ count }} /></p>
              </div>
            </div>
         )}
      </div>
    </div>
  );
};

export default FlyweightDemo;
