import React from 'react';

const IteratorGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
        <p className="text-gray-300">
          The <strong>Iterator</strong> pattern lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).
        </p>
        <p className="text-gray-300 mt-2">
          It decouples the traversal algorithms from the collection objects. 
          You can have different iterators (Forward, Backward, Shuffle) for the same collection without changing the collection code.
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">Code Example</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`interface Iterator<T> {
  next(): T;
  hasNext(): boolean;
}

class ListIterator implements Iterator<string> {
  private index = 0;
  constructor(private collection: string[]) {}
  
  hasNext() { return this.index < this.collection.length; }
  
  next() {
    return this.collection[this.index++];
  }
}

// Client
const iter = new ListIterator(["A", "B", "C"]);
while(iter.hasNext()) {
  console.log(iter.next());
}`}
         </pre>
      </section>
    </div>
  );
};

export default IteratorGuide;
