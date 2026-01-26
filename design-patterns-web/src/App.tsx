import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

import SingletonPage from './pages/patterns/Singleton';

// Placeholder components
const Dashboard = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
      <h1 className="text-4xl font-bold mb-4">Master Design Patterns</h1>
      <p className="text-lg opacity-90 max-w-2xl">
        Interactive visualizations, real-world examples, and side-by-side code comparisons.
        Learn the 23 GoF design patterns the modern way.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors group cursor-pointer">
        <h3 className="text-xl font-semibold text-blue-400 mb-2 group-hover:text-blue-300">Creational</h3>
        <p className="text-gray-400 text-sm mb-4">Object creation mechanisms.</p>
        <ul className="space-y-2">
          <li>
            <a href="/patterns/singleton" className="block p-2 rounded bg-gray-900 hover:bg-gray-700 text-gray-300 text-sm transition-colors">
              Singleton
            </a>
          </li>
          <li className="p-2 rounded bg-gray-900/50 text-gray-600 text-sm cursor-not-allowed">Factory (Coming soon)</li>
        </ul>
      </div>
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-green-400 mb-2">Structural</h3>
        <p className="text-gray-400 text-sm">Relationships between entities.</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-yellow-400 mb-2">Behavioral</h3>
        <p className="text-gray-400 text-sm">Communication patterns.</p>
      </div>
    </div>
  </div>
);

const CategoryPage = ({ title }: { title: string }) => (
  <div>
    <h2 className="text-3xl font-bold text-white mb-6">{title} Patterns</h2>
    <div className="bg-gray-800 rounded-xl p-10 text-center border border-gray-700 border-dashed">
      <p className="text-gray-400">Select a pattern to start learning</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="creational" element={<CategoryPage title="Creational" />} />
          <Route path="structural" element={<CategoryPage title="Structural" />} />
          <Route path="behavioral" element={<CategoryPage title="Behavioral" />} />
          
          {/* Specific Pattern Routes */}
          <Route path="patterns/singleton" element={<SingletonPage />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
