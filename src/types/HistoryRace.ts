import {LatLng} from 'react-native-maps';
import {Lap} from '../store/Store.types';

export interface HistoryRace {
  date: number;
  startPoint: LatLng;
  laps: Lap[];
}
