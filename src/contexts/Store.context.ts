import {createContext} from 'react';
import {DEFAULT_STORE} from '../store/DefaultStore';
import {Action} from '../store/Store.types';

export const StoreContext = createContext({
  state: DEFAULT_STORE,
  dispatch: (_: Action) => {
    console.log('default dispatch');
    /*void*/
  },
});
