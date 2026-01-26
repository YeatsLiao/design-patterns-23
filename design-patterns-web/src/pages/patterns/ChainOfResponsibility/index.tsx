import React from 'react';
import ChainOfResponsibilityDemo from './Demo';
import ChainOfResponsibilityGuide from './Guide';

const ChainOfResponsibilityPage = () => {
  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-white mb-4">ChainOfResponsibility Pattern</h1>
        <p className="text-xl text-gray-400">
          Interactive demonstration of the ChainOfResponsibility design pattern.
        </p>
      </div>
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>
        <ChainOfResponsibilityDemo />
      </section>
      <section>
        <ChainOfResponsibilityGuide />
      </section>
    </div>
  );
};

export default ChainOfResponsibilityPage;
