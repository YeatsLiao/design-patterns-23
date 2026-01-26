import React, { useState } from 'react';
import { User, ShieldAlert, Bot, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  public handle(request: string, priority: Priority): string | null {
    if (priority === 'simple') {
      return `🤖 Bot: I can help with "${request}". Here is a link to the FAQ.`;
    }
    return super.handle(request, priority);
  }
}

class SupportAgentHandler extends AbstractHandler {
  public handle(request: string, priority: Priority): string | null {
    if (priority === 'complex') {
      return `👨‍💼 Agent: I see you have a complex issue "${request}". I'll resolve it manually.`;
    }
    return super.handle(request, priority);
  }
}

class ManagerHandler extends AbstractHandler {
  public handle(request: string, priority: Priority): string | null {
    if (priority === 'critical') {
      return `🤵 Manager: Critical issue "${request}" escalated to me. Investigating ASAP.`;
    }
    return super.handle(request, priority);
  }
}

const ChainOfResponsibilityDemo = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const handleRequest = (priority: Priority) => {
    const bot = new BotHandler();
    const agent = new SupportAgentHandler();
    const manager = new ManagerHandler();

    // Build Chain
    bot.setNext(agent).setNext(manager);

    const result = bot.handle("Login Issue", priority);
    setLogs(prev => [result || "No handler found", ...prev]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Support Ticket System</h3>
        
        <div className="space-y-4">
          <button onClick={() => handleRequest('simple')} className="w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-4 transition-colors">
            <Bot className="text-blue-400" size={24} />
            <div className="text-left">
              <div className="text-white font-bold">Simple Query</div>
              <div className="text-sm text-gray-400">e.g., "Reset Password"</div>
            </div>
          </button>

          <button onClick={() => handleRequest('complex')} className="w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-4 transition-colors">
            <User className="text-green-400" size={24} />
            <div className="text-left">
              <div className="text-white font-bold">Complex Issue</div>
              <div className="text-sm text-gray-400">e.g., "Billing Dispute"</div>
            </div>
          </button>

          <button onClick={() => handleRequest('critical')} className="w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-4 transition-colors">
            <ShieldAlert className="text-red-400" size={24} />
            <div className="text-left">
              <div className="text-white font-bold">Critical Failure</div>
              <div className="text-sm text-gray-400">e.g., "System Down"</div>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-black rounded-xl p-6 border border-gray-800 h-[400px] overflow-y-auto">
        <div className="flex items-center gap-2 mb-4 text-gray-500 pb-2 border-b border-gray-800">
          <MessageSquare size={16} />
          <span className="text-xs uppercase tracking-wider">Resolution Log</span>
        </div>
        <AnimatePresence>
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-3 p-3 rounded bg-gray-900 border-l-2 border-blue-500 text-sm text-gray-300"
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
