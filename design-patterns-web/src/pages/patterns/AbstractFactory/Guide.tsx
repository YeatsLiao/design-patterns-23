import React from 'react';
import { Lightbulb, Layers, ShieldCheck } from 'lucide-react';

const AbstractFactoryGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      {/* 1. Concept Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="text-yellow-400" />
          Concept
        </h2>
        <div className="prose prose-invert text-gray-300">
          <p>
            The <strong>Abstract Factory</strong> pattern lets you produce families of related objects without specifying their concrete classes.
          </p>
          <p className="mt-4">
            Think of it like buying furniture. You might want a <strong>Modern</strong> Sofa and a <strong>Modern</strong> Chair. 
            Or a <strong>Victorian</strong> Sofa and a <strong>Victorian</strong> Chair. 
            You usually don't want to mix a Victorian Sofa with Modern Chairs. 
            The Abstract Factory ensures you get a matching set.
          </p>
        </div>
      </section>

      {/* 2. Code Comparison */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Abstract Factory Interface */}
        <div className="bg-gray-950 rounded-lg p-4 border border-purple-900/30 col-span-2">
          <h3 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
            <Layers size={18} />
            The Abstract Factory Interface
          </h3>
          <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`interface ElectronicsFactory {
  createPhone(): Phone;
  createLaptop(): Laptop;
}

// Concrete Factory 1
class AppleFactory implements ElectronicsFactory {
  createPhone() { return new IPhone(); }
  createLaptop() { return new MacBook(); }
}

// Concrete Factory 2
class SamsungFactory implements ElectronicsFactory {
  createPhone() { return new GalaxyPhone(); }
  createLaptop() { return new GalaxyBook(); }
}`}
          </pre>
        </div>
      </section>

      {/* 3. When to use */}
      <section>
        <h3 className="text-xl font-semibold text-white mb-3">When to use?</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Use Abstract Factory when your code needs to work with various families of related products (e.g. Apple vs Samsung, LightTheme vs DarkTheme UI components).</li>
          <li>Use it when you want to enforce that products from the same factory are used together.</li>
        </ul>
      </section>
    </div>
  );
};

export default AbstractFactoryGuide;
