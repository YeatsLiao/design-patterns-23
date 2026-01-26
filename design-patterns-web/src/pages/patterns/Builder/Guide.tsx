import React from 'react';

const BuilderGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
        <p className="text-gray-300">
          The <strong>Builder</strong> pattern lets you construct complex objects step by step. 
          The pattern allows you to produce different types and representations of an object using the same construction code.
        </p>
        <p className="text-gray-300 mt-2">
          Imagine a burger restaurant. Some customers want cheese, some want no lettuce, some want double patties. 
          Instead of creating separate classes for <code>CheeseBurger</code>, <code>NoLettuceBurger</code>, etc., 
          you use a builder to assemble the burger according to specific preferences.
        </p>
      </section>
      
      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">Code Example</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`class BurgerBuilder {
  private burger: Burger;

  constructor() { this.reset(); }

  reset() { this.burger = new Burger(); }

  addPatty() { this.burger.layers.push('Patty'); }
  addCheese() { this.burger.layers.push('Cheese'); }
  
  getResult(): Burger { return this.burger; }
}

// Usage
const builder = new BurgerBuilder();
builder.addPatty();
builder.addCheese();
const myMeal = builder.getResult();`}
         </pre>
      </section>
    </div>
  );
};

export default BuilderGuide;
