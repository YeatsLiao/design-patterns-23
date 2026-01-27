import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import clsx from 'clsx';

interface LanguageSwitcherProps {
  iconOnly?: boolean;
}

const LanguageSwitcher = ({ iconOnly = false }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={clsx(
        "flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors border border-gray-700",
        iconOnly ? "p-2 aspect-square" : "gap-2 px-3 py-2"
      )}
      title="Switch Language"
    >
      <Globe size={18} />
      {!iconOnly && (
        <span className="text-sm font-medium">
          {i18n.language === 'en' ? '中文' : 'English'}
        </span>
      )}
    </button>
  );
};

export default LanguageSwitcher;
