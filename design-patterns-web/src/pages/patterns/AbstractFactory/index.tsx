import { useTranslation } from 'react-i18next';
import React from 'react';
import AbstractFactoryDemo from './Demo';
import AbstractFactoryGuide from './Guide';

const AbstractFactoryPage = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="border-b border-gray-800 pb-6">
        
        <h1 className="text-4xl font-bold text-white mb-4">{t('patterns.abstractFactory.title')}</h1>
        <p className="text-xl text-gray-400 max-w-3xl">{t('patterns.abstractFactory.description')}</p>
      </div>

      {/* Interactive Demo Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>
        <AbstractFactoryDemo />
      </section>

      {/* Detailed Guide Section */}
      <section>
        <AbstractFactoryGuide />
      </section>
    </div>
  );
};

export default AbstractFactoryPage;
