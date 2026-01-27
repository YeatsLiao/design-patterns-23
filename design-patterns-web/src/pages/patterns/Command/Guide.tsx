import { useTranslation, Trans } from 'react-i18next';
import { MarkdownTrans } from '../../../components/MarkdownTrans';

const CommandGuide = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('common.concept')}</h2>
        <div className="text-gray-700 dark:text-gray-300">
          <MarkdownTrans i18nKey="command.concept.definition" />
        </div>
        <div className="text-gray-700 dark:text-gray-300 mt-2">
          <MarkdownTrans i18nKey="command.concept.analogy" />
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">{t('common.codeExample')}</h3>
         <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto font-mono">
{`interface Command {
  execute(): void;
  undo(): void;
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}
  
  execute() { this.light.turnOn(); }
  undo() { this.light.turnOff(); }
}

// Invoker can store history
class Remote {
  private history: Command[] = [];
  
  press(cmd: Command) {
    cmd.execute();
    this.history.push(cmd);
  }
  
  undo() {
    const cmd = this.history.pop();
    cmd.undo();
  }
}`}
         </pre>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('common.whenToUse')}</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>{t('command.usage.point1')}</li>
          <li>{t('command.usage.point2')}</li>
          <li>{t('command.usage.point3')}</li>
        </ul>
      </section>
    </div>
  );
};

export default CommandGuide;
