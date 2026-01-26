import React from 'react';

const ProxyGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
        <p className="text-gray-300">
          The <strong>Proxy</strong> pattern provides a substitute or placeholder for another object. 
          A proxy controls access to the original object, allowing you to perform something either before or after the request gets through to the original object.
        </p>
        <p className="text-gray-300 mt-2">
          Common uses include:
          <ul className="list-disc list-inside mt-2 ml-2">
            <li><strong>Caching Proxy</strong>: Save results of expensive operations.</li>
            <li><strong>Protection Proxy</strong>: Check permissions before access.</li>
            <li><strong>Virtual Proxy</strong>: Delay initialization of heavy objects.</li>
          </ul>
        </p>
      </section>

      <section className="bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">Code Example</h3>
         <pre className="text-xs text-gray-400 overflow-x-auto font-mono">
{`interface Downloader {
  download(id: string): void;
}

class RealDownloader implements Downloader {
  download(id) { 
    console.log("Downloading from internet...");
  }
}

class ProxyDownloader implements Downloader {
  private cache = {};
  private real: RealDownloader;

  download(id) {
    if (this.cache[id]) {
      return this.cache[id];
    }
    this.real = new RealDownloader();
    const data = this.real.download(id);
    this.cache[id] = data;
    return data;
  }
}`}
         </pre>
      </section>
    </div>
  );
};

export default ProxyGuide;
