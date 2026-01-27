import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Expression Interface
interface Expression {
  interpret(): number;
}

class NumberExpression implements Expression {
  private number: number;
  constructor(number: number) {
    this.number = number;
  }
  interpret() { return this.number; }
}

class AddExpression implements Expression {
  private left: Expression;
  private right: Expression;
  constructor(left: Expression, right: Expression) {
    this.left = left;
    this.right = right;
  }
  interpret() { return this.left.interpret() + this.right.interpret(); }
}

class SubtractExpression implements Expression {
  private left: Expression;
  private right: Expression;
  constructor(left: Expression, right: Expression) {
    this.left = left;
    this.right = right;
  }
  interpret() { return this.left.interpret() - this.right.interpret(); }
}

// Simple Parser (Context)
const parse = (input: string): Expression => {
  const tokens = input.split(' ');
  let result: Expression = new NumberExpression(parseInt(tokens[0]));

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const nextNumber = new NumberExpression(parseInt(tokens[i + 1]));

    if (operator === '+') {
      result = new AddExpression(result, nextNumber);
    } else if (operator === '-') {
      result = new SubtractExpression(result, nextNumber);
    }
  }
  return result;
};

const InterpreterDemo = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState("5 + 10 - 3");
  const [result, setResult] = useState<number | null>(null);
  const [treeVisualization, setTreeVisualization] = useState<string>("");

  const handleCalculate = () => {
    try {
      const expression = parse(input);
      setResult(expression.interpret());
      setTreeVisualization(t('interpreter.demo.success'));
    } catch (e) {
      setResult(null);
      setTreeVisualization(t('interpreter.demo.error'));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('interpreter.demo.title')}</h3>
        
        <div className="mb-4">
           <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">{t('interpreter.demo.label')}</label>
           <div className="flex gap-2">
             <input 
               type="text" 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-4 py-2 text-gray-900 dark:text-white font-mono"
             />
             <button 
               onClick={handleCalculate}
               className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
             >
               <Calculator size={18} /> {t('interpreter.demo.interpret')}
             </button>
           </div>
           <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{t('interpreter.demo.supported')}</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center min-h-[300px]">
         {result !== null ? (
           <div className="text-center">
             <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('interpreter.demo.result')}</div>
             <div className="text-6xl font-bold text-green-400 font-mono">{result}</div>
             <div className="mt-4 text-xs text-gray-600 font-mono">{treeVisualization}</div>
           </div>
         ) : (
           <div className="text-gray-600">{t('interpreter.demo.waiting')}</div>
         )}
      </div>
    </div>
  );
};

export default InterpreterDemo;
