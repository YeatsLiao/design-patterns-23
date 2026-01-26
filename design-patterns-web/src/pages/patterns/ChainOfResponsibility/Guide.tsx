import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

const ChainOfResponsibilityGuide = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">{t('common.concept')}</h2>
        <p className="text-gray-300">
          <Trans i18nKey="chainOfResponsibility.concept.definition" />
        </p>
        <p className="text-gray-300 mt-2">
          <Trans i18nKey="chainOfResponsibility.concept.analogy" />
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">{t('common.codeExample')}</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`interface Handler {
  setNext(h: Handler): Handler;
  handle(request: string): void;
}

class Robot implements Handler {
  next: Handler;
  handle(req) {
    if (req === 'simple') console.log("Robot fixed it");
    else this.next.handle(req);
  }
}

// Client
const chain = new Robot();
chain.setNext(new Agent()).setNext(new Manager());
chain.handle('critical');`}
         </pre>
      </section>
    </div>
  );
};

export default ChainOfResponsibilityGuide;
