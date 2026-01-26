import React, { useState } from 'react';
import { Circle, Square, FileCode, FileJson } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Element Interface
interface Shape {
  accept(v: Visitor): string;
}

class Dot implements Shape {
  accept(v: Visitor) { return v.visitDot(this); }
}

class Rectangle implements Shape {
  accept(v: Visitor) { return v.visitRectangle(this); }
}

// Visitor Interface
interface Visitor {
  visitDot(d: Dot): string;
  visitRectangle(r: Rectangle): string;
}

// Concrete Visitor 1: XML
class XmlExportVisitor implements Visitor {
  visitDot(d: Dot) { return "<dot></dot>"; }
  visitRectangle(r: Rectangle) { return "<rectangle></rectangle>"; }
}

// Concrete Visitor 2: JSON
class JsonExportVisitor implements Visitor {
  visitDot(d: Dot) { return "{ \"shape\": \"dot\" }"; }
  visitRectangle(r: Rectangle) { return "{ \"shape\": \"rectangle\" }"; }
}

const VisitorDemo = () => {
  const { t } = useTranslation();
  const [shapes] = useState<Shape[]>([new Dot(), new Rectangle(), new Dot()]);
  const [output, setOutput] = useState("");

  const exportXML = () => {
    const visitor = new XmlExportVisitor();
    const result = shapes.map(s => s.accept(visitor)).join("\n");
    setOutput(result);
  };

  const exportJSON = () => {
    const visitor = new JsonExportVisitor();
    const result = "[\n" + shapes.map(s => "  " + s.accept(visitor)).join(",\n") + "\n]";
    setOutput(result);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('visitor.demo.title')}</h3>
        
        <div className="flex gap-4 mb-8 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
           <div className="p-2 bg-white dark:bg-gray-800 rounded"><Circle size={20} className="text-blue-400" /></div>
           <div className="p-2 bg-white dark:bg-gray-800 rounded"><Square size={20} className="text-green-400" /></div>
           <div className="p-2 bg-white dark:bg-gray-800 rounded"><Circle size={20} className="text-blue-400" /></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button onClick={exportXML} className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg flex flex-col items-center gap-2 text-gray-900 dark:text-white">
             <FileCode size={24} /> {t('visitor.demo.exportXML')}
           </button>
           <button onClick={exportJSON} className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg flex flex-col items-center gap-2 text-gray-900 dark:text-white">
             <FileJson size={24} /> {t('visitor.demo.exportJSON')}
           </button>
        </div>
      </div>

      <div className="bg-black rounded-xl p-6 border border-gray-200 dark:border-gray-800 font-mono text-xs text-green-400 overflow-auto min-h-[300px]">
         <pre>{output || t('visitor.demo.placeholder')}</pre>
      </div>
    </div>
  );
};

export default VisitorDemo;
