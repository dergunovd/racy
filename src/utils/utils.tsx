import {LatLng} from 'react-native-maps';
import {insideCircle} from 'geolocation-utils';

export const isSameCoords = (
  first: LatLng,
  second: LatLng,
  accuracy?: number,
) =>
  (!second && !first) ||
  (second && first && insideCircle(first, second, accuracy ?? 0));

export const msTokmh = (value: number) => value * 3.6;
