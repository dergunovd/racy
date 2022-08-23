import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {ThemeContext} from '../contexts';
import {useStoreKey} from '../hooks';
import {ThemeProvider} from '@emotion/react';
import {lightTheme} from './light';
import {darkTheme} from './dark';

export const AppThemeProvider: FC<PropsWithChildren> = ({children}) => {
  const [theme, setTheme] = useState('dark');
  const themeFromStore = useStoreKey('theme');

  useEffect(() => {
    setTheme(themeFromStore);
  }, [themeFromStore]);

  const selectedTheme = useMemo(() => {
    switch (theme) {
      case 'light':
        return lightTheme;
      case 'dark':
        return darkTheme;
      // TODO: get system theme
      case 'system':
      default:
        return darkTheme;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
