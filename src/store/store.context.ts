import {createContext} from 'react';
import {Store} from './store.types';

export const StoreContext = createContext<Store>({
  endLap: () => {},
  setStartPoint: () => {},
  startLap: () => {},
  stop: () => {},
  update: () => {},
  laps: [],
  distance: 0,
  maxSpeed: 0,
  path: [],
});
