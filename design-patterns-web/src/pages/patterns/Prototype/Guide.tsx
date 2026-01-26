import React from 'react';

const PrototypeGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
        <p className="text-gray-300">
          The <strong>Prototype</strong> pattern lets you copy existing objects without making your code dependent on their classes.
        </p>
        <p className="text-gray-300 mt-2">
          It delegates the cloning process to the actual objects that are being cloned. 
          The pattern declares a common interface for all objects that support cloning. 
          This interface usually lets you clone an object without coupling your code to the class of that object.
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">Code Example</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`interface Prototype {
  clone(): Prototype;
}

class Shape implements Prototype {
  constructor(public color: string) {}

  clone(): Shape {
    // Create a new object with same state
    return new Shape(this.color);
  }
}

// Usage
const original = new Shape("red");
const copy = original.clone();`}
         </pre>
      </section>
    </div>
  );
};

export default PrototypeGuide;
