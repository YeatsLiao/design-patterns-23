import React from 'react';

const AdapterGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
        <p className="text-gray-300">
          The <strong>Adapter</strong> pattern allows objects with incompatible interfaces to collaborate.
        </p>
        <p className="text-gray-300 mt-2">
          It acts as a wrapper between two objects. It catches calls for one object and transforms them to format and interface recognizable by the second object.
          Just like a travel power adapter converts your plug shape to fit into the foreign wall socket.
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">Code Example</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`// Existing interface (Incompatible)
class USPlug {
  insertFlat() { console.log("Connected flat pins"); }
}

// Target interface
interface EUSocket {
  insertRound(): void;
}

// Adapter
class Adapter implements EUSocket {
  constructor(private device: USPlug) {}

  insertRound() {
    // Translate the call
    this.device.insertFlat(); 
  }
}`}
         </pre>
      </section>
    </div>
  );
};

export default AdapterGuide;
