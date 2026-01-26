import { useTranslation } from 'react-i18next';
import React from 'react';
import DecoratorDemo from './Demo';
import DecoratorGuide from './Guide';

const DecoratorPage = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-white mb-4">{t('patterns.decorator.title')}</h1>
        <p className="text-xl text-gray-400 max-w-3xl">{t('patterns.decorator.description')}</p>
      </div>
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>
        <DecoratorDemo />
      </section>
      <section>
        <DecoratorGuide />
      </section>
    </div>
  );
};

export default DecoratorPage;
