import React from 'react';
import AbstractFactoryDemo from './Demo';
import AbstractFactoryGuide from './Guide';

const AbstractFactoryPage = () => {
  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="border-b border-gray-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-purple-900/50 text-purple-300 text-xs font-semibold rounded-full border border-purple-800">
            Creational Pattern
          </span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Abstract Factory Pattern</h1>
        <p className="text-xl text-gray-400 max-w-3xl">
          Produces families of related objects without specifying their concrete classes.
          Ensures that created objects are compatible with each other.
        </p>
      </div>

      {/* Interactive Demo Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>
        <AbstractFactoryDemo />
      </section>

      {/* Detailed Guide Section */}
      <section>
        <AbstractFactoryGuide />
      </section>
    </div>
  );
};

export default AbstractFactoryPage;
