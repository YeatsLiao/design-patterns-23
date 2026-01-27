import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Video, Send, Trash2, Heart } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface Subscriber {
  id: string;
  name: string;
  avatarColor: string;
}

interface Notification {
  id: string;
  subscriberId: string;
  message: string;
}

const ObserverDemo = () => {
  const { t } = useTranslation();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [videoTitle, setVideoTitle] = useState("New Tutorial: React Hooks");
  const [isUploading, setIsUploading] = useState(false);

  // --- Observer Pattern Logic ---
  
  // 1. Subscribe (Attach)
  const subscribe = () => {
    const names = ["Alice", "Bob", "Charlie", "Dave", "Eve"];
    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"];
    
    const newSub: Subscriber = {
      id: Math.random().toString(36).substr(2, 5),
      name: names[subscribers.length % names.length] + (Math.floor(subscribers.length / 5) + 1),
      avatarColor: colors[subscribers.length % colors.length]
    };
    setSubscribers(prev => [...prev, newSub]);
  };

  // 2. Unsubscribe (Detach)
  const unsubscribe = (id: string) => {
    setSubscribers(prev => prev.filter(s => s.id !== id));
    // Also clear notifications for this user
    setNotifications(prev => prev.filter(n => n.subscriberId !== id));
  };

  // 3. Notify (Update)
  const uploadVideo = () => {
    if (subscribers.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      
      // Notify ALL subscribers
      const newNotifications = subscribers.map(sub => ({
        id: Math.random().toString(36),
        subscriberId: sub.id,
        message: t('observer.demo.newVideo', { title: videoTitle })
      }));
      
      setNotifications(prev => [...newNotifications, ...prev].slice(0, 20)); // Keep last 20
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT: Publisher (YouTuber) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-red-400 flex items-center gap-2">
            <Video size={20} />
            {t('observer.demo.titlePublisher')}
          </h3>
          <span className="text-xs font-mono bg-red-900/50 px-2 py-1 rounded text-red-200">
            {t('observer.demo.subscribers', { count: subscribers.length })}
          </span>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl flex flex-col gap-4 items-center justify-center min-h-[200px]">
          <div className="w-full max-w-xs">
            <label className="text-xs text-gray-500 dark:text-gray-500 mb-1 block">{t('observer.demo.videoTitle')}</label>
            <input 
              type="text" 
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded px-3 py-2 text-gray-900 dark:text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
            />
          </div>

          <button
            onClick={uploadVideo}
            disabled={isUploading || subscribers.length === 0}
            className={clsx(
              "flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white shadow-lg transition-all",
              isUploading 
                ? "bg-gray-600 cursor-not-allowed" 
                : subscribers.length === 0
                  ? "bg-gray-700 cursor-not-allowed opacity-50"
                  : "bg-red-600 hover:bg-red-500 hover:scale-105 active:scale-95"
            )}
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {t('observer.demo.uploading')}
              </>
            ) : (
              <>
                <Send size={18} />
                {t('observer.demo.upload')}
              </>
            )}
          </button>
          
          {subscribers.length === 0 && (
            <p className="text-xs text-red-400 mt-2">{t('observer.demo.noSubscribers')}</p>
          )}
        </div>

        {/* Subscriber Management */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">{t('observer.demo.subscribersList')}</h4>
            <button onClick={subscribe} className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-white transition-colors">
              {t('observer.demo.addSubscriber')}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 min-h-[50px]">
            <AnimatePresence>
              {subscribers.map(sub => (
                <motion.div
                  key={sub.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="bg-gray-100 dark:bg-gray-950 rounded-full pl-1 pr-3 py-1 flex items-center gap-2 border border-gray-200 dark:border-gray-700 group"
                >
                  <div className={clsx("w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-gray-900 dark:text-white font-bold", sub.avatarColor)}>
                    {sub.name[0]}
                  </div>
                  <span className="text-xs text-gray-700 dark:text-gray-300">{sub.name}</span>
                  <button 
                    onClick={() => unsubscribe(sub.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-500 dark:text-gray-500 hover:text-red-400 transition-opacity"
                  >
                    <Trash2 size={12} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {subscribers.length === 0 && <span className="text-gray-600 text-xs italic">{t('observer.demo.emptyList')}</span>}
          </div>
        </div>
      </div>

      {/* RIGHT: Subscribers (Observers) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-blue-400 flex items-center gap-2">
            <Bell size={20} />
            {t('observer.demo.titleObservers')}
          </h3>
          <button onClick={() => setNotifications([])} className="text-xs text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:text-white">{t('observer.demo.clear')}</button>
        </div>

        <div className="bg-gray-100 dark:bg-gray-950 rounded-xl p-4 h-[400px] overflow-y-auto custom-scrollbar relative">
          <AnimatePresence>
            {notifications.map((notif) => {
              const sub = subscribers.find(s => s.id === notif.subscriberId);
              // If subscriber is gone, we might still show notification or remove it. 
              // Here we keep it but show as "Unknown" if deleted.
              
              return (
                <motion.div
                  key={notif.id}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-3 p-3 bg-gray-50 dark:bg-gray-900 border-l-2 border-red-500 rounded-r shadow-sm flex items-start gap-3"
                >
                  <div className={clsx("mt-1 w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-gray-900 dark:text-white font-bold", sub?.avatarColor || "bg-gray-700")}>
                    {sub ? sub.name[0] : "?"}
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      {t('observer.demo.received', { name: sub ? sub.name : t('observer.demo.formerSubscriber') })}
                    </div>
                    <div className="text-sm text-gray-900 dark:text-white font-medium">{notif.message}</div>
                  </div>
                  <Heart size={14} className="ml-auto text-gray-600 hover:text-red-500 cursor-pointer" />
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {notifications.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-700 opacity-50">
              <Bell size={48} className="mb-2" />
              <p>{t('observer.demo.noNotifications')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ObserverDemo;
