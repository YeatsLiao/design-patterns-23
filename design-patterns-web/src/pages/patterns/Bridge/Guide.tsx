import { useTranslation, Trans } from 'react-i18next';

const BridgeGuide = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('common.concept')}</h2>
        <p className="text-gray-700 dark:text-gray-300">
          <Trans i18nKey="bridge.concept.definition" components={{ strong: <strong />, code: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded" /> }} />
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          <Trans i18nKey="bridge.concept.analogy" components={{ strong: <strong />, code: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded" /> }} />
        </p>
      </section>

      <section className="bg-gray-50 dark:bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">{t('common.codeExample')}</h3>
         <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto font-mono">
{`// Implementation
interface Device {
  enable(): void;
  disable(): void;
  setVolume(percent: number): void;
}

// Abstraction
class Remote {
  constructor(protected device: Device) {}
  
  togglePower() {
    if (this.device.isEnabled()) this.device.disable();
    else this.device.enable();
  }
}

// Client can mix and match
const tv = new Tv();
const remote = new Remote(tv);`}
         </pre>
      </section>
    </div>
  );
};

export default BridgeGuide;
