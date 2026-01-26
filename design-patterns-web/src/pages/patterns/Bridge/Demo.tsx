import React, { useState } from 'react';
import { Tv, Speaker, Power, Volume2 } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

// Abstraction: Remote Control
// Implementation: Device (TV, Radio)

interface Device {
  id: string;
  name: string;
  isOn: boolean;
  volume: number;
}

const BridgeDemo = () => {
  const { t } = useTranslation();
  const [tv, setTv] = useState<Device>({ id: 'tv', name: t('bridge.demo.smartTV'), isOn: false, volume: 10 });
  const [radio, setRadio] = useState<Device>({ id: 'radio', name: t('bridge.demo.homeRadio'), isOn: false, volume: 30 });
  
  const [selectedDevice, setSelectedDevice] = useState<'tv' | 'radio'>('tv');

  const getDevice = () => selectedDevice === 'tv' ? tv : radio;
  const setDevice = (d: Device) => selectedDevice === 'tv' ? setTv(d) : setRadio(d);

  // Remote Actions (The Bridge)
  const togglePower = () => {
    const d = getDevice();
    setDevice({ ...d, isOn: !d.isOn });
  };

  const volumeUp = () => {
    const d = getDevice();
    if (d.isOn) setDevice({ ...d, volume: Math.min(100, d.volume + 10) });
  };

  const volumeDown = () => {
    const d = getDevice();
    if (d.isOn) setDevice({ ...d, volume: Math.max(0, d.volume - 10) });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Remote Control (Abstraction) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('bridge.demo.title')}</h3>
        
        <div className="mb-6 flex gap-2 bg-gray-50 dark:bg-gray-900 p-1 rounded-lg">
           <button 
             onClick={() => setSelectedDevice('tv')}
             className={clsx("px-4 py-2 rounded text-sm transition-colors", selectedDevice === 'tv' ? "bg-blue-600 text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white")}
           >
             {t('bridge.demo.controlTV')}
           </button>
           <button 
             onClick={() => setSelectedDevice('radio')}
             className={clsx("px-4 py-2 rounded text-sm transition-colors", selectedDevice === 'radio' ? "bg-blue-600 text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white")}
           >
             {t('bridge.demo.controlRadio')}
           </button>
        </div>

        <div className="w-48 bg-gray-100 dark:bg-gray-950 rounded-3xl p-6 border-4 border-gray-200 dark:border-gray-700 shadow-2xl flex flex-col gap-6">
           <button 
             onClick={togglePower}
             className="w-12 h-12 bg-red-600 hover:bg-red-500 rounded-full text-gray-900 dark:text-white mx-auto flex items-center justify-center shadow-lg active:scale-95 transition-all"
           >
             <Power size={20} />
           </button>

           <div className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-full p-2">
              <button onClick={volumeDown} className="w-10 h-10 bg-gray-700 rounded-full text-gray-900 dark:text-white hover:bg-gray-600">-</button>
              <Volume2 size={16} className="text-gray-600 dark:text-gray-400" />
              <button onClick={volumeUp} className="w-10 h-10 bg-gray-700 rounded-full text-gray-900 dark:text-white hover:bg-gray-600">+</button>
           </div>
        </div>
      </div>

      {/* Devices (Implementation) */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col gap-6">
        {/* TV */}
        <div className={clsx("p-6 rounded-xl border transition-all duration-500", tv.isOn ? "bg-white dark:bg-gray-800 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]" : "bg-black border-gray-200 dark:border-gray-800 opacity-50")}>
           <div className="flex justify-between items-start mb-4">
             <div className="flex items-center gap-3">
               <Tv size={32} className={tv.isOn ? "text-blue-400" : "text-gray-600"} />
               <h4 className="text-lg font-bold text-gray-900 dark:text-white">{t('bridge.demo.smartTV')}</h4>
             </div>
             <div className={clsx("w-3 h-3 rounded-full", tv.isOn ? "bg-green-500 shadow-[0_0_5px_lime]" : "bg-red-900")} />
           </div>
           {tv.isOn && (
             <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${tv.volume}%` }} />
             </div>
           )}
        </div>

        {/* Radio */}
        <div className={clsx("p-6 rounded-xl border transition-all duration-500", radio.isOn ? "bg-white dark:bg-gray-800 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.2)]" : "bg-black border-gray-200 dark:border-gray-800 opacity-50")}>
           <div className="flex justify-between items-start mb-4">
             <div className="flex items-center gap-3">
               <Speaker size={32} className={radio.isOn ? "text-orange-400" : "text-gray-600"} />
               <h4 className="text-lg font-bold text-gray-900 dark:text-white">{t('bridge.demo.homeRadio')}</h4>
             </div>
             <div className={clsx("w-3 h-3 rounded-full", radio.isOn ? "bg-green-500 shadow-[0_0_5px_lime]" : "bg-red-900")} />
           </div>
           {radio.isOn && (
             <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
               <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: `${radio.volume}%` }} />
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default BridgeDemo;
