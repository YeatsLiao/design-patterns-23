import React from 'react';
import { Lightbulb, Shuffle, MousePointerClick } from 'lucide-react';

const StrategyGuide = () => {
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
            The <strong>Strategy</strong> pattern defines a family of algorithms, puts each of them into a separate class, and makes their objects interchangeable.
          </p>
          <p className="mt-4">
            Imagine navigating to the airport. You can choose a <strong>Bus</strong> strategy, a <strong>Taxi</strong> strategy, or a <strong>Bike</strong> strategy.
            They all accomplish the same goal (getting to the airport), but the algorithm (cost, time, route) is different.
            The client (traveler) can swap strategies at runtime based on their needs (budget vs speed).
          </p>
        </div>
      </section>

      {/* 2. Code Comparison */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Without Strategy */}
        <div className="bg-gray-950 rounded-lg p-4 border border-red-900/30">
          <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
            <Shuffle size={18} />
            Complex If-Else
          </h3>
          <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`class PaymentProcessor {
  pay(type, amount) {
    if (type === 'credit') {
      // Validate card
      // Charge card
    } else if (type === 'paypal') {
      // Redirect to login
      // Charge account
    } else if (type === 'cash') {
      // ...
    }
  }
}`}
          </pre>
        </div>

        {/* With Strategy */}
        <div className="bg-gray-950 rounded-lg p-4 border border-green-900/30">
          <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
            <MousePointerClick size={18} />
            Strategy Pattern
          </h3>
          <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCardStrategy implements PaymentStrategy {
  pay(amount) { /* Charge card */ }
}

class PayPalStrategy implements PaymentStrategy {
  pay(amount) { /* Redirect */ }
}

// Context
class Checkout {
  private strategy: PaymentStrategy;
  
  setStrategy(s: PaymentStrategy) { this.strategy = s; }
  
  process(amount) {
    this.strategy.pay(amount);
  }
}`}
          </pre>
        </div>
      </section>

      {/* 3. When to use */}
      <section>
        <h3 className="text-xl font-semibold text-white mb-3">When to use?</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Use the Strategy pattern when you want to use different variants of an algorithm within an object and be able to switch from one algorithm to another during runtime.</li>
          <li>Use it when you have a lot of similar classes that only differ in the way they execute some behavior.</li>
          <li>Use it to isolate the business logic of a class from the implementation details of algorithms that may not be as important in the context of that logic.</li>
        </ul>
      </section>
    </div>
  );
};

export default StrategyGuide;
