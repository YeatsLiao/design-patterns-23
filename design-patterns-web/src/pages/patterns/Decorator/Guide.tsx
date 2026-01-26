import React from 'react';

const DecoratorGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
        <p className="text-gray-300">
          The <strong>Decorator</strong> pattern lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.
        </p>
        <p className="text-gray-300 mt-2">
          It's an alternative to subclassing. Instead of creating <code>MilkCoffee</code>, <code>SugarCoffee</code>, <code>MilkSugarCoffee</code>, 
          you create a <code>Coffee</code> object and "wrap" it with <code>MilkDecorator</code> and then <code>SugarDecorator</code>.
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">Code Example</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`interface Coffee {
  cost(): number;
}

class SimpleCoffee implements Coffee {
  cost() { return 2; }
}

class MilkDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  
  cost() {
    return this.coffee.cost() + 0.5;
  }
}

// Usage
let myCoffee = new SimpleCoffee();
myCoffee = new MilkDecorator(myCoffee); // cost is 2.5`}
         </pre>
      </section>
    </div>
  );
};

export default DecoratorGuide;
