import React from 'react';

const TemplateMethodGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
        <p className="text-gray-300">
          The <strong>Template Method</strong> pattern defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.
        </p>
        <p className="text-gray-300 mt-2">
          Think of a recipe. The general steps are "Prep &rarr; Cook &rarr; Serve". 
          The abstract class defines this flow. 
          A <code>PastaDish</code> subclass implements "Boil Water" for Cook. 
          A <code>SteakDish</code> subclass implements "Grill" for Cook. 
          The order remains the same.
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">Code Example</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`abstract class DataMiner {
  // Template Method (The Flow)
  mine() {
    const file = this.openFile();
    const raw = this.extractData(file);
    const data = this.parseData(raw);
    this.closeFile(file);
  }

  // Steps to be implemented
  abstract openFile();
  abstract extractData(file);
  abstract parseData(raw);

  // Common step (Hook)
  closeFile(file) { /* Default close */ }
}`}
         </pre>
      </section>
    </div>
  );
};

export default TemplateMethodGuide;
