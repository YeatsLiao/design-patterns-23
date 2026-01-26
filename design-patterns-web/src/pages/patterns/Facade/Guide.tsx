import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

const FacadeGuide = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('common.concept')}</h2>
        <p className="text-gray-700 dark:text-gray-300">
          <Trans i18nKey="facade.concept.definition" components={{ strong: <strong />, code: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded" /> }} />
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          <Trans i18nKey="facade.concept.analogy" components={{ strong: <strong />, code: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded" /> }} />
        </p>
      </section>

      <section className="bg-gray-50 dark:bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">{t('common.codeExample')}</h3>
         <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto font-mono">
{`class SmartHomeFacade {
  constructor(
    private lights: Lights,
    private tv: TV,
    private ac: AC
  ) {}

  movieMode() {
    this.lights.dim();
    this.tv.on();
    this.ac.setTemp(22);
    this.ac.on();
  }
}

// Client
const home = new SmartHomeFacade(lights, tv, ac);
home.movieMode(); // Simple API`}
         </pre>
      </section>
    </div>
  );
};

export default FacadeGuide;
