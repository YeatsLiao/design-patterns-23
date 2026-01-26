import { useTranslation } from 'react-i18next';
import React from 'react';
import BridgeDemo from './Demo';
import BridgeGuide from './Guide';

const BridgePage = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-white mb-4">{t('patterns.bridge.title')}</h1>
        <p className="text-xl text-gray-400 max-w-3xl">{t('patterns.bridge.description')}</p>
      </div>
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>
        <BridgeDemo />
      </section>
      <section>
        <BridgeGuide />
      </section>
    </div>
  );
};

export default BridgePage;
