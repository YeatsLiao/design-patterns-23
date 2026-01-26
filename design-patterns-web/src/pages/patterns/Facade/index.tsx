import React from 'react';
import FacadeDemo from './Demo';
import FacadeGuide from './Guide';

const FacadePage = () => {
  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-white mb-4">Facade Pattern</h1>
        <p className="text-xl text-gray-400">
          Interactive demonstration of the Facade design pattern.
        </p>
      </div>
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>
        <FacadeDemo />
      </section>
      <section>
        <FacadeGuide />
      </section>
    </div>
  );
};

export default FacadePage;
