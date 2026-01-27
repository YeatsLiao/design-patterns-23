import { Lightbulb, Layers } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { MarkdownTrans } from '../../../components/MarkdownTrans';

const AbstractFactoryGuide = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-8 max-w-3xl">
      {/* 1. Concept Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Lightbulb className="text-yellow-400" />
          {t('common.concept')}
        </h2>
        <div className="prose prose-invert text-gray-700 dark:text-gray-300">
          <p>
            <MarkdownTrans i18nKey="abstractFactory.concept.definition" />
          </p>
          <p className="mt-4">
            <MarkdownTrans i18nKey="abstractFactory.concept.analogy" />
          </p>
        </div>
      </section>

      {/* 2. Code Comparison */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Abstract Factory Interface */}
        <div className="bg-gray-50 dark:bg-gray-950 rounded-lg p-4 border border-purple-900/30 col-span-2">
          <h3 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
            <Layers size={18} />
            The Abstract Factory Interface
          </h3>
          <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto font-mono">
{`interface ElectronicsFactory {
  createPhone(): Phone;
  createLaptop(): Laptop;
}

// Concrete Factory 1
class AppleFactory implements ElectronicsFactory {
  createPhone() { return new IPhone(); }
  createLaptop() { return new MacBook(); }
}

// Concrete Factory 2
class SamsungFactory implements ElectronicsFactory {
  createPhone() { return new GalaxyPhone(); }
  createLaptop() { return new GalaxyBook(); }
}`}
          </pre>
        </div>
      </section>

      {/* 3. When to use */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('common.whenToUse')}</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>{t('abstractFactory.usage.point1')}</li>
          <li>{t('abstractFactory.usage.point2')}</li>
        </ul>
      </section>
    </div>
  );
};

export default AbstractFactoryGuide;
