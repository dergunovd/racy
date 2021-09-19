import {EventUserLocation, LatLng} from 'react-native-maps';
import {insideCircle} from 'geolocation-utils';

export const isSameCoords = (
  first?: LatLng,
  second?: EventUserLocation['nativeEvent']['coordinate'],
) =>
  (!second && !first) ||
  (second && first && insideCircle(first, second, second.accuracy));

export const msTokmh = (value: number) => value * 3.6;
