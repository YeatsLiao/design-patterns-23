import React from 'react';
import MediatorDemo from './Demo';
import MediatorGuide from './Guide';

const MediatorPage = () => {
  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-white mb-4">Mediator Pattern</h1>
        <p className="text-xl text-gray-400">
          Interactive demonstration of the Mediator design pattern.
        </p>
      </div>
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>
        <MediatorDemo />
      </section>
      <section>
        <MediatorGuide />
      </section>
    </div>
  );
};

export default MediatorPage;
