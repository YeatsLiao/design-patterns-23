import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import clsx from 'clsx';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      // Default to dark mode as per original design
      return 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
};

interface ThemeSwitcherProps {
  iconOnly?: boolean;
}

const ThemeSwitcher = ({ iconOnly = false }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "rounded-lg transition-colors flex items-center justify-center border",
        iconOnly ? "p-2 aspect-square" : "p-2 gap-2 w-full",
        theme === 'dark'
          ? "bg-gray-800 text-yellow-400 hover:bg-gray-700 border-gray-700"
          : "bg-white text-orange-500 hover:bg-gray-100 border-gray-200 shadow-sm"
      )}
      aria-label="Toggle Theme"
      title={iconOnly ? (theme === 'dark' ? 'Dark Mode' : 'Light Mode') : undefined}
    >
      {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
      {!iconOnly && (
        <span className="text-sm font-medium">
          {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </button>
  );
};

export default ThemeSwitcher;
