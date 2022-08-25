import '@emotion/react';
import {ITheme} from './Theme.interface';

declare module '@emotion/react' {
  export interface Theme extends ITheme {}
}
