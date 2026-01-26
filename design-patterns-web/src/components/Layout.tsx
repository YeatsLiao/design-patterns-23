import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Box, Layers, Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

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

const Layout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        "fixed md:static inset-y-0 left-0 z-40 w-64 bg-gray-950 border-r border-gray-800 transform transition-transform duration-300 md:transform-none",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2 text-blue-500">
            <Box size={28} />
            <h1 className="text-xl font-bold text-white">Design Patterns</h1>
          </div>
          <p className="text-xs text-gray-500 mt-2">Interactive Learning Platform</p>
        </div>

        <nav className="p-4 overflow-y-auto h-[calc(100vh-89px)]">
          <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" active={isActive('/')} />
          
          <div className="mt-8 mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Patterns
          </div>
          <div className="space-y-1">
             <Link to="/patterns/singleton" className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg text-sm ml-2 border-l border-gray-800 hover:border-blue-500 transition-colors">
                Singleton
             </Link>
          </div>
          <SidebarItem to="/creational" icon={Box} label="Creational" active={isActive('/creational')} />
          <SidebarItem to="/structural" icon={Layers} label="Structural" active={isActive('/structural')} />
          <SidebarItem to="/behavioral" icon={Zap} label="Behavioral" active={isActive('/behavioral')} />
        </nav>
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
