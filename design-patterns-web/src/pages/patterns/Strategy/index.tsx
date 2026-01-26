import React from 'react';
import StrategyDemo from './Demo';
import StrategyGuide from './Guide';

const StrategyPage = () => {
  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="border-b border-gray-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-yellow-900/50 text-yellow-300 text-xs font-semibold rounded-full border border-yellow-800">
            Behavioral Pattern
          </span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Strategy Pattern</h1>
        <p className="text-xl text-gray-400 max-w-3xl">
          Lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.
        </p>
      </div>

      {/* Interactive Demo Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>
        <StrategyDemo />
      </section>

      {/* Detailed Guide Section */}
      <section>
        <StrategyGuide />
      </section>
    </div>
  );
};

export default StrategyPage;
