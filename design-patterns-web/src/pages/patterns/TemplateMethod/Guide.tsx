import { useTranslation, Trans } from 'react-i18next';

const TemplateMethodGuide = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('common.concept')}</h2>
        <div className="text-gray-700 dark:text-gray-300">
          <Trans i18nKey="templateMethod.concept.definition" />
        </div>
        <div className="text-gray-700 dark:text-gray-300 mt-2">
          <Trans i18nKey="templateMethod.concept.analogy" />
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">{t('common.codeExample')}</h3>
         <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto font-mono">
{`abstract class DataMiner {
  // Template Method (The Flow)
  mine() {
    const file = this.openFile();
    const raw = this.extractData(file);
    const data = this.parseData(raw);
    this.closeFile(file);
  }

  // Steps to be implemented
  abstract openFile();
  abstract extractData(file);
  abstract parseData(raw);

  // Common step (Hook)
  closeFile(file) { /* Default close */ }
}`}
         </pre>
      </section>
    </div>
  );
};

export default TemplateMethodGuide;
