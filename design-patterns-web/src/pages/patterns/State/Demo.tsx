import React, { useState } from 'react';
import { Play, Pause, Square, Music } from 'lucide-react';
import clsx from 'clsx';

// State Interface
interface AudioState {
  play(): string;
  pause(): string;
  stop(): string;
  getName(): string;
}

// Concrete States
class PlayingState implements AudioState {
  constructor(private player: AudioPlayer) {}
  play() { return "Already playing..."; }
  pause() { 
    this.player.setState(this.player.pausedState); 
    return "Paused."; 
  }
  stop() { 
    this.player.setState(this.player.stoppedState); 
    return "Stopped."; 
  }
  getName() { return "Playing"; }
}

class PausedState implements AudioState {
  constructor(private player: AudioPlayer) {}
  play() { 
    this.player.setState(this.player.playingState); 
    return "Resuming..."; 
  }
  pause() { return "Already paused..."; }
  stop() { 
    this.player.setState(this.player.stoppedState); 
    return "Stopped."; 
  }
  getName() { return "Paused"; }
}

class StoppedState implements AudioState {
  constructor(private player: AudioPlayer) {}
  play() { 
    this.player.setState(this.player.playingState); 
    return "Starting playback..."; 
  }
  pause() { return "Can't pause. Player is stopped."; }
  stop() { return "Already stopped."; }
  getName() { return "Stopped"; }
}

// Context
class AudioPlayer {
  public playingState: AudioState;
  public pausedState: AudioState;
  public stoppedState: AudioState;
  
  private currentState: AudioState;

  constructor(private onStateChange: (s: string) => void) {
    this.playingState = new PlayingState(this);
    this.pausedState = new PausedState(this);
    this.stoppedState = new StoppedState(this);
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
  const [status, setStatus] = useState("Stopped");
  const [log, setLog] = useState("Ready");
  
  // Create player only once
  const [player] = useState(() => new AudioPlayer(setStatus));

  const handlePlay = () => setLog(player.play());
  const handlePause = () => setLog(player.pause());
  const handleStop = () => setLog(player.stop());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Music Player State Machine</h3>
        
        <div className="flex justify-center gap-6 mb-8">
           <button onClick={handlePlay} className="p-4 bg-green-600 rounded-full hover:bg-green-500 shadow-lg text-white">
             <Play size={24} fill="currentColor" />
           </button>
           <button onClick={handlePause} className="p-4 bg-yellow-600 rounded-full hover:bg-yellow-500 shadow-lg text-white">
             <Pause size={24} fill="currentColor" />
           </button>
           <button onClick={handleStop} className="p-4 bg-red-600 rounded-full hover:bg-red-500 shadow-lg text-white">
             <Square size={24} fill="currentColor" />
           </button>
        </div>

        <div className="bg-black p-4 rounded text-center text-gray-400 font-mono">
           {log}
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex flex-col items-center justify-center min-h-[300px]">
         <div className={clsx(
           "w-40 h-40 rounded-full flex items-center justify-center border-4 transition-all duration-500",
           status === 'Playing' ? "border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)] animate-pulse" : 
           status === 'Paused' ? "border-yellow-500" : "border-gray-700 opacity-50"
         )}>
            <Music size={64} className={clsx(
              "transition-colors",
              status === 'Playing' ? "text-green-400" : 
              status === 'Paused' ? "text-yellow-400" : "text-gray-600"
            )} />
         </div>
         <h4 className="mt-6 text-2xl font-bold text-white uppercase tracking-widest">{status}</h4>
      </div>
    </div>
  );
};

export default StateDemo;
