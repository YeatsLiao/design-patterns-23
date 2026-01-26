import React from 'react';

const BridgeGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
        <p className="text-gray-300">
          The <strong>Bridge</strong> pattern lets you split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently.
        </p>
        <p className="text-gray-300 mt-2">
          In the demo, the <strong>Remote</strong> (Abstraction) is separated from the <strong>Device</strong> (Implementation).
          You can create new types of Remotes (AdvancedRemote) without changing the Devices, and new Devices without changing the Remote code.
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">Code Example</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`// Implementation
interface Device {
  enable(): void;
  disable(): void;
  setVolume(percent: number): void;
}

// Abstraction
class Remote {
  constructor(protected device: Device) {}
  
  togglePower() {
    if (this.device.isEnabled()) this.device.disable();
    else this.device.enable();
  }
}

// Client can mix and match
const tv = new Tv();
const remote = new Remote(tv);`}
         </pre>
      </section>
    </div>
  );
};

export default BridgeGuide;
