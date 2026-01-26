import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

import SingletonPage from './pages/patterns/Singleton';
import FactoryPage from './pages/patterns/Factory';
import AbstractFactoryPage from './pages/patterns/AbstractFactory';
import BuilderPage from './pages/patterns/Builder';
import PrototypePage from './pages/patterns/Prototype';
import AdapterPage from './pages/patterns/Adapter';
import BridgePage from './pages/patterns/Bridge';
import CompositePage from './pages/patterns/Composite';
import DecoratorPage from './pages/patterns/Decorator';
import FacadePage from './pages/patterns/Facade';
import FlyweightPage from './pages/patterns/Flyweight';
import ProxyPage from './pages/patterns/Proxy';
import ChainOfResponsibilityPage from './pages/patterns/ChainOfResponsibility';
import CommandPage from './pages/patterns/Command';
import InterpreterPage from './pages/patterns/Interpreter';
import IteratorPage from './pages/patterns/Iterator';
import MediatorPage from './pages/patterns/Mediator';
import MementoPage from './pages/patterns/Memento';
import ObserverPage from './pages/patterns/Observer';
import StatePage from './pages/patterns/State';
import StrategyPage from './pages/patterns/Strategy';
import TemplateMethodPage from './pages/patterns/TemplateMethod';
import VisitorPage from './pages/patterns/Visitor';

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
          <li>
            <a href="/patterns/factory" className="block p-2 rounded bg-gray-900 hover:bg-gray-700 text-gray-300 text-sm transition-colors">
              Factory Method
            </a>
          </li>
          <li>
            <a href="/patterns/abstract-factory" className="block p-2 rounded bg-gray-900 hover:bg-gray-700 text-gray-300 text-sm transition-colors">
              Abstract Factory
            </a>
          </li>
        </ul>
      </div>
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-green-400 mb-2">Structural</h3>
        <p className="text-gray-400 text-sm">Relationships between entities.</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500 transition-colors group cursor-pointer">
        <h3 className="text-xl font-semibold text-yellow-400 mb-2 group-hover:text-yellow-300">Behavioral</h3>
        <p className="text-gray-400 text-sm mb-4">Communication patterns.</p>
        <ul className="space-y-2">
          <li>
            <a href="/patterns/observer" className="block p-2 rounded bg-gray-900 hover:bg-gray-700 text-gray-300 text-sm transition-colors">
              Observer
            </a>
          </li>
          <li>
            <a href="/patterns/strategy" className="block p-2 rounded bg-gray-900 hover:bg-gray-700 text-gray-300 text-sm transition-colors">
              Strategy
            </a>
          </li>
        </ul>
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
          
          {/* Creational */}
          <Route path="patterns/singleton" element={<SingletonPage />} />
          <Route path="patterns/factory" element={<FactoryPage />} />
          <Route path="patterns/abstract-factory" element={<AbstractFactoryPage />} />
          <Route path="patterns/builder" element={<BuilderPage />} />
          <Route path="patterns/prototype" element={<PrototypePage />} />

          {/* Structural */}
          <Route path="patterns/adapter" element={<AdapterPage />} />
          <Route path="patterns/bridge" element={<BridgePage />} />
          <Route path="patterns/composite" element={<CompositePage />} />
          <Route path="patterns/decorator" element={<DecoratorPage />} />
          <Route path="patterns/facade" element={<FacadePage />} />
          <Route path="patterns/flyweight" element={<FlyweightPage />} />
          <Route path="patterns/proxy" element={<ProxyPage />} />

          {/* Behavioral */}
          <Route path="patterns/chain-of-responsibility" element={<ChainOfResponsibilityPage />} />
          <Route path="patterns/command" element={<CommandPage />} />
          <Route path="patterns/interpreter" element={<InterpreterPage />} />
          <Route path="patterns/iterator" element={<IteratorPage />} />
          <Route path="patterns/mediator" element={<MediatorPage />} />
          <Route path="patterns/memento" element={<MementoPage />} />
          <Route path="patterns/observer" element={<ObserverPage />} />
          <Route path="patterns/state" element={<StatePage />} />
          <Route path="patterns/strategy" element={<StrategyPage />} />
          <Route path="patterns/template-method" element={<TemplateMethodPage />} />
          <Route path="patterns/visitor" element={<VisitorPage />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
