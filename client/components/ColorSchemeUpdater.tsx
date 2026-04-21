import { Fragment, useEffect, type ReactNode } from 'react';
import { Platform } from 'react-native';
import { Uniwind } from 'uniwind';
import { useTheme } from '@/contexts/ThemeContext';

const WebOnlyColorSchemeUpdater = function ({ children }: { children?: ReactNode }) {
  const { isDark } = useTheme();

  useEffect(() => {
    Uniwind.setTheme(isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    function handleMessage(e: MessageEvent<{ event: string; colorScheme: 'light' | 'dark' | null } | undefined>) {
      if (e.data?.event === 'coze.workbench.colorScheme') {
        const cs = e.data.colorScheme;
        if (cs === 'light' || cs === 'dark') {
          Uniwind.setTheme(cs);
        }
      }
    }

    if (Platform.OS === 'web') {
      window.addEventListener('message', handleMessage, false);
    }

    return () => {
      if (Platform.OS === 'web') {
        window.removeEventListener('message', handleMessage, false);
      }
    }
  }, []);

  return <Fragment>
    {children}
  </Fragment>
};

export {
  WebOnlyColorSchemeUpdater,
}
