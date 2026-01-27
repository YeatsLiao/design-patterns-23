import { useTranslation } from 'react-i18next';
import BridgeDemo from './Demo';
import BridgeGuide from './Guide';

const BridgePage = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('bridge.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">{t('bridge.description')}</p>
      </div>
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('common.demo')}</h2>
        <BridgeDemo />
      </section>
      <section>
        <BridgeGuide />
      </section>
    </div>
  );
};

export default BridgePage;
