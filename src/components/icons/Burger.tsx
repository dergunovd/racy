import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

export const BurgerIcon: FC = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M21 8H4V6H21V8Z"
      fill="#313131"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14 13H4V11H14V13Z"
      fill="#313131"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18 18H4V16H18V18Z"
      fill="#313131"
    />
  </Svg>
);
