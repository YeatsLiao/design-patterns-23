import { useTranslation, Trans } from 'react-i18next';

const InterpreterGuide = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('common.concept')}</h2>
        <div className="text-gray-700 dark:text-gray-300">
          <Trans i18nKey="interpreter.concept.definition" />
        </div>
        <div className="text-gray-700 dark:text-gray-300 mt-2">
          <Trans i18nKey="interpreter.concept.analogy" />
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">{t('common.codeExample')}</h3>
         <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto font-mono">
{`interface Expression {
  interpret(): number;
}

class Number implements Expression {
  constructor(private n: number) {}
  interpret() { return this.n; }
}

class Add implements Expression {
  constructor(private left: Expression, private right: Expression) {}
  interpret() { 
    return this.left.interpret() + this.right.interpret(); 
  }
}

// Tree: 1 + 2
const tree = new Add(new Number(1), new Number(2));
console.log(tree.interpret()); // 3`}
         </pre>
      </section>
    </div>
  );
};

export default InterpreterGuide;
