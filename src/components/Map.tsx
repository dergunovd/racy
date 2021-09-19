import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import MapView, {
  EventUserLocation,
  MapEvent,
  Marker,
  MarkerAnimated,
  Polyline,
} from 'react-native-maps';
import {StoreContext} from '../store';
import {hasLocationPermission} from '../utils/hasLocationPermission';

export const Map: FC = () => {
  const {update, startPoint, setStartPoint, path, coords} =
    useContext(StoreContext);

  const [isInit, setInit] = useState(false);
  const map = useRef<MapView | null>();

  const watchSuccess = useCallback(
    (event: EventUserLocation) => {
      if (!isInit) {
        map.current?.setCamera({
          center: event.nativeEvent.coordinate,
          heading: 0,
          altitude: event.nativeEvent.coordinate.altitude ?? 0,
          zoom: 15,
          pitch: 0,
        });
        setInit(true);
      }
      update(event.nativeEvent.coordinate);
    },
    [isInit, update],
  );
  useEffect(() => {
    hasLocationPermission();
  }, []);

  const setStartPointHandler = (event: MapEvent) => {
    setStartPoint(event.nativeEvent.coordinate);
  };

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
        />
      ) : null}

      <Polyline coordinates={path} />
      {coords?.latitude && coords?.longitude ? (
        <Marker
          pinColor="#44FF9E"
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
        />
      ) : null}
    </MapView>
  );
};
