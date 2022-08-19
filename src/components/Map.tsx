import React, {FC, LegacyRef, useEffect} from 'react';
import MapView, {MapViewProps} from 'react-native-maps';

import {hasLocationPermission} from '../utils';

export const Map: FC<
  MapViewProps & {innerRef?: LegacyRef<MapView> | undefined}
> = ({innerRef, ...props}) => {
  useEffect(() => {
    hasLocationPermission();
  }, []);

  return (
    <MapView
      style={{
        width: '100%',
        height: '100%',
        top: 0,
      }}
      ref={innerRef}
      {...props}
    />
  );
};
