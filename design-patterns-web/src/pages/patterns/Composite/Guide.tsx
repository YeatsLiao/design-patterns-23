import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

const CompositeGuide = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">{t('common.concept')}</h2>
        <p className="text-gray-300">
          <Trans i18nKey="composite.concept.definition" />
        </p>
        <p className="text-gray-300 mt-2">
          <Trans i18nKey="composite.concept.analogy" />
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">{t('common.codeExample')}</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`interface Component {
  getSize(): number;
}

class File implements Component {
  constructor(private size: number) {}
  getSize() { return this.size; }
}

class Folder implements Component {
  private children: Component[] = [];
  
  add(c: Component) { this.children.push(c); }
  
  getSize() {
    // Recursive delegation
    return this.children.reduce((sum, c) => sum + c.getSize(), 0);
  }
}`}
         </pre>
      </section>
    </div>
  );
};

export default CompositeGuide;
