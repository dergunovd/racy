import {Lap} from '../store/Store.types';

export const getBestLap = (laps: Lap[]): Lap | undefined => {
  const minTime = Math.min(...laps.map(({time}) => time));
  return laps.find(({time}) => time === minTime);
};
