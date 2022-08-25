import {LatLng} from 'react-native-maps';
import {UserLocationChangeEvent} from 'react-native-maps/lib/MapView.types';
import {TimeDistance} from 'geolocation-utils';

export interface Lap {
  lapNumber: number;
  path: UserLocationChangeEvent['nativeEvent']['coordinate'][];
  distance: number;
  maxSpeed: number;
  minSpeed: number;
  averageSpeed: number;
  startTime?: number;
  time: number;
}
export interface Store {
  startPoint?: LatLng;
  preStartPoint?: LatLng;
  startAfter?: number;
  lap?: number;
  lapStartTime?: number;
  curSpeed: number;
  path: UserLocationChangeEvent['nativeEvent']['coordinate'][];
  maxSpeed: number;
  minSpeed: number;
  averageSpeed: number;
  distance: number;
  coords?: LatLng;
  laps: Lap[];
  cpa?: TimeDistance;
}

export type Action =
  | {
      type: 'set';
      value?: Partial<Store>;
    }
  | {
      type: 'watch';
      value: UserLocationChangeEvent['nativeEvent']['coordinate'];
      newLapAccuracy: number;
      newLap?: boolean;
    }
  | {type: 'reset'};
