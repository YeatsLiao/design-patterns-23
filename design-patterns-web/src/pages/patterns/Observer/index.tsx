import React from 'react';
import ObserverDemo from './Demo';
import ObserverGuide from './Guide';

const ObserverPage = () => {
  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="border-b border-gray-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-yellow-900/50 text-yellow-300 text-xs font-semibold rounded-full border border-yellow-800">
            Behavioral Pattern
          </span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Observer Pattern</h1>
        <p className="text-xl text-gray-400 max-w-3xl">
          Lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they're observing.
        </p>
      </div>

      {/* Interactive Demo Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>
        <ObserverDemo />
      </section>

      {/* Detailed Guide Section */}
      <section>
        <ObserverGuide />
      </section>
    </div>
  );
};

export default ObserverPage;
