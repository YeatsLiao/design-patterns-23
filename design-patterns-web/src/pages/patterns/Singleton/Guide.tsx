import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';

const SingletonGuide = () => {
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
            Imagine a country having a government. A country can have only <strong>one</strong> official government. 
            Regardless of the personal identities of the individuals who form the government, 
            the title, "The Government of X", is a global point of access that identifies the group of people in charge.
          </p>
          <p className="mt-4">
            The <strong>Singleton Pattern</strong> ensures that a class has only one instance and provides a global point of access to it.
          </p>
        </div>
      </section>

      {/* 2. Code Comparison */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Bad Code */}
        <div className="bg-gray-950 rounded-lg p-4 border border-red-900/30">
          <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle size={18} />
            Naive Implementation
          </h3>
          <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`class Database {
  constructor() {
    this.id = Math.random();
    console.log("DB Created!");
  }
}

// Client Code
const db1 = new Database();
const db2 = new Database();

console.log(db1 === db2); 
// false ❌ (Different instances)`}
          </pre>
        </div>

        {/* Good Code */}
        <div className="bg-gray-950 rounded-lg p-4 border border-green-900/30">
          <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
            <CheckCircle size={18} />
            Singleton Implementation
          </h3>
          <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`class Database {
  private static instance: Database;
  
  private constructor() { /*...*/ }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

// Client Code
const db1 = Database.getInstance();
const db2 = Database.getInstance();

console.log(db1 === db2); 
// true ✅ (Same instance)`}
          </pre>
        </div>
      </section>

      {/* 3. When to use */}
      <section>
        <h3 className="text-xl font-semibold text-white mb-3">When to use?</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Use the Singleton pattern when a class in your program should have just a single instance available to all clients; for example, a single database object shared by different parts of the program.</li>
          <li>Use the Singleton pattern when you need stricter control over global variables.</li>
        </ul>
      </section>
    </div>
  );
};

export default SingletonGuide;
