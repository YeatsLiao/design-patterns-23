import { useState } from 'react';
import { Bot, MessageSquare, Headset, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type Priority = 'simple' | 'complex' | 'critical';

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string, priority: Priority): string | null;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string, priority: Priority): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request, priority);
    }
    return null;
  }
}

// Concrete Handlers
class BotHandler extends AbstractHandler {
  private t: (key: string, options?: any) => string;
  constructor(t: (key: string, options?: any) => string) { 
    super(); 
    this.t = t;
  }
  public handle(request: string, priority: Priority): string | null {
    if (priority === 'simple') {
      return this.t('chainOfResponsibility.demo.botReply', { request });
    }
    return super.handle(request, priority);
  }
}

class SupportAgentHandler extends AbstractHandler {
  private t: (key: string, options?: any) => string;
  constructor(t: (key: string, options?: any) => string) { 
    super(); 
    this.t = t;
  }
  public handle(request: string, priority: Priority): string | null {
    if (priority === 'complex') {
      return this.t('chainOfResponsibility.demo.agentReply', { request });
    }
    return super.handle(request, priority);
  }
}

class ManagerHandler extends AbstractHandler {
  private t: (key: string, options?: any) => string;
  constructor(t: (key: string, options?: any) => string) { 
    super(); 
    this.t = t;
  }
  public handle(request: string, priority: Priority): string | null {
    if (priority === 'critical') {
      return this.t('chainOfResponsibility.demo.managerReply', { request });
    }
    return super.handle(request, priority);
  }
}

const ChainOfResponsibilityDemo = () => {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<string[]>([]);

  const handleRequest = (priority: Priority) => {
    const bot = new BotHandler(t);
    const agent = new SupportAgentHandler(t);
    const manager = new ManagerHandler(t);

    // Build Chain
    bot.setNext(agent).setNext(manager);

    const result = bot.handle("Login Issue", priority);
    setLogs(prev => [result || t('chainOfResponsibility.demo.noHandler'), ...prev]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('chainOfResponsibility.demo.title')}</h3>
        
        <div className="space-y-4">
          <button onClick={() => handleRequest('simple')} className="w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-4 transition-colors">
            <Bot className="text-blue-400" size={24} />
            <div className="text-left">
              <div className="text-white font-bold">{t('chainOfResponsibility.demo.simpleQuery')}</div>
              <div className="text-sm text-gray-300">{t('chainOfResponsibility.demo.simpleQueryDesc')}</div>
            </div>
          </button>

          <button onClick={() => handleRequest('complex')} className="w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-4 transition-colors">
            <Headset className="text-green-400" size={24} />
            <div className="text-left">
              <div className="text-white font-bold">{t('chainOfResponsibility.demo.complexIssue')}</div>
              <div className="text-sm text-gray-300">{t('chainOfResponsibility.demo.complexIssueDesc')}</div>
            </div>
          </button>

          <button onClick={() => handleRequest('critical')} className="w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-4 transition-colors">
            <Briefcase className="text-red-400" size={24} />
            <div className="text-left">
              <div className="text-white font-bold">{t('chainOfResponsibility.demo.criticalFailure')}</div>
              <div className="text-sm text-gray-300">{t('chainOfResponsibility.demo.criticalFailureDesc')}</div>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-950 rounded-xl p-6 border border-gray-200 dark:border-gray-800 h-[400px] overflow-y-auto">
        <div className="flex items-center gap-2 mb-4 text-gray-500 dark:text-gray-500 pb-2 border-b border-gray-200 dark:border-gray-800">
          <MessageSquare size={16} />
          <span className="text-xs uppercase tracking-wider">{t('chainOfResponsibility.demo.resolutionLog')}</span>
        </div>
        <AnimatePresence>
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-3 p-3 rounded bg-white dark:bg-gray-800 border-l-2 border-blue-500 text-sm text-gray-700 dark:text-gray-300 shadow-sm"
            >
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChainOfResponsibilityDemo;
