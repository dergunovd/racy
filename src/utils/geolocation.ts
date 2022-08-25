import {insideCircle} from 'geolocation-utils';
import {LatLng} from 'react-native-maps';

export const isSameCoords = (
  first: LatLng,
  second: LatLng,
  accuracy?: number,
) =>
  (!second && !first) ||
  (second && first && insideCircle(first, second, accuracy ?? 0));

export const msTokmh = (value: number) => value * 3.6;
