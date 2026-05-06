import { useTranslation } from 'react-i18next';
import { MarkdownTrans } from '../../../components/MarkdownTrans';

const AdapterGuide = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('common.concept')}</h2>
        <p className="text-gray-700 dark:text-gray-300">
          <MarkdownTrans i18nKey="adapter.concept.definition" />
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          <MarkdownTrans i18nKey="adapter.concept.analogy" />
        </p>
      </section>

      <section className="bg-gray-50 dark:bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">{t('common.codeExample')}</h3>
         <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto font-mono">
{`// Existing interface (Incompatible)
class USPlug {
  insertFlat() { console.log("Connected flat pins"); }
}

// Target interface
interface EUSocket {
  insertRound(): void;
}

// Adapter
class Adapter implements EUSocket {
  constructor(private device: USPlug) {}

  insertRound() {
    // Translate the call
    this.device.insertFlat(); 
  }
}`}
         </pre>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('common.whenToUse')}</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>{t('adapter.usage.point1')}</li>
          <li>{t('adapter.usage.point2')}</li>
        </ul>
      </section>
    </div>
  );
};

export default AdapterGuide;
