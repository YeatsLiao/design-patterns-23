import { useTranslation } from 'react-i18next';
import React from 'react';
import StateDemo from './Demo';
import StateGuide from './Guide';

const StatePage = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-white mb-4">{t('patterns.state.title')}</h1>
        <p className="text-xl text-gray-400 max-w-3xl">{t('patterns.state.description')}</p>
      </div>
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>
        <StateDemo />
      </section>
      <section>
        <StateGuide />
      </section>
    </div>
  );
};

export default StatePage;
