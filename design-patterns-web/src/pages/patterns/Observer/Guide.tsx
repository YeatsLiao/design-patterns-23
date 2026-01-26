import React from 'react';
import { Lightbulb, Radio, PlayCircle } from 'lucide-react';

const ObserverGuide = () => {
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
            The <strong>Observer</strong> pattern defines a subscription mechanism to notify multiple objects about any events that happen to the object they're observing.
          </p>
          <p className="mt-4">
            Think of <strong>YouTube</strong> or <strong>Newsletters</strong>. 
            You (the Observer) subscribe to a Channel (the Subject). 
            When the Channel uploads a new video, it notifies all its subscribers automatically. 
            You don't need to check the channel every 5 minutes to see if there's new content.
          </p>
        </div>
      </section>

      {/* 2. Code Comparison */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Subject */}
        <div className="bg-gray-950 rounded-lg p-4 border border-red-900/30">
          <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
            <Radio size={18} />
            The Subject (Publisher)
          </h3>
          <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`class Channel {
  private subs: Subscriber[] = [];

  subscribe(s: Subscriber) {
    this.subs.push(s);
  }

  unsubscribe(s: Subscriber) {
    this.subs = this.subs.filter(x => x !== s);
  }

  notify(video: string) {
    for (const s of this.subs) {
      s.update(video);
    }
  }
}`}
          </pre>
        </div>

        {/* Observer */}
        <div className="bg-gray-950 rounded-lg p-4 border border-blue-900/30">
          <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
            <PlayCircle size={18} />
            The Observer (Subscriber)
          </h3>
          <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`interface Subscriber {
  update(msg: string): void;
}

class User implements Subscriber {
  constructor(private name: string) {}

  update(msg: string) {
    console.log(this.name + " got: " + msg);
  }
}

// Usage
const channel = new Channel();
channel.subscribe(new User("Alice"));
channel.notify("New Video!");`}
          </pre>
        </div>
      </section>

      {/* 3. When to use */}
      <section>
        <h3 className="text-xl font-semibold text-white mb-3">When to use?</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Use the Observer pattern when changes to the state of one object may require changing other objects, and the actual set of objects is unknown or changes dynamically.</li>
          <li>Use the pattern when some objects in your app must observe others, but only for a limited time or in specific cases.</li>
        </ul>
      </section>
    </div>
  );
};

export default ObserverGuide;
