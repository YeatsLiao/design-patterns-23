import React from 'react';

const CommandGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
        <p className="text-gray-300">
          The <strong>Command</strong> pattern turns a request into a stand-alone object that contains all information about the request. 
          This transformation lets you parameterize methods with different requests, delay or queue a request's execution, and support undoable operations.
        </p>
        <p className="text-gray-300 mt-2">
          It's like ordering food at a restaurant. You (Client) give an order (Command) to the waiter (Invoker). 
          The waiter doesn't cook; he passes the order to the chef (Receiver). 
          Because the order is an object, it can be queued, modified, or cancelled.
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">Code Example</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`interface Command {
  execute(): void;
  undo(): void;
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}
  
  execute() { this.light.turnOn(); }
  undo() { this.light.turnOff(); }
}

// Invoker can store history
class Remote {
  private history: Command[] = [];
  
  press(cmd: Command) {
    cmd.execute();
    this.history.push(cmd);
  }
  
  undo() {
    const cmd = this.history.pop();
    cmd.undo();
  }
}`}
         </pre>
      </section>
    </div>
  );
};

export default CommandGuide;
