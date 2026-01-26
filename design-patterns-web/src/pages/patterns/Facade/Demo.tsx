import React, { useState } from 'react';
import { Home, Moon, Sun, Music, Tv, Lock, Wind } from 'lucide-react';
import clsx from 'clsx';

// Subsystem Components (Simulated)
const SmartHomeFacadeDemo = () => {
  const [lights, setLights] = useState(false);
  const [tv, setTv] = useState(false);
  const [ac, setAc] = useState(false);
  const [curtains, setCurtains] = useState(true); // true = open
  const [music, setMusic] = useState(false);
  
  const [mode, setMode] = useState<'day' | 'movie' | 'night' | 'off'>('off');

  // Facade Methods
  const activateMovieMode = () => {
    setMode('movie');
    setLights(false);
    setTv(true);
    setAc(true);
    setCurtains(false); // close curtains
    setMusic(false);
  };

  const activateMorningMode = () => {
    setMode('day');
    setLights(true);
    setTv(false);
    setAc(false);
    setCurtains(true); // open curtains
    setMusic(true);
  };

  const activateNightMode = () => {
    setMode('night');
    setLights(false);
    setTv(false);
    setAc(true);
    setCurtains(false);
    setMusic(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Smart Home Controller (Facade)</h3>
        <p className="text-sm text-gray-400 mb-6">
           Instead of toggling each switch manually, the Facade provides simple "Macro" buttons that orchestrate everything.
        </p>

        <div className="grid grid-cols-1 gap-3">
          <button 
            onClick={activateMorningMode}
            className="flex items-center gap-3 px-4 py-4 bg-orange-100 hover:bg-orange-200 text-orange-900 rounded-xl transition-colors"
          >
            <Sun size={24} /> 
            <div className="text-left">
               <div className="font-bold">Good Morning</div>
               <div className="text-xs opacity-70">Open curtains, Music on, Lights on</div>
            </div>
          </button>

          <button 
            onClick={activateMovieMode}
            className="flex items-center gap-3 px-4 py-4 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl transition-colors"
          >
            <Tv size={24} /> 
            <div className="text-left">
               <div className="font-bold">Movie Night</div>
               <div className="text-xs opacity-70">Dim lights, TV on, AC on, Close curtains</div>
            </div>
          </button>

          <button 
            onClick={activateNightMode}
            className="flex items-center gap-3 px-4 py-4 bg-blue-900 hover:bg-blue-800 text-blue-100 rounded-xl transition-colors"
          >
            <Moon size={24} /> 
            <div className="text-left">
               <div className="font-bold">Good Night</div>
               <div className="text-xs opacity-70">All off, AC on, Lock doors</div>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
         <h4 className="text-gray-400 uppercase tracking-wider text-xs mb-4">System State</h4>
         
         <div className="grid grid-cols-2 gap-4">
            <StatusItem icon={Sun} label="Lights" isOn={lights} color="text-yellow-400" />
            <StatusItem icon={Tv} label="TV" isOn={tv} color="text-blue-400" />
            <StatusItem icon={Wind} label="AC" isOn={ac} color="text-cyan-400" />
            <StatusItem icon={Lock} label="Curtains" isOn={!curtains} onLabel="Closed" offLabel="Open" color="text-red-400" />
            <StatusItem icon={Music} label="Music" isOn={music} color="text-green-400" />
         </div>
      </div>
    </div>
  );
};

const StatusItem = ({ icon: Icon, label, isOn, color, onLabel = "ON", offLabel = "OFF" }: any) => (
  <div className={clsx("p-4 rounded-lg border flex flex-col items-center gap-2 transition-all", isOn ? `bg-gray-800 border-${color.split('-')[1]}-500/50` : "bg-gray-950 border-gray-800 opacity-50")}>
     <Icon size={24} className={isOn ? color : "text-gray-600"} />
     <span className="text-sm text-gray-300 font-medium">{label}</span>
     <span className="text-xs text-gray-500 font-mono">{isOn ? onLabel : offLabel}</span>
  </div>
);

export default SmartHomeFacadeDemo;
