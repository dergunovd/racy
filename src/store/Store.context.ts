import {createContext} from 'react';
import {DEFAULT_STORE} from './DefaultStore';
import {Action} from './Store.types';

export const StoreContext = createContext({
  state: DEFAULT_STORE,
  dispatch: (_: Action) => {
    console.log('default dispatch');
    /*void*/
  },
});
