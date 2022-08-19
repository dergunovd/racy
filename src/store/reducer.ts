import {Reducer} from 'react';
import {Action, Store} from './Store.types';
import {distanceTo} from 'geolocation-utils';
import {isSameCoords, msTokmh} from '../utils/geolocation';
import {UserLocationChangeEvent} from 'react-native-maps/lib/MapView.types';
import {DEFAULT_STORE} from './DefaultStore';

const start = (
  state: Store,
  value?: UserLocationChangeEvent['nativeEvent']['coordinate'],
): Store => ({
  ...state,
  race: {
    ...state.race,
    lap: (state.race?.lap ?? 0) + 1,
    coords: value,
    curSpeed: value?.speed ?? 0,
    maxSpeed: 0,
    minSpeed: -1,
    averageSpeed: 0,
    distance: 0,
    isStart: false,
    lapStartTime: Date.now(),
  },
});

const endLap = (state: Store) => ({
  ...state,
  race: {
    ...state.race,
    path: [],
    isStart: true,
    laps: [
      ...state.race.laps,
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
    ],
  },
});

const update = (
  state: Store,
  value?: UserLocationChangeEvent['nativeEvent']['coordinate'],
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
      coords: value,
      curSpeed: value?.speed ?? 0,
      maxSpeed: Math.max(state.race.maxSpeed, value?.speed ?? 0),
      minSpeed:
        state.race.minSpeed === -1
          ? value?.speed ?? -1
          : Math.min(state.race.minSpeed, value?.speed ?? -1),
      averageSpeed: timeInSeconds > 0 ? msTokmh(distance / timeInSeconds) : 0,
      path: [...state.race.path, value],
      distance,
    },
  };
};

export const reducer: Reducer<Store, Action> = (state, action) => {
  switch (action.type) {
    case 'set':
      return {...state, ...action.value};
    case 'watch':
      console.log('watch', action.value);
      const distanceToPrevCoords =
        state.race?.coords && action.value
          ? distanceTo(state.race?.coords, action.value)
          : 0;

      const isSameStartCoords =
        state.race.startPoint && action.value
          ? isSameCoords(
              state.race.startPoint,
              action.value,
              distanceToPrevCoords / 2 +
                action.value.accuracy +
                state.settings.newLapAccuracy,
            )
          : false;
      if (state.race.isStart && !isSameStartCoords) {
        return update(start(state, action.value), action.value);
      }

      if (!state.race.isStart && isSameStartCoords && state.race?.lap) {
        return endLap(state);
      }

      if (isSameStartCoords && !state.race?.lap) {
        return update(
          {
            ...state,
            race: {...state.race, isStart: true},
          },
          action.value,
        );
      }

      if ((state.race?.lap ?? 0) > 0) {
        return update(state, action.value);
      }

      return state;
    case 'reset':
      return {...state, race: DEFAULT_STORE.race};
    default:
      return state;
  }
};
