import React, {FC} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const DropdownIcon: FC<SvgProps> = ({fill, ...props}) => (
  <Svg width="16" height="10" viewBox="0 0 16 10" fill="none" {...props}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0.292908 1.70712L1.70712 0.292908L8.00001 6.5858L14.2929 0.292908L15.7071 1.70712L8.00001 9.41423L0.292908 1.70712Z"
      fill={fill}
    />
  </Svg>
);
