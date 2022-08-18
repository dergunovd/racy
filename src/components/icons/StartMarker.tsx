import React, {FC} from 'react';
import Svg, {Rect} from 'react-native-svg';

export const StartMarkerIcon: FC = () => (
  <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <Rect x="1.33334" y="1.33331" width="10" height="10" fill="#FDFDFD" />
    <Rect x="11.3333" y="1.33331" width="9.33333" height="10" fill="#313131" />
    <Rect x="20.6667" y="1.33331" width="10" height="10" fill="#FDFDFD" />
    <Rect x="1.33334" y="11.3333" width="10" height="9.33333" fill="#313131" />
    <Rect
      x="11.3333"
      y="11.3333"
      width="9.33333"
      height="9.33333"
      fill="#FDFDFD"
    />
    <Rect x="20.6667" y="11.3333" width="10" height="9.33333" fill="#313131" />
    <Rect x="1.33334" y="20.6667" width="10" height="10" fill="#FDFDFD" />
    <Rect x="11.3333" y="20.6667" width="9.33333" height="10" fill="#313131" />
    <Rect x="20.6667" y="20.6667" width="10" height="10" fill="#FDFDFD" />
    <Rect
      x="1"
      y="1"
      width="30"
      height="30"
      rx="15"
      stroke="#313131"
      stroke-width="2"
    />
  </Svg>
);
