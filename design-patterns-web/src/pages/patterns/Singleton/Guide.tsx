import { Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

const SingletonGuide = () => {
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
            <Trans i18nKey="singleton.concept.analogy" />
          </p>
          <p className="mt-4">
            <Trans i18nKey="singleton.concept.definition" />
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
{`class Database {
  constructor() {
    this.id = Math.random();
    console.log("DB Created!");
  }
}

// Client Code
const db1 = new Database();
const db2 = new Database();

console.log(db1 === db2); 
// false ❌ (Different instances)`}
          </pre>
        </div>

        {/* Good Code */}
        <div className="bg-gray-50 dark:bg-gray-950 rounded-lg p-4 border border-green-200 dark:border-green-900/30">
          <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
            <CheckCircle size={18} />
            {t('common.goodImplementation')}
          </h3>
          <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto font-mono">
{`class Database {
  private static instance: Database;
  
  private constructor() { /*...*/ }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

// Client Code
const db1 = Database.getInstance();
const db2 = Database.getInstance();

console.log(db1 === db2); 
// true ✅ (Same instance)`}
          </pre>
        </div>
      </section>

      {/* 3. When to use */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('common.whenToUse')}</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>{t('singleton.usage.point1')}</li>
          <li>{t('singleton.usage.point2')}</li>
        </ul>
      </section>
    </div>
  );
};

export default SingletonGuide;
