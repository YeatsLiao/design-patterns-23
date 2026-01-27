import { useState } from 'react';
import { Lightbulb, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

// State Interface
interface LightState {
  isOn: boolean;
  color: string;
}

// Command Interface
interface Command {
  execute(): void;
  undo(): void;
}

// Receiver
class Light {
  private id: string;
  private updateState: (id: string, isOn: boolean, color: string) => void;
  
  constructor(id: string, updateState: (id: string, isOn: boolean, color: string) => void) {
    this.id = id;
    this.updateState = updateState;
  }
  
  on() { this.updateState(this.id, true, 'text-yellow-400'); }
  off() { this.updateState(this.id, false, 'text-gray-600'); }
  setColor(color: string) { this.updateState(this.id, true, color); }
  restore(state: LightState) { this.updateState(this.id, state.isOn, state.color); }
}

// Concrete Commands
class TurnOnCommand implements Command {
  private prevState: LightState;
  private light: Light;
  
  constructor(light: Light, currentState: LightState) {
    this.light = light;
    this.prevState = { ...currentState };
  }
  execute() { this.light.on(); }
  undo() { this.light.restore(this.prevState); }
}

class TurnOffCommand implements Command {
  private prevState: LightState;
  private light: Light;
  
  constructor(light: Light, currentState: LightState) {
    this.light = light;
    this.prevState = { ...currentState };
  }
  execute() { this.light.off(); }
  undo() { this.light.restore(this.prevState); }
}

class ChangeColorCommand implements Command {
  private prevState: LightState;
  private light: Light;
  private newColor: string;

  constructor(light: Light, newColor: string, currentState: LightState) {
    this.light = light;
    this.newColor = newColor;
    this.prevState = { ...currentState };
  }
  
  execute() { this.light.setColor(this.newColor); }
  undo() { this.light.restore(this.prevState); }
}

const CommandDemo = () => {
  const { t } = useTranslation();
  const [lightState, setLightState] = useState<LightState>({ isOn: false, color: 'text-gray-600' });
  const [history, setHistory] = useState<Command[]>([]);

  const updateLight = (_id: string, isOn: boolean, color: string) => {
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
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('command.demo.title')}</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
           <button onClick={() => executeCommand(new TurnOnCommand(light, lightState))} className="p-3 bg-gray-700 hover:bg-gray-600 rounded text-white font-medium">{t('command.demo.on')}</button>
           <button onClick={() => executeCommand(new TurnOffCommand(light, lightState))} className="p-3 bg-gray-700 hover:bg-gray-600 rounded text-white font-medium">{t('command.demo.off')}</button>
           <button onClick={() => executeCommand(new ChangeColorCommand(light, 'text-red-500', lightState))} className="p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-900 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">{t('command.demo.red')}</button>
           <button onClick={() => executeCommand(new ChangeColorCommand(light, 'text-blue-500', lightState))} className="p-3 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-900 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">{t('command.demo.blue')}</button>
        </div>

        <button 
          onClick={undoLast} 
          disabled={history.length === 0}
          className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-gray-700 dark:disabled:text-gray-500 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw size={18} /> {t('command.demo.undo', { count: history.length })}
        </button>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 flex items-center justify-center min-h-[300px]">
         <motion.div 
           animate={{ scale: lightState.isOn ? 1.2 : 1 }}
           className="relative"
         >
            <Lightbulb size={120} className={lightState.color} />
            {lightState.isOn && (
              <div className={clsx("absolute inset-0 blur-xl opacity-50", lightState.color.replace('text', 'bg'))}></div>
            )}
         </motion.div>
      </div>
    </div>
  );
};

export default CommandDemo;
