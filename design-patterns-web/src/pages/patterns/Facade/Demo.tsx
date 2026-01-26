import React, { useState } from 'react';
import { Moon, Sun, Music, Tv, Lock, Wind } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

// Subsystem Components (Simulated)
const SmartHomeFacadeDemo = () => {
  const { t } = useTranslation();
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
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('facade.demo.title')}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
           {t('facade.demo.description')}
        </p>

        <div className="grid grid-cols-1 gap-3">
          <button 
            onClick={activateMorningMode}
            className="flex items-center gap-3 px-4 py-4 bg-orange-100 hover:bg-orange-200 text-orange-900 rounded-xl transition-colors"
          >
            <Sun size={24} /> 
            <div className="text-left">
               <div className="font-bold">{t('facade.demo.goodMorning')}</div>
               <div className="text-xs opacity-70">{t('facade.demo.goodMorningDesc')}</div>
            </div>
          </button>

          <button 
            onClick={activateMovieMode}
            className="flex items-center gap-3 px-4 py-4 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl transition-colors"
          >
            <Tv size={24} /> 
            <div className="text-left">
               <div className="font-bold">{t('facade.demo.movieNight')}</div>
               <div className="text-xs opacity-70">{t('facade.demo.movieNightDesc')}</div>
            </div>
          </button>

          <button 
            onClick={activateNightMode}
            className="flex items-center gap-3 px-4 py-4 bg-blue-900 hover:bg-blue-800 text-blue-100 rounded-xl transition-colors"
          >
            <Moon size={24} /> 
            <div className="text-left">
               <div className="font-bold">{t('facade.demo.goodNight')}</div>
               <div className="text-xs opacity-70">{t('facade.demo.goodNightDesc')}</div>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
         <h4 className="text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs mb-4">{t('facade.demo.systemState')}</h4>
         
         <div className="grid grid-cols-2 gap-4">
            <StatusItem icon={Sun} label={t('facade.demo.lights')} isOn={lights} color="text-yellow-400" />
            <StatusItem icon={Tv} label={t('facade.demo.tv')} isOn={tv} color="text-blue-400" />
            <StatusItem icon={Wind} label={t('facade.demo.ac')} isOn={ac} color="text-cyan-400" />
            <StatusItem icon={Lock} label={t('facade.demo.curtains')} isOn={!curtains} onLabel={t('facade.demo.closed')} offLabel={t('facade.demo.open')} color="text-red-400" />
            <StatusItem icon={Music} label={t('facade.demo.music')} isOn={music} color="text-green-400" />
         </div>
      </div>
    </div>
  );
};

const StatusItem = ({ icon: Icon, label, isOn, color, onLabel = "ON", offLabel = "OFF" }: any) => (
  <div className={clsx("p-4 rounded-lg border flex flex-col items-center gap-2 transition-all", isOn ? `bg-white dark:bg-gray-800 border-${color.split('-')[1]}-500/50` : "bg-gray-100 dark:bg-gray-950 border-gray-200 dark:border-gray-800 opacity-50")}>
     <Icon size={24} className={isOn ? color : "text-gray-600"} />
     <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{label}</span>
     <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">{isOn ? onLabel : offLabel}</span>
  </div>
);

export default SmartHomeFacadeDemo;
