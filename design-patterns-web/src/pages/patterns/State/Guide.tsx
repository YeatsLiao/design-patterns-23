import React from 'react';

const StateGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
        <p className="text-gray-300">
          The <strong>State</strong> pattern lets an object alter its behavior when its internal state changes. It appears as if the object changed its class.
        </p>
        <p className="text-gray-300 mt-2">
          Instead of massive <code>switch</code> statements inside a <code>click()</code> method (e.g., <code>if state == playing then pause else if state == stopped then play</code>), 
          you delegate the execution to a state object.
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">Code Example</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`interface State {
  clickPlay(): void;
}

class PlayingState implements State {
  clickPlay() { /* Do nothing or pause */ }
}

class StoppedState implements State {
  clickPlay() { /* Start music */ }
}

class Player {
  state: State;
  changeState(s: State) { this.state = s; }
  clickPlay() { this.state.clickPlay(); }
}`}
         </pre>
      </section>
    </div>
  );
};

export default StateGuide;
