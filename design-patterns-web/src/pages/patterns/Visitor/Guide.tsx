import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

const VisitorGuide = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">{t('common.concept')}</h2>
        <p className="text-gray-300">
          <Trans i18nKey="visitor.concept.definition" />
        </p>
        <p className="text-gray-300 mt-2">
          <Trans i18nKey="visitor.concept.analogy" />
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">{t('common.codeExample')}</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`interface Visitor {
  visitDot(d: Dot): void;
  visitRect(r: Rectangle): void;
}

class Dot {
  accept(v: Visitor) { v.visitDot(this); }
}

class ExportVisitor implements Visitor {
  visitDot(d) { console.log("Exporting dot..."); }
  visitRect(r) { console.log("Exporting rect..."); }
}

// Client
const exportVisitor = new ExportVisitor();
dot.accept(exportVisitor);`}
         </pre>
      </section>
    </div>
  );
};

export default VisitorGuide;
