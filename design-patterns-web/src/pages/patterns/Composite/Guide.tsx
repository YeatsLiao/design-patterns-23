import React from 'react';

const CompositeGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
        <p className="text-gray-300">
          The <strong>Composite</strong> pattern lets you compose objects into tree structures and then work with these structures as if they were individual objects.
        </p>
        <p className="text-gray-300 mt-2">
          It's perfect for hierarchical structures like file systems, menus, or organization charts. 
          The client code can treat a simple element (File) and a complex container (Folder) in the same way (e.g., calling <code>getSize()</code>).
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">Code Example</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`interface Component {
  getSize(): number;
}

class File implements Component {
  constructor(private size: number) {}
  getSize() { return this.size; }
}

class Folder implements Component {
  private children: Component[] = [];
  
  add(c: Component) { this.children.push(c); }
  
  getSize() {
    // Recursive delegation
    return this.children.reduce((sum, c) => sum + c.getSize(), 0);
  }
}`}
         </pre>
      </section>
    </div>
  );
};

export default CompositeGuide;
