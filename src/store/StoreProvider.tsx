import React, {FC, PropsWithChildren, Reducer, useReducer} from 'react';
import {Action, Store} from './Store.types';
import {DEFAULT_STORE} from './DefaultStore';
import {StoreContext} from '../contexts';
import {reducer} from './reducer';

export const StoreProvider: FC<PropsWithChildren> = ({children}) => {
  const [state, dispatch] = useReducer<Reducer<Store, Action>>(
    reducer,
    DEFAULT_STORE,
  );

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  );
};
