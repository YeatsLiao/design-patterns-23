import React from 'react';

const ChainOfResponsibilityGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
        <p className="text-gray-300">
          The <strong>Chain of Responsibility</strong> pattern lets you pass requests along a chain of handlers. 
          Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.
        </p>
        <p className="text-gray-300 mt-2">
          It's like calling customer support. First, you get a robot (Handler 1). If it can't help, it passes you to a human agent (Handler 2). 
          If the issue is critical, the agent passes you to a manager (Handler 3).
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">Code Example</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`interface Handler {
  setNext(h: Handler): Handler;
  handle(request: string): void;
}

class Robot implements Handler {
  next: Handler;
  handle(req) {
    if (req === 'simple') console.log("Robot fixed it");
    else this.next.handle(req);
  }
}

// Client
const chain = new Robot();
chain.setNext(new Agent()).setNext(new Manager());
chain.handle('critical');`}
         </pre>
      </section>
    </div>
  );
};

export default ChainOfResponsibilityGuide;
