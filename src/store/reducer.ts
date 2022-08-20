import {Reducer} from 'react';
import {Action, Store} from './Store.types';
import {cpa, distanceTo, TimeDistance} from 'geolocation-utils';
import {UserLocationChangeEvent} from 'react-native-maps/lib/MapView.types';
import {DEFAULT_STORE} from './DefaultStore';

const newLap = (state: Store) => ({
  ...state,
  race: {
    ...state.race,
    path: [],
    maxSpeed: 0,
    minSpeed: -1,
    averageSpeed: 0,
    distance: 0,
    lap: (state.race.lap ?? 0) + 1,
    lapStartTime: Date.now(),
    laps: state.race.lap
      ? [
          {
            lapNumber: state.race.lap,
            path: state.race.path,
            distance: state.race.distance,
            maxSpeed: state.race.maxSpeed,
            minSpeed: state.race.minSpeed,
            averageSpeed: state.race.averageSpeed,
            startTime: state.race.lapStartTime,
            time: state.race.lapStartTime
              ? Date.now() - state.race.lapStartTime
              : 0,
          },
          ...state.race.laps,
        ]
      : state.race.laps,
  },
});

const update = (
  state: Store,
  value?: UserLocationChangeEvent['nativeEvent']['coordinate'],
  cpaValue?: TimeDistance,
) => {
  const distanceToPrevCoords =
    state.race?.coords && value ? distanceTo(state.race?.coords, value) : 0;
  const time = Date.now() - (state.race.lapStartTime ?? Date.now());
  const timeInSeconds = time / 1000;
  const distance = state.race.distance + distanceToPrevCoords;

  return {
    ...state,
    race: {
      ...state.race,
      cpa: cpaValue,
      coords: value,
      curSpeed: value?.speed ?? 0,
      ...(state.race.lap
        ? {
            maxSpeed: Math.max(state.race.maxSpeed, value?.speed ?? 0),
            minSpeed:
              state.race.minSpeed === -1
                ? value?.speed ?? -1
                : Math.min(state.race.minSpeed, value?.speed ?? -1),
            averageSpeed: timeInSeconds > 0 ? distance / timeInSeconds : 0,
            path: [...state.race.path, value],
            distance,
          }
        : {}),
    },
  };
};

export const reducer: Reducer<Store, Action> = (state, action) => {
  switch (action.type) {
    case 'set':
      return {...state, ...action.value};

    case 'watch':
      if (!action.value || !state.race.startPoint) {
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
          location: state.race.startPoint,
          speed: 0,
          heading: 0,
        },
      );

      const isAtStart =
        cpaValue.distance <= state.settings.newLapAccuracy &&
        cpaValue.time <= 0 &&
        (state.race.cpa?.time ?? 0) > 0;

      if (isAtStart) {
        return update(newLap(state), action.value, cpaValue);
      }

      return update(state, action.value, cpaValue);

    case 'reset':
      return {...state, race: DEFAULT_STORE.race};

    default:
      return state;
  }
};
