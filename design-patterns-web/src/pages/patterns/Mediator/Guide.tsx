import React from 'react';

const MediatorGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
        <p className="text-gray-300">
          The <strong>Mediator</strong> pattern restricts direct communications between the objects and forces them to collaborate only via a mediator object.
        </p>
        <p className="text-gray-300 mt-2">
          Instead of Alice sending a message directly to Bob and Charlie (Many-to-Many dependency), Alice sends it to the ChatRoom (Mediator), and the ChatRoom distributes it. 
          This reduces coupling: components don't need to know about each other, only about the Mediator.
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">Code Example</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`interface Mediator {
  notify(sender: object, event: string): void;
}

class ChatRoom implements Mediator {
  notify(sender, msg) {
    if (sender === alice) bob.receive(msg);
    if (sender === bob) alice.receive(msg);
  }
}

class User {
  constructor(private mediator: Mediator) {}
  send(msg) { this.mediator.notify(this, msg); }
}`}
         </pre>
      </section>
    </div>
  );
};

export default MediatorGuide;
