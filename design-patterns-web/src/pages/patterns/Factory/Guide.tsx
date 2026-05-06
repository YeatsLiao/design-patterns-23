import { Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MarkdownTrans } from '../../../components/MarkdownTrans';

const FactoryGuide = () => {
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
             <MarkdownTrans i18nKey="factory.concept.analogy" />
          </p>
          <p className="mt-4">
             <MarkdownTrans i18nKey="factory.concept.definition" />
          </p>
        </div>
      </section>

      {/* 2. Code Comparison */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Bad Code */}
        <div className="bg-gray-50 dark:bg-gray-950 rounded-lg p-4 border border-red-200 dark:border-red-900/30">
          <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle size={18} />
            {t('common.naiveImplementation')}
          </h3>
          <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto font-mono">
{`// Client code needs to know everything
import { Truck } from './Truck';
import { Ship } from './Ship';

function deliver(type) {
  let transport;
  if (type === 'road') {
    transport = new Truck();
  } else if (type === 'sea') {
    transport = new Ship();
  }
  // ... adding Air needs code change here!
  transport.deliver();
}`}
          </pre>
        </div>

        {/* Good Code */}
        <div className="bg-gray-50 dark:bg-gray-950 rounded-lg p-4 border border-green-200 dark:border-green-900/30">
          <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
            <CheckCircle size={18} />
            {t('common.goodImplementation')}
          </h3>
          <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto font-mono">
{`// Client works with the interface
abstract class Logistics {
  abstract createTransport(): Transport;
  
  planDelivery() {
    const transport = this.createTransport();
    transport.deliver();
  }
}

class RoadLogistics extends Logistics {
  createTransport() { return new Truck(); }
}

// Client Code
new RoadLogistics().planDelivery();`}
          </pre>
        </div>
      </section>

      {/* 3. When to use */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('common.whenToUse')}</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>{t('factory.usage.point1')}</li>
          <li>{t('factory.usage.point2')}</li>
          <li>{t('factory.usage.point3')}</li>
        </ul>
      </section>
    </div>
  );
};

export default FactoryGuide;
