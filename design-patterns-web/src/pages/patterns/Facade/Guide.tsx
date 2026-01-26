import React from 'react';

const FacadeGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
        <p className="text-gray-300">
          The <strong>Facade</strong> pattern provides a simplified interface to a library, a framework, or any other complex set of classes.
        </p>
        <p className="text-gray-300 mt-2">
          It doesn't hide the subsystem completely but provides a convenient entry point for the most common features.
          Like a smart home panel: pressing "Movie Mode" does 10 different things behind the scenes, but you only interact with one button.
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">Code Example</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`class SmartHomeFacade {
  constructor(
    private lights: Lights,
    private tv: TV,
    private ac: AC
  ) {}

  movieMode() {
    this.lights.dim();
    this.tv.on();
    this.ac.setTemp(22);
    this.ac.on();
  }
}

// Client
const home = new SmartHomeFacade(lights, tv, ac);
home.movieMode(); // Simple API`}
         </pre>
      </section>
    </div>
  );
};

export default FacadeGuide;
