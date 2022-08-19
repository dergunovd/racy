import {Store} from './Store.types';

export const DEFAULT_STORE: Store = {
  settings: {
    theme: 'system',
    accuracy: 'balanced',
    newLapAccuracy: 5,
  },
  race: {
    startAfter: 10,
    curSpeed: 0,
    path: [],
    maxSpeed: 0,
    minSpeed: -1,
    lap: 0,
    startPoint: {latitude: 0, longitude: 0},
    distance: 0,
    averageSpeed: 0,
    coords: {latitude: 0, longitude: 0},
    isStart: false,
    laps: [],
  },
};
