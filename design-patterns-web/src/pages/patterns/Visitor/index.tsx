import React from 'react';
import VisitorDemo from './Demo';
import VisitorGuide from './Guide';

const VisitorPage = () => {
  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-white mb-4">Visitor Pattern</h1>
        <p className="text-xl text-gray-400">
          Interactive demonstration of the Visitor design pattern.
        </p>
      </div>
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>
        <VisitorDemo />
      </section>
      <section>
        <VisitorGuide />
      </section>
    </div>
  );
};

export default VisitorPage;
