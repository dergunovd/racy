import {EventUserLocation, LatLng} from 'react-native-maps';

export interface LapTotal {
  maxSpeed: number;
  avgSpeed: number;
  time: number;
  distance: number;
}

export interface Store {
  startLap: () => void;
  endLap: () => void;
  stop: () => void;
  update: (_: EventUserLocation['nativeEvent']['coordinate']) => void;
  startPoint?: LatLng;
  setStartPoint: (_: LatLng) => void;
  maxSpeed: number;
  curSpeed?: number;
  lapStartTime?: number;
  distance: number;
  coords?: LatLng;
  path: LatLng[];
  laps: LapTotal[];
}
