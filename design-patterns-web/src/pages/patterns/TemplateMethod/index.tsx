import { useTranslation } from 'react-i18next';
import React from 'react';
import TemplateMethodDemo from './Demo';
import TemplateMethodGuide from './Guide';

const TemplateMethodPage = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('templateMethod.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">{t('templateMethod.description')}</p>
      </div>
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('common.demo')}</h2>
        <TemplateMethodDemo />
      </section>
      <section>
        <TemplateMethodGuide />
      </section>
    </div>
  );
};

export default TemplateMethodPage;
