import React from 'react';

const MementoGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
        <p className="text-gray-300">
          The <strong>Memento</strong> pattern lets you save and restore the previous state of an object without revealing the details of its implementation.
        </p>
        <p className="text-gray-300 mt-2">
          It's commonly used for "Undo" mechanisms. The "Originator" (Editor) creates a "Memento" (Snapshot) containing its state. 
          The "Caretaker" (History List) stores the memento but cannot read/tamper with it.
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">Code Example</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`class Memento {
  constructor(private state: string) {}
  getState() { return this.state; }
}

class Editor {
  private content: string;
  
  save(): Memento {
    return new Memento(this.content);
  }
  
  restore(m: Memento) {
    this.content = m.getState();
  }
}`}
         </pre>
      </section>
    </div>
  );
};

export default MementoGuide;
