import React, { useState } from 'react';
import { Lightbulb, RotateCcw, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Command Interface
interface Command {
  execute(): void;
  undo(): void;
}

// Receiver
class Light {
  constructor(private id: string, private updateState: (id: string, isOn: boolean, color: string) => void) {}
  
  on() { this.updateState(this.id, true, 'text-yellow-400'); }
  off() { this.updateState(this.id, false, 'text-gray-600'); }
  setColor(color: string) { this.updateState(this.id, true, color); }
}

// Concrete Commands
class TurnOnCommand implements Command {
  constructor(private light: Light) {}
  execute() { this.light.on(); }
  undo() { this.light.off(); }
}

class TurnOffCommand implements Command {
  constructor(private light: Light) {}
  execute() { this.light.off(); }
  undo() { this.light.on(); }
}

class ChangeColorCommand implements Command {
  private prevColor: string = 'text-yellow-400';
  constructor(private light: Light, private newColor: string) {}
  
  execute() { this.light.setColor(this.newColor); }
  undo() { this.light.setColor(this.prevColor); }
}

const CommandDemo = () => {
  const { t } = useTranslation();
  const [lightState, setLightState] = useState({ isOn: false, color: 'text-gray-600' });
  const [history, setHistory] = useState<Command[]>([]);

  const updateLight = (id: string, isOn: boolean, color: string) => {
    setLightState({ isOn, color });
  };

  const light = new Light('living-room', updateLight);

  const executeCommand = (cmd: Command) => {
    cmd.execute();
    setHistory(prev => [...prev, cmd]);
  };

  const undoLast = () => {
    if (history.length === 0) return;
    const cmd = history[history.length - 1];
    cmd.undo();
    setHistory(prev => prev.slice(0, -1));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">{t('command.demo.title')}</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
           <button onClick={() => executeCommand(new TurnOnCommand(light))} className="p-3 bg-gray-700 hover:bg-gray-600 rounded text-white font-medium">{t('command.demo.on')}</button>
           <button onClick={() => executeCommand(new TurnOffCommand(light))} className="p-3 bg-gray-700 hover:bg-gray-600 rounded text-white font-medium">{t('command.demo.off')}</button>
           <button onClick={() => executeCommand(new ChangeColorCommand(light, 'text-red-500'))} className="p-3 bg-red-900/30 text-red-400 border border-red-900 rounded hover:bg-red-900/50">{t('command.demo.red')}</button>
           <button onClick={() => executeCommand(new ChangeColorCommand(light, 'text-blue-500'))} className="p-3 bg-blue-900/30 text-blue-400 border border-blue-900 rounded hover:bg-blue-900/50">{t('command.demo.blue')}</button>
        </div>

        <button 
          onClick={undoLast} 
          disabled={history.length === 0}
          className="w-full py-3 bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw size={18} /> {t('command.demo.undo', { count: history.length })}
        </button>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex items-center justify-center min-h-[300px]">
         <motion.div 
           animate={{ scale: lightState.isOn ? 1.2 : 1 }}
           className="relative"
         >
            <Lightbulb size={120} className={lightState.color} />
            {lightState.isOn && (
              <div className={`absolute inset-0 blur-xl opacity-50 ${lightState.color.replace('text', 'bg')}`}></div>
            )}
         </motion.div>
      </div>
    </div>
  );
};

export default CommandDemo;
