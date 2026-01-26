import React, { useState } from 'react';
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Component Interface
interface FileSystemItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number; // File size in KB
  children?: FileSystemItem[];
}

const initialData: FileSystemItem = {
  id: 'root',
  name: 'root',
  type: 'folder',
  children: [
    {
      id: 'src',
      name: 'src',
      type: 'folder',
      children: [
        { id: 'app', name: 'App.tsx', type: 'file', size: 12 },
        { id: 'index', name: 'index.tsx', type: 'file', size: 8 },
        { 
          id: 'comps', 
          name: 'components', 
          type: 'folder', 
          children: [
             { id: 'btn', name: 'Button.tsx', type: 'file', size: 5 }
          ] 
        }
      ]
    },
    { id: 'readme', name: 'README.md', type: 'file', size: 2 }
  ]
};

// Recursive Component
const FileSystemNode = ({ item, level = 0, onCalculateSize }: { item: FileSystemItem; level?: number; onCalculateSize: (size: number) => void }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Composite Logic: Get size of self or sum of children
  const getSize = (node: FileSystemItem): number => {
    if (node.type === 'file') return node.size || 0;
    return (node.children || []).reduce((acc, child) => acc + getSize(child), 0);
  };

  const mySize = getSize(item);

  return (
    <div className="select-none">
      <div 
        className={clsx(
           "flex items-center gap-2 py-1 px-2 hover:bg-gray-200 dark:bg-gray-800 rounded cursor-pointer transition-colors",
           level === 0 && "font-bold text-blue-400"
        )}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={() => {
            if (item.type === 'folder') setIsOpen(!isOpen);
            onCalculateSize(mySize);
        }}
      >
        {item.type === 'folder' && (
          <span className="text-gray-500 dark:text-gray-400">
             {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        )}
        {item.type === 'folder' ? <Folder size={16} className="text-blue-500" /> : <File size={16} className="text-gray-600 dark:text-gray-400" />}
        <span className="text-sm text-gray-700 dark:text-gray-200">{item.name}</span>
        <span className="ml-auto text-xs text-gray-600 font-mono">{mySize} KB</span>
      </div>

      <AnimatePresence>
        {item.type === 'folder' && isOpen && item.children && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {item.children.map(child => (
              <FileSystemNode key={child.id} item={child} level={level + 1} onCalculateSize={onCalculateSize} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CompositeDemo = () => {
  const { t } = useTranslation();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('composite.demo.title')}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {t('composite.demo.instruction')}
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-950 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
          <FileSystemNode item={initialData} onCalculateSize={setSelectedSize} />
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center">
         <h4 className="text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs mb-2">{t('composite.demo.selectedSize')}</h4>
         <div className="text-6xl font-bold text-gray-900 dark:text-white font-mono">
            {selectedSize !== null ? (
               <span>{selectedSize} <span className="text-2xl text-gray-500 dark:text-gray-400">KB</span></span>
            ) : (
               <span className="text-gray-700 text-4xl">--</span>
            )}
         </div>
         <p className="text-gray-500 dark:text-gray-400 text-xs mt-4 max-w-xs text-center">
            {selectedSize !== null 
              ? t('composite.demo.calculated')
              : t('composite.demo.selectNode')}
         </p>
      </div>
    </div>
  );
};

export default CompositeDemo;
