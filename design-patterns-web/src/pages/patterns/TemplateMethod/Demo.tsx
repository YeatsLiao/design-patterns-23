import React, { useState } from 'react';
import { FileText, FileSpreadsheet, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Abstract Class
abstract class DataMiner {
  constructor(protected t: (key: string) => string) {}

  // Template Method
  public async mine(): Promise<string[]> {
    const steps = [];
    steps.push(await this.openFile());
    steps.push(await this.extractData());
    steps.push(await this.parseData());
    steps.push(await this.closeFile());
    return steps;
  }

  protected abstract openFile(): Promise<string>;
  protected abstract extractData(): Promise<string>;
  protected abstract parseData(): Promise<string>;

  // Hook
  protected async closeFile(): Promise<string> {
    return this.t('templateMethod.demo.commonClose');
  }
}

// Concrete Class 1
class PDFMiner extends DataMiner {
  protected async openFile() { return this.t('templateMethod.demo.pdfOpen'); }
  protected async extractData() { return this.t('templateMethod.demo.pdfExtract'); }
  protected async parseData() { return this.t('templateMethod.demo.pdfParse'); }
}

// Concrete Class 2
class CSVMiner extends DataMiner {
  protected async openFile() { return this.t('templateMethod.demo.csvOpen'); }
  protected async extractData() { return this.t('templateMethod.demo.csvExtract'); }
  protected async parseData() { return this.t('templateMethod.demo.csvParse'); }
}

const TemplateMethodDemo = () => {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const runMiner = async (type: 'pdf' | 'csv') => {
    setIsProcessing(true);
    setLogs([]);
    
    const miner = type === 'pdf' ? new PDFMiner(t) : new CSVMiner(t);
    
    // Simulate async steps for visual effect
    const steps = await miner.mine();
    
    for (const step of steps) {
      setLogs(prev => [...prev, step]);
      await new Promise(r => setTimeout(r, 800));
    }
    
    setIsProcessing(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">{t('templateMethod.demo.title')}</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
           <button 
             onClick={() => runMiner('pdf')}
             disabled={isProcessing}
             className="p-4 bg-red-900/30 hover:bg-red-900/50 border border-red-800 rounded-xl flex flex-col items-center gap-2 text-red-300 transition-colors disabled:opacity-50"
           >
             <FileText size={32} />
             <span>{t('templateMethod.demo.processPDF')}</span>
           </button>
           <button 
             onClick={() => runMiner('csv')}
             disabled={isProcessing}
             className="p-4 bg-green-900/30 hover:bg-green-900/50 border border-green-800 rounded-xl flex flex-col items-center gap-2 text-green-300 transition-colors disabled:opacity-50"
           >
             <FileSpreadsheet size={32} />
             <span>{t('templateMethod.demo.processCSV')}</span>
           </button>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 min-h-[400px]">
         <h4 className="text-gray-400 uppercase tracking-wider text-xs mb-4">{t('templateMethod.demo.executionSteps')}</h4>
         <div className="space-y-4">
            {logs.map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 text-sm text-gray-300 bg-black p-3 rounded border-l-4 border-blue-500"
              >
                 <ArrowDown size={16} className="text-gray-500" />
                 {log}
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default TemplateMethodDemo;
