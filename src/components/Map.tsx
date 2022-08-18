import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import MapView, {
  LatLng,
  LongPressEvent,
  MarkerAnimated,
  MarkerDragStartEndEvent,
  UserLocationChangeEvent,
} from 'react-native-maps';

// @ts-expect-error types
import startMarker from '../images/start-marker.png';
import {hasLocationPermission} from '../utils';

export const Map: FC = () => {
  const [isInit, setInit] = useState(false);
  const [startPoint, setStartPoint] = useState<LatLng>();
  const map = useRef<MapView | null>();

  const watchSuccess = useCallback(
    (event: UserLocationChangeEvent) => {
      if (!isInit) {
        map.current?.setCamera({
          center: event.nativeEvent.coordinate,
          heading: 0,
          altitude: event.nativeEvent.coordinate?.altitude ?? 0,
          zoom: 15,
          pitch: 0,
        });
        setInit(true);
      }
      // update(event.nativeEvent.coordinate);
    },
    [isInit],
  );
  useEffect(() => {
    hasLocationPermission();
  }, []);

  const setStartPointHandler = useCallback(
    (event: LongPressEvent | MarkerDragStartEndEvent) => {
      console.log(event.nativeEvent);
      setStartPoint(event.nativeEvent.coordinate);
    },
    [],
  );

  return (
    <MapView
      userLocationPriority="high"
      userLocationUpdateInterval={0}
      userLocationFastestInterval={0}
      showsUserLocation
      onUserLocationChange={watchSuccess}
      onLongPress={setStartPointHandler}
      style={{
        width: '100%',
        height: '100%',
        top: 0,
      }}
      followsUserLocation
      ref={ref => {
        map.current = ref;
      }}>
      {startPoint ? (
        <MarkerAnimated
          draggable
          onDragEnd={setStartPointHandler}
          coordinate={startPoint}
          image={startMarker}
        />
      ) : null}
    </MapView>
  );
};
