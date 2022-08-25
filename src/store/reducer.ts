import {Reducer} from 'react';
import {Action, Store} from './Store.types';
import {cpa, distanceTo, TimeDistance} from 'geolocation-utils';
import {UserLocationChangeEvent} from 'react-native-maps/lib/MapView.types';
import {DEFAULT_STORE} from './DefaultStore';

const newLap = (state: Store) => ({
  ...state,
  path: [],
  maxSpeed: 0,
  minSpeed: -1,
  averageSpeed: 0,
  distance: 0,
  lap: (state.lap ?? 0) + 1,
  lapStartTime: Date.now(),
  laps: state.lap
    ? [
        {
          lapNumber: state.lap,
          path: state.path,
          distance: state.distance,
          maxSpeed: state.maxSpeed,
          minSpeed: state.minSpeed,
          averageSpeed: state.averageSpeed,
          startTime: state.lapStartTime,
          time: state.lapStartTime ? Date.now() - state.lapStartTime : 0,
        },
        ...state.laps,
      ]
    : state.laps,
});

const update = (
  state: Store,
  value?: UserLocationChangeEvent['nativeEvent']['coordinate'],
  cpaValue?: TimeDistance,
) => {
  const distanceToPrevCoords =
    state?.coords && value ? distanceTo(state.coords, value) : 0;
  const time = Date.now() - (state.lapStartTime ?? Date.now());
  const timeInSeconds = time / 1000;
  const distance = state.distance + distanceToPrevCoords;

  return {
    ...state,
    cpa: cpaValue,
    coords: value,
    curSpeed: value?.speed ?? 0,
    ...(state.lap
      ? {
          maxSpeed: Math.max(state.maxSpeed, value?.speed ?? 0),
          minSpeed:
            state.minSpeed === -1
              ? value?.speed ?? -1
              : Math.min(state.minSpeed, value?.speed ?? -1),
          averageSpeed: timeInSeconds > 0 ? distance / timeInSeconds : 0,
          path: [...state.path, value],
          distance,
        }
      : {}),
  };
};

export const reducer: Reducer<Store, Action> = (state, action) => {
  switch (action.type) {
    case 'set':
      return {...state, ...action.value};

    case 'watch':
      if (!action.value || !state.startPoint) {
        return state;
      }
      const cpaValue = cpa(
        {
          location: {
            latitude: action.value.latitude,
            longitude: action.value.longitude,
          },
          speed: action.value.speed,
          heading: action.value.heading,
        },
        {
          location: state.startPoint,
          speed: 0,
          heading: 0,
        },
      );

      const isAtStart =
        cpaValue.distance <= action.newLapAccuracy &&
        cpaValue.time <= 0 &&
        (state.cpa?.time ?? 0) > 0;

      if (isAtStart || action.newLap) {
        return update(newLap(state), action.value, cpaValue);
      }

      return update(state, action.value, cpaValue);

    case 'reset':
      return DEFAULT_STORE;

    default:
      return state;
  }
};
