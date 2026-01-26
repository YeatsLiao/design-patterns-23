import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle, Truck } from 'lucide-react';

const FactoryGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      {/* 1. Concept Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="text-yellow-400" />
          Concept
        </h2>
        <div className="prose prose-invert text-gray-300">
          <p>
            Imagine you are building a logistics management application. Initially, your app only handles transportation by <strong>Trucks</strong>.
            Later, your app becomes popular, and you need to add <strong>Ships</strong> for sea logistics.
          </p>
          <p className="mt-4">
            If your code is tightly coupled to the <code>Truck</code> class, adding <code>Ship</code> would require changing the entire codebase.
            The <strong>Factory Method</strong> pattern solves this by defining an interface for creating objects in a superclass, but allowing subclasses to alter the type of objects that will be created.
          </p>
        </div>
      </section>

      {/* 2. Code Comparison */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Bad Code */}
        <div className="bg-gray-950 rounded-lg p-4 border border-red-900/30">
          <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle size={18} />
            Coupled Code
          </h3>
          <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`// Client code needs to know everything
import { Truck } from './Truck';
import { Ship } from './Ship';

function deliver(type) {
  let transport;
  if (type === 'road') {
    transport = new Truck();
  } else if (type === 'sea') {
    transport = new Ship();
  }
  // ... adding Air needs code change here!
  transport.deliver();
}`}
          </pre>
        </div>

        {/* Good Code */}
        <div className="bg-gray-950 rounded-lg p-4 border border-green-900/30">
          <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
            <CheckCircle size={18} />
            Factory Method
          </h3>
          <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`// Client works with the interface
abstract class Logistics {
  abstract createTransport(): Transport;
  
  planDelivery() {
    const transport = this.createTransport();
    transport.deliver();
  }
}

class RoadLogistics extends Logistics {
  createTransport() { return new Truck(); }
}

// Client Code
new RoadLogistics().planDelivery();`}
          </pre>
        </div>
      </section>

      {/* 3. When to use */}
      <section>
        <h3 className="text-xl font-semibold text-white mb-3">When to use?</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Use the Factory Method when you don't know beforehand the exact types and dependencies of the objects your code should work with.</li>
          <li>Use it when you want to provide users of your library or framework with a way to extend its internal components.</li>
          <li>Use it when you want to save system resources by reusing existing objects instead of rebuilding them each time (similar to Object Pool).</li>
        </ul>
      </section>
    </div>
  );
};

export default FactoryGuide;
