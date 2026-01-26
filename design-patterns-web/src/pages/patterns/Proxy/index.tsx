import React from 'react';
import ProxyDemo from './Demo';
import ProxyGuide from './Guide';

const ProxyPage = () => {
  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-white mb-4">Proxy Pattern</h1>
        <p className="text-xl text-gray-400">
          Interactive demonstration of the Proxy design pattern.
        </p>
      </div>
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>
        <ProxyDemo />
      </section>
      <section>
        <ProxyGuide />
      </section>
    </div>
  );
};

export default ProxyPage;
