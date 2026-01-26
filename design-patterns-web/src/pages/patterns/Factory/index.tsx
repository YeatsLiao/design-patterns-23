import React from 'react';
import FactoryDemo from './Demo';
import FactoryGuide from './Guide';

const FactoryPage = () => {
  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="border-b border-gray-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-blue-900/50 text-blue-300 text-xs font-semibold rounded-full border border-blue-800">
            Creational Pattern
          </span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Factory Method Pattern</h1>
        <p className="text-xl text-gray-400 max-w-3xl">
          Defines an interface for creating an object, but lets subclasses decide which class to instantiate.
          Factory Method lets a class defer instantiation to subclasses.
        </p>
      </div>

      {/* Interactive Demo Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>
        <FactoryDemo />
      </section>

      {/* Detailed Guide Section */}
      <section>
        <FactoryGuide />
      </section>
    </div>
  );
};

export default FactoryPage;
