import React, { useState } from 'react';
import { Play, Pause, Square, Music } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

// State Interface
interface AudioState {
  play(): string;
  pause(): string;
  stop(): string;
  getName(): string;
}

// Concrete States
class PlayingState implements AudioState {
  constructor(private player: AudioPlayer, private t: (key: string) => string) {}
  play() { return this.t('state.demo.alreadyPlaying'); }
  pause() { 
    this.player.setState(this.player.pausedState); 
    return this.t('state.demo.paused'); 
  }
  stop() { 
    this.player.setState(this.player.stoppedState); 
    return this.t('state.demo.stopped'); 
  }
  getName() { return "Playing"; }
}

class PausedState implements AudioState {
  constructor(private player: AudioPlayer, private t: (key: string) => string) {}
  play() { 
    this.player.setState(this.player.playingState); 
    return this.t('state.demo.resuming'); 
  }
  pause() { return this.t('state.demo.alreadyPaused'); }
  stop() { 
    this.player.setState(this.player.stoppedState); 
    return this.t('state.demo.stopped'); 
  }
  getName() { return "Paused"; }
}

class StoppedState implements AudioState {
  constructor(private player: AudioPlayer, private t: (key: string) => string) {}
  play() { 
    this.player.setState(this.player.playingState); 
    return this.t('state.demo.startingPlayback'); 
  }
  pause() { return this.t('state.demo.cantPause'); }
  stop() { return this.t('state.demo.alreadyStopped'); }
  getName() { return "Stopped"; }
}

// Context
class AudioPlayer {
  public playingState: AudioState;
  public pausedState: AudioState;
  public stoppedState: AudioState;
  
  private currentState: AudioState;

  constructor(private onStateChange: (s: string) => void, t: (key: string) => string) {
    this.playingState = new PlayingState(this, t);
    this.pausedState = new PausedState(this, t);
    this.stoppedState = new StoppedState(this, t);
    this.currentState = this.stoppedState;
  }

  setState(state: AudioState) {
    this.currentState = state;
    this.onStateChange(state.getName());
  }

  play() { return this.currentState.play(); }
  pause() { return this.currentState.pause(); }
  stop() { return this.currentState.stop(); }
  
  getCurrentStateName() { return this.currentState.getName(); }
}

const StateDemo = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState("Stopped");
  const [log, setLog] = useState(t('state.demo.ready'));
  
  // Create player only once
  const [player] = useState(() => new AudioPlayer(setStatus, t));

  const handlePlay = () => setLog(player.play());
  const handlePause = () => setLog(player.pause());
  const handleStop = () => setLog(player.stop());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('state.demo.title')}</h3>
        
        <div className="flex justify-center gap-6 mb-8">
           <button onClick={handlePlay} className="p-4 bg-green-600 rounded-full hover:bg-green-500 shadow-lg text-gray-900 dark:text-white">
             <Play size={24} fill="currentColor" />
           </button>
           <button onClick={handlePause} className="p-4 bg-yellow-600 rounded-full hover:bg-yellow-500 shadow-lg text-gray-900 dark:text-white">
             <Pause size={24} fill="currentColor" />
           </button>
           <button onClick={handleStop} className="p-4 bg-red-600 rounded-full hover:bg-red-500 shadow-lg text-gray-900 dark:text-white">
             <Square size={24} fill="currentColor" />
           </button>
        </div>

        <div className="bg-black p-4 rounded text-center text-gray-600 dark:text-gray-400 font-mono">
           {log}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center min-h-[300px]">
         <div className={clsx(
           "w-40 h-40 rounded-full flex items-center justify-center border-4 transition-all duration-500",
           status === 'Playing' ? "border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)] animate-pulse" : 
           status === 'Paused' ? "border-yellow-500" : "border-gray-200 dark:border-gray-700 opacity-50"
         )}>
            <Music size={64} className={clsx(
              "transition-colors",
              status === 'Playing' ? "text-green-400" : 
              status === 'Paused' ? "text-yellow-400" : "text-gray-600"
            )} />
         </div>
         <h4 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-widest">{t('state.demo.status' + status)}</h4>
      </div>
    </div>
  );
};

export default StateDemo;
