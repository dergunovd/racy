import {MapStyleElement} from 'react-native-maps';

export interface ITheme {
  accentColor: string;
  accentColor50: string;
  bgColor: string;
  bgColor50: string;
  positiveColor: string;
  negativeColor: string;
  mapStyle: MapStyleElement[];
}
