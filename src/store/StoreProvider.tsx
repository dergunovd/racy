import React, {FC, PropsWithChildren, Reducer, useReducer} from 'react';
import {Action, Store} from './Store.types';
import {DEFAULT_STORE} from './DefaultStore';
import {StoreContext} from './Store.context';

const reducer: Reducer<Store, Action> = (state, action) => {
  console.log('reducer', state, action);
  if (action.type === 'set') {
    return {...state, ...action.value};
  }
  return state;
};

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
