import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

const ProxyGuide = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-8 max-w-3xl">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('common.concept')}</h2>
        <p className="text-gray-700 dark:text-gray-300">
          <Trans i18nKey="proxy.concept.definition" components={{ strong: <strong />, code: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded" /> }} />
        </p>
        <div className="text-gray-700 dark:text-gray-300 mt-2">
          <Trans i18nKey="proxy.concept.analogy" components={{ strong: <strong />, code: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded" />, ul: <ul className="list-disc list-inside mt-2 ml-2" />, li: <li /> }} />
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-950 rounded-lg p-4 border border-gray-800">
         <h3 className="text-blue-400 font-semibold mb-2">{t('common.codeExample')}</h3>
         <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto font-mono">
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
