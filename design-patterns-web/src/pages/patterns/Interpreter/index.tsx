import React from 'react';
import InterpreterDemo from './Demo';
import InterpreterGuide from './Guide';

const InterpreterPage = () => {
  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-white mb-4">Interpreter Pattern</h1>
        <p className="text-xl text-gray-400">
          Interactive demonstration of the Interpreter design pattern.
        </p>
      </div>
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>
        <InterpreterDemo />
      </section>
      <section>
        <InterpreterGuide />
      </section>
    </div>
  );
};

export default InterpreterPage;
