import {StoreContext} from './store.context';
import {useStore} from './useStore';
import React, {FC, PropsWithChildren} from 'react';

interface Props extends PropsWithChildren<{}> {}

export const StoreContextProvider: FC<Props> = ({children}) => {
  const store = useStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
