import { useTranslation } from 'react-i18next';
import React from 'react';
import PrototypeDemo from './Demo';
import PrototypeGuide from './Guide';

const PrototypePage = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-white mb-4">{t('prototype.title')}</h1>
        <p className="text-xl text-gray-400 max-w-3xl">{t('prototype.description')}</p>
      </div>
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">{t('common.demo')}</h2>
        <PrototypeDemo />
      </section>
      <section>
        <PrototypeGuide />
      </section>
    </div>
  );
};

export default PrototypePage;
