import { useState } from 'react';
import { Save, RotateCcw, History } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Memento: Stores state
class Memento {
  private content: string;
  constructor(content: string) {
    this.content = content;
  }
  getContent() { return this.content; }
}

// Caretaker: Manages history
class HistoryManager {
  private mementos: Memento[] = [];

  push(m: Memento) {
    this.mementos.push(m);
  }

  pop(): Memento | undefined {
    return this.mementos.pop();
  }
  
  getCount() { return this.mementos.length; }
}

const MementoDemo = () => {
  const { t } = useTranslation();
  const [text, setText] = useState("Type something here...");
  const [historyManager] = useState(() => new HistoryManager());
  const [historyCount, setHistoryCount] = useState(0);

  const save = () => {
    historyManager.push(new Memento(text));
    setHistoryCount(historyManager.getCount());
  };

  const undo = () => {
    const memento = historyManager.pop();
    if (memento) {
      setText(memento.getContent());
      setHistoryCount(historyManager.getCount());
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('memento.demo.title')}</h3>
        
        <textarea 
          className="w-full h-40 bg-gray-50 dark:bg-gray-900 border border-gray-600 rounded p-4 text-gray-900 dark:text-white font-mono mb-4 focus:border-blue-500 outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('memento.demo.placeholder')}
        />

        <div className="flex gap-4">
           <button onClick={save} className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded text-white flex items-center justify-center gap-2 font-bold">
             <Save size={18} /> {t('memento.demo.save')}
           </button>
           <button onClick={undo} disabled={historyCount === 0} className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-gray-800 dark:disabled:text-gray-600 rounded text-white flex items-center justify-center gap-2">
             <RotateCcw size={18} /> {t('memento.demo.undo', { count: historyCount })}
           </button>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center">
         <History size={64} className="text-gray-400 dark:text-gray-600 mb-4" />
         <div className="text-gray-600 dark:text-gray-400 text-center">
           <p className="mb-2">{t('memento.demo.snapshotStored')}</p>
           <p className="text-xs text-gray-500 dark:text-gray-500">{t('memento.demo.caretakerDesc')}</p>
         </div>
         <div className="mt-8 grid grid-cols-5 gap-2">
            {[...Array(historyCount)].map((_, i) => (
              <div key={i} className="w-8 h-10 bg-blue-200 border border-blue-400 dark:bg-blue-900 dark:border-blue-500 rounded shadow-sm"></div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default MementoDemo;
