import React, { useState } from 'react';
import { Play, SkipForward, SkipBack, Music, Repeat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Iterator Interface
interface Iterator<T> {
  current(): T;
  next(): T;
  key(): number;
  valid(): boolean;
  rewind(): void;
}

// Collection Interface
interface Aggregator {
  getIterator(): Iterator<string>;
}

class Playlist implements Aggregator {
  constructor(public items: string[] = []) {}
  
  public getCount() { return this.items.length; }
  
  public getIterator(): Iterator<string> {
    return new OrderIterator(this);
  }
}

class OrderIterator implements Iterator<string> {
  private position: number = 0;

  constructor(private collection: Playlist) {}

  public current(): string {
    return this.collection.items[this.position];
  }

  public next(): string {
    const item = this.collection.items[this.position];
    this.position += 1;
    return item;
  }

  public key(): number {
    return this.position;
  }

  public valid(): boolean {
    return this.position < this.collection.getCount();
  }

  public rewind(): void {
    this.position = 0;
  }
}

const IteratorDemo = () => {
  const { t } = useTranslation();
  const songs = ["Song A - Intro", "Song B - Verse", "Song C - Chorus", "Song D - Outro"];
  const playlist = new Playlist(songs);
  const [iterator, setIterator] = useState<OrderIterator>(new OrderIterator(playlist));
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const start = () => {
    iterator.rewind();
    if (iterator.valid()) {
      setCurrentSong(iterator.current());
      setIsPlaying(true);
    }
  };

  const next = () => {
    iterator.next();
    if (iterator.valid()) {
      setCurrentSong(iterator.current());
    } else {
      setIsPlaying(false);
      setCurrentSong(t('iterator.demo.endOfPlaylist'));
      iterator.rewind(); // Reset for next play
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('iterator.demo.title')}</h3>
        
        <div className="space-y-2 mb-6">
           {songs.map((song, i) => (
             <div key={i} className={`p-3 rounded flex items-center gap-3 ${currentSong === song ? "bg-blue-900/50 border border-blue-500 text-gray-900 dark:text-white" : "bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400"}`}>
                <span className="text-xs font-mono opacity-50">{i + 1}</span>
                <Music size={16} />
                <span>{song}</span>
                {currentSong === song && isPlaying && <motion.div layoutId="playing" className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse" />}
             </div>
           ))}
        </div>

        <div className="flex justify-center gap-4">
           <button onClick={start} className="p-4 bg-green-600 rounded-full text-gray-900 dark:text-white hover:bg-green-500 shadow-lg"><Play size={24} fill="currentColor" /></button>
           <button onClick={next} className="p-4 bg-gray-700 rounded-full text-gray-900 dark:text-white hover:bg-gray-600"><SkipForward size={24} /></button>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center min-h-[300px]">
         <div className="w-48 h-48 bg-black rounded-full flex items-center justify-center border-4 border-gray-200 dark:border-gray-800 relative shadow-2xl">
            <div className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-700 border-dashed animate-[spin_10s_linear_infinite]" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}></div>
            <div className="text-center z-10">
               {currentSong ? (
                 <motion.div key={currentSong} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                   <Music size={32} className="mx-auto mb-2 text-blue-400" />
                   <div className="text-sm font-bold text-gray-900 dark:text-white">{currentSong}</div>
                   <div className="text-xs text-gray-500 dark:text-gray-500">{t('iterator.demo.nowPlaying')}</div>
                 </motion.div>
               ) : (
                 <span className="text-gray-600">{t('iterator.demo.stopped')}</span>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default IteratorDemo;
