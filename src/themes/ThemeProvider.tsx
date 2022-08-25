import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from '@emotion/react';

import {ThemeContext} from '../contexts';
import {useStoreKey} from '../hooks';
import {lightTheme} from './light';
import {darkTheme} from './dark';

export const AppThemeProvider: FC<PropsWithChildren> = ({children}) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const themeFromStore = useStoreKey<'light' | 'dark' | 'system'>('theme');
  const systemTheme = useColorScheme();

  useEffect(() => {
    setTheme(themeFromStore);
  }, [themeFromStore]);

  const selectedTheme = useMemo(() => {
    switch (theme) {
      case 'light':
        return lightTheme;
      case 'dark':
        return darkTheme;
      case 'system':
        return systemTheme === 'dark' ? darkTheme : lightTheme;
      default:
        return darkTheme;
    }
  }, [systemTheme, theme]);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
