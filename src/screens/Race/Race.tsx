import React, {FC, useCallback, useContext, useRef, useState} from 'react';
import {useNavigate} from 'react-router';
import MapView, {
  Marker,
  Polyline,
  UserLocationChangeEvent,
} from 'react-native-maps';

import styled from '@emotion/native';

// @ts-expect-error types
import startMarker from '../../images/start-marker.png';
import {StoreContext} from '../../store/Store.context';
import {Map} from '../../components';
import {Timer} from './components/Timer';
import {Speed} from './components/Speed';
import {Laps} from './components/Laps';
import {StopIcon} from '../../components/icons';

const MapContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Content = styled.View`
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
`;

const Info = styled.View`
  background: #313131;
  border-radius: 4px 4px 0 0;
  padding: 16px 20px;
  height: 30%;
  flex-grow: 0;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Lap = styled.Text`
  font-weight: 400;
  font-size: 32px;
  color: #fdfdfd;
`;

const Stop = styled.Pressable`
  background: #fff;
  border-radius: 32px;
  width: 64px;
  height: 64px;
  justify-content: center;
  align-items: center;
`;

export const Race: FC = () => {
  const {
    state: {settings, race},
    dispatch,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const [isInit, setInit] = useState(false);
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
      dispatch({type: 'watch', value: event.nativeEvent.coordinate});
    },
    [dispatch, isInit],
  );
  return (
    <>
      <MapContainer>
        <Map
          userLocationPriority={settings.accuracy}
          userLocationUpdateInterval={0}
          userLocationFastestInterval={0}
          showsUserLocation
          onUserLocationChange={watchSuccess}
          followsUserLocation
          innerRef={ref => {
            map.current = ref;
          }}>
          <Polyline
            strokeWidth={5}
            strokeColor="rgba(0,0,0,0.5)"
            coordinates={race.path.map(value => ({
              latitude: value?.latitude ?? 0,
              longitude: value?.longitude ?? 0,
            }))}
          />
          {race.startPoint ? (
            <Marker coordinate={race.startPoint} image={startMarker} />
          ) : null}
        </Map>
      </MapContainer>
      <Content>
        <Info>
          <InfoRow>
            <Lap>{race?.lap ? `Круг ${race.lap}` : 'Приготовьтесь'}</Lap>
            <Timer />
          </InfoRow>
          <InfoRow>
            <Speed />
          </InfoRow>
          <InfoRow>
            <Laps />
            <Stop
              onPress={() => {
                dispatch({type: 'reset'});
                navigate('/result');
              }}>
              <StopIcon />
            </Stop>
          </InfoRow>
        </Info>
      </Content>
    </>
  );
};
