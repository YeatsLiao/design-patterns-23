import React from 'react';

const VisitorGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
        <p className="text-gray-300">
          The <strong>Visitor</strong> pattern lets you separate algorithms from the objects on which they operate.
        </p>
        <p className="text-gray-300 mt-2">
          Imagine you have a graph of Shape objects. You want to export them to XML. 
          Instead of adding an <code>exportXML()</code> method to every Shape class (and cluttering them), 
          you create a separate <code>XmlExportVisitor</code> class. The shapes just "accept" the visitor.
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">Code Example</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`interface Visitor {
  visitDot(d: Dot): void;
  visitRect(r: Rectangle): void;
}

class Dot {
  accept(v: Visitor) { v.visitDot(this); }
}

class ExportVisitor implements Visitor {
  visitDot(d) { console.log("Exporting dot..."); }
  visitRect(r) { console.log("Exporting rect..."); }
}

// Client
const exportVisitor = new ExportVisitor();
dot.accept(exportVisitor);`}
         </pre>
      </section>
    </div>
  );
};

export default VisitorGuide;
