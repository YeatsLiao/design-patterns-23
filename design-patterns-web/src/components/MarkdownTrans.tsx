import { Trans } from 'react-i18next';

export const MarkdownTrans = ({ i18nKey }: { i18nKey: string }) => (
  <Trans
    i18nKey={i18nKey}
    components={{
      strong: <strong className="font-semibold text-gray-900 dark:text-white" />,
      code: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded text-sm font-mono" />
    }}
  />
);
