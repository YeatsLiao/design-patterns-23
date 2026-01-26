import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Box, Layers, Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const SidebarItem = ({ to, icon: Icon, label, active }: { to: string; icon: any; label: string; active: boolean }) => (
  <Link
    to={to}
    className={clsx(
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1",
      active 
        ? "bg-blue-600 text-white" 
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    )}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

const SubMenuLink = ({ to, label, active }: { to: string; label: string; active: boolean }) => (
  <Link
    to={to}
    className={clsx(
      "block px-4 py-2 text-sm ml-6 border-l transition-colors",
      active 
        ? "border-blue-500 text-white bg-gray-800/50 rounded-r" 
        : "border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-600"
    )}
  >
    {label}
  </Link>
);

const Layout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-800 rounded-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={clsx(
        "fixed md:static inset-y-0 left-0 z-40 w-64 bg-gray-950 border-r border-gray-800 transform transition-transform duration-300 md:transform-none flex flex-col",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-2 text-blue-500">
            <Box size={28} />
            <h1 className="text-xl font-bold text-white">{t('common.patterns')}</h1>
          </div>
          <p className="text-xs text-gray-500 mt-2">{t('common.interactiveLearning')}</p>
        </div>

        <nav className="p-4 overflow-y-auto flex-1 custom-scrollbar">
          <SidebarItem to="/" icon={LayoutDashboard} label={t('common.dashboard')} active={isActive('/')} />
          
          <div className="mt-6 mb-2 px-4 text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <Box size={14} /> {t('common.creational')}
          </div>
          <div className="space-y-0.5 mb-4">
            <SubMenuLink to="/patterns/singleton" label={t('patterns.singleton')} active={location.pathname === '/patterns/singleton'} />
            <SubMenuLink to="/patterns/factory" label={t('patterns.factory')} active={location.pathname === '/patterns/factory'} />
            <SubMenuLink to="/patterns/abstract-factory" label={t('patterns.abstractFactory')} active={location.pathname === '/patterns/abstract-factory'} />
            <SubMenuLink to="/patterns/builder" label={t('patterns.builder')} active={location.pathname === '/patterns/builder'} />
            <SubMenuLink to="/patterns/prototype" label={t('patterns.prototype')} active={location.pathname === '/patterns/prototype'} />
          </div>

          <div className="mt-6 mb-2 px-4 text-xs font-semibold text-green-400 uppercase tracking-wider flex items-center gap-2">
            <Layers size={14} /> {t('common.structural')}
          </div>
          <div className="space-y-0.5 mb-4">
            <SubMenuLink to="/patterns/adapter" label={t('patterns.adapter')} active={location.pathname === '/patterns/adapter'} />
            <SubMenuLink to="/patterns/bridge" label={t('patterns.bridge')} active={location.pathname === '/patterns/bridge'} />
            <SubMenuLink to="/patterns/composite" label={t('patterns.composite')} active={location.pathname === '/patterns/composite'} />
            <SubMenuLink to="/patterns/decorator" label={t('patterns.decorator')} active={location.pathname === '/patterns/decorator'} />
            <SubMenuLink to="/patterns/facade" label={t('patterns.facade')} active={location.pathname === '/patterns/facade'} />
            <SubMenuLink to="/patterns/flyweight" label={t('patterns.flyweight')} active={location.pathname === '/patterns/flyweight'} />
            <SubMenuLink to="/patterns/proxy" label={t('patterns.proxy')} active={location.pathname === '/patterns/proxy'} />
          </div>

          <div className="mt-6 mb-2 px-4 text-xs font-semibold text-yellow-400 uppercase tracking-wider flex items-center gap-2">
            <Zap size={14} /> {t('common.behavioral')}
          </div>
          <div className="space-y-0.5 mb-10">
            <SubMenuLink to="/patterns/chain-of-responsibility" label={t('patterns.chainOfResponsibility')} active={location.pathname === '/patterns/chain-of-responsibility'} />
            <SubMenuLink to="/patterns/command" label={t('patterns.command')} active={location.pathname === '/patterns/command'} />
            <SubMenuLink to="/patterns/interpreter" label={t('patterns.interpreter')} active={location.pathname === '/patterns/interpreter'} />
            <SubMenuLink to="/patterns/iterator" label={t('patterns.iterator')} active={location.pathname === '/patterns/iterator'} />
            <SubMenuLink to="/patterns/mediator" label={t('patterns.mediator')} active={location.pathname === '/patterns/mediator'} />
            <SubMenuLink to="/patterns/memento" label={t('patterns.memento')} active={location.pathname === '/patterns/memento'} />
            <SubMenuLink to="/patterns/observer" label={t('patterns.observer')} active={location.pathname === '/patterns/observer'} />
            <SubMenuLink to="/patterns/state" label={t('patterns.state')} active={location.pathname === '/patterns/state'} />
            <SubMenuLink to="/patterns/strategy" label={t('patterns.strategy')} active={location.pathname === '/patterns/strategy'} />
            <SubMenuLink to="/patterns/template-method" label={t('patterns.templateMethod')} active={location.pathname === '/patterns/template-method'} />
            <SubMenuLink to="/patterns/visitor" label={t('patterns.visitor')} active={location.pathname === '/patterns/visitor'} />
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
           <LanguageSwitcher />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-900 relative">
        <div className="max-w-7xl mx-auto p-6 md:p-10">
          <Outlet />
        </div>
      </main>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
