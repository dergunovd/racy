import {createContext} from 'react';

type Theme = 'light' | 'dark' | 'system';

export const ThemeContext = createContext({
  theme: 'dark',
  setTheme: (_: Theme) => {
    console.log('default dispatch');
    /*void*/
  },
});
