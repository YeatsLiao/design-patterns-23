import { useTranslation } from 'react-i18next';
import React from 'react';
import IteratorDemo from './Demo';
import IteratorGuide from './Guide';

const IteratorPage = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-white mb-4">{t('iterator.title')}</h1>
        <p className="text-xl text-gray-400 max-w-3xl">{t('iterator.description')}</p>
      </div>
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">{t('common.demo')}</h2>
        <IteratorDemo />
      </section>
      <section>
        <IteratorGuide />
      </section>
    </div>
  );
};

export default IteratorPage;
