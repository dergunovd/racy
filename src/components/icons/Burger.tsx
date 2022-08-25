import React, {FC} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const BurgerIcon: FC<SvgProps> = ({fill, ...props}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M21 8H4V6H21V8Z"
      fill={fill}
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14 13H4V11H14V13Z"
      fill={fill}
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18 18H4V16H18V18Z"
      fill={fill}
    />
  </Svg>
);
