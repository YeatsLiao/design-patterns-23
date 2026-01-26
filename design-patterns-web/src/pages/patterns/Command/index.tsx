import { useTranslation } from 'react-i18next';
import React from 'react';
import CommandDemo from './Demo';
import CommandGuide from './Guide';

const CommandPage = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-white mb-4">{t('patterns.command.title')}</h1>
        <p className="text-xl text-gray-400 max-w-3xl">{t('patterns.command.description')}</p>
      </div>
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Demo</h2>
        <CommandDemo />
      </section>
      <section>
        <CommandGuide />
      </section>
    </div>
  );
};

export default CommandPage;
