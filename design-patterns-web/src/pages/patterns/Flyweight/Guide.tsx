import React from 'react';

const FlyweightGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
        <p className="text-gray-300">
          The <strong>Flyweight</strong> pattern lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object.
        </p>
        <p className="text-gray-300 mt-2">
          In a forest game, each tree has a position (unique) and a texture/model (shared). 
          Instead of loading the texture 1,000 times for 1,000 trees, you load it once and have all 1,000 trees reference that single texture object.
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">Code Example</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`// Shared State (Flyweight)
class TreeType {
  constructor(name, color, texture) { ... }
  draw(x, y) { ... }
}

// Unique State (Context)
class Tree {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; // Reference to Flyweight
  }
  draw() {
    this.type.draw(this.x, this.y);
  }
}

// Factory ensures reuse
class TreeFactory {
  static getTreeType(name) {
    // Return existing instance or create new
  }
}`}
         </pre>
      </section>
    </div>
  );
};

export default FlyweightGuide;
