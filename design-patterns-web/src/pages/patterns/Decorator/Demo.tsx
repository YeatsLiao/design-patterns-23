import React, { useState } from 'react';
import { Coffee, Plus, Check } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

// Component Interface
interface CoffeeDrink {
  description: string;
  cost: number;
  ingredients: string[];
}

// Concrete Component
const BaseCoffee: CoffeeDrink = {
  description: 'Dark Roast',
  cost: 2.00,
  ingredients: ['coffee']
};

const DecoratorDemo = () => {
  const [drink, setDrink] = useState<CoffeeDrink>(BaseCoffee);

  // Decorators
  const addMilk = () => {
    setDrink(prev => ({
      description: prev.description + ', Milk',
      cost: prev.cost + 0.50,
      ingredients: [...prev.ingredients, 'milk']
    }));
  };

  const addSugar = () => {
    setDrink(prev => ({
      description: prev.description + ', Sugar',
      cost: prev.cost + 0.25,
      ingredients: [...prev.ingredients, 'sugar']
    }));
  };

  const addWhip = () => {
    setDrink(prev => ({
      description: prev.description + ', Whip',
      cost: prev.cost + 1.00,
      ingredients: [...prev.ingredients, 'whip']
    }));
  };

  const reset = () => setDrink(BaseCoffee);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Starbuzz Coffee</h3>
        
        <div className="space-y-4 mb-8">
           <button onClick={addMilk} className="w-full flex items-center justify-between px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
              <span className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-white"></div> Add Milk</span>
              <span>+$0.50</span>
           </button>
           <button onClick={addSugar} className="w-full flex items-center justify-between px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
              <span className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-gray-300"></div> Add Sugar</span>
              <span>+$0.25</span>
           </button>
           <button onClick={addWhip} className="w-full flex items-center justify-between px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
              <span className="flex items-center gap-2"><div className="w-4 h-4 rounded-t-full bg-pink-200"></div> Add Whip</span>
              <span>+$1.00</span>
           </button>
        </div>

        <button onClick={reset} className="text-sm text-gray-400 hover:text-white underline w-full text-center">Start Over</button>
      </div>

      <div className="bg-[#3e2723] rounded-xl p-6 border border-[#5d4037] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
         {/* Coffee Cup Visualization */}
         <div className="relative w-40 h-52">
            <div className="absolute inset-x-0 bottom-0 top-8 bg-gray-100 rounded-b-3xl shadow-lg overflow-hidden flex flex-col-reverse">
               {/* Liquid Layers */}
               <AnimatePresence>
                  {drink.ingredients.map((ing, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: ing === 'coffee' ? '60%' : '15%' }}
                      className={clsx(
                        "w-full transition-colors border-t border-black/5",
                        ing === 'coffee' && "bg-[#3e2723]",
                        ing === 'milk' && "bg-[#f5f5f5]",
                        ing === 'sugar' && "bg-[#eeeeee]",
                        ing === 'whip' && "bg-[#f8bbd0]"
                      )}
                    />
                  ))}
               </AnimatePresence>
            </div>
            {/* Cup Handle */}
            <div className="absolute top-12 -right-8 w-10 h-20 border-8 border-gray-100 rounded-r-2xl pointer-events-none"></div>
         </div>

         <div className="mt-8 text-center text-[#d7ccc8]">
            <h4 className="text-2xl font-bold mb-1">${drink.cost.toFixed(2)}</h4>
            <p className="text-sm opacity-80 max-w-xs mx-auto">{drink.description}</p>
         </div>
      </div>
    </div>
  );
};

export default DecoratorDemo;
