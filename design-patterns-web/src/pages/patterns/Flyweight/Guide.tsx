import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

const FlyweightGuide = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('common.concept')}</h2>
        <p className="text-gray-700 dark:text-gray-300">
          <Trans i18nKey="flyweight.concept.definition" />
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          <Trans i18nKey="flyweight.concept.analogy" />
        </p>
      </section>

      <section className="bg-gray-50 dark:bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">{t('common.codeExample')}</h3>
         <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto font-mono">
{`// Shared State (Flyweight)
class TreeType {
  constructor(name, color, texture) { ... }
  draw(x, y) { ... }
}

// Unique State (Context)
class Tree {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; // Reference to Flyweight
  }
  draw() {
    this.type.draw(this.x, this.y);
  }
}

// Factory ensures reuse
class TreeFactory {
  static getTreeType(name) {
    // Return existing instance or create new
  }
}`}
         </pre>
      </section>
    </div>
  );
};

export default FlyweightGuide;
