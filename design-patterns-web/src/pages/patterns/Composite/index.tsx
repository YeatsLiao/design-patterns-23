import React from 'react';
import CompositeDemo from './Demo';
import CompositeGuide from './Guide';

const CompositePage = () => {
  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-white mb-4">Composite Pattern</h1>
        <p className="text-xl text-gray-400">
          Interactive demonstration of the Composite design pattern.
        </p>
      </div>
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>
        <CompositeDemo />
      </section>
      <section>
        <CompositeGuide />
      </section>
    </div>
  );
};

export default CompositePage;
