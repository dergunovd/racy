import React, {FC, useCallback, useContext, useRef, useState} from 'react';
import {useNavigate} from 'react-router';
import MapView, {
  Marker,
  Polyline,
  UserLocationChangeEvent,
} from 'react-native-maps';
import {distanceTo} from 'geolocation-utils';

import styled from '@emotion/native';

// @ts-expect-error types
import startMarker from '../../images/start-marker.png';
import {StoreContext} from '../../contexts';
import {Map} from '../../components';
import {StopIcon} from '../../components/icons';
import {Laps, Speed, Timer} from './components';
import {useStoreKey} from '../../hooks';
import {ITheme} from '../../themes/Theme.interface';
import {ThemeContext} from '@emotion/react';

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
  background: ${props => props.theme.bgColor};
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
  color: ${props => props.theme.accentColor};
`;

const Stop = styled.Pressable`
  background: ${props => props.theme.accentColor};
  border-radius: 32px;
  width: 64px;
  height: 64px;
  justify-content: center;
  align-items: center;
`;

export const Race: FC = () => {
  const {state, dispatch} = useContext(StoreContext);
  const navigate = useNavigate();

  const [isInit, setInit] = useState(false);
  const map = useRef<MapView | null>();
  const accuracy = useStoreKey('accuracy');
  const newLapAccuracy = useStoreKey('newLapAccuracy');
  const theme = useContext(ThemeContext);

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
      const shouldSetStartPoint =
        !state.startPoint &&
        state.preStartPoint &&
        event.nativeEvent.coordinate &&
        distanceTo(state.preStartPoint, event.nativeEvent.coordinate) >=
          +(state.startAfter ?? 0);

      if (shouldSetStartPoint) {
        dispatch({
          type: 'set',
          value: {startPoint: event.nativeEvent.coordinate},
        });
      }
      dispatch({
        type: 'watch',
        value: event.nativeEvent.coordinate,
        newLapAccuracy,
        newLap: shouldSetStartPoint,
      });
    },
    [
      dispatch,
      isInit,
      newLapAccuracy,
      state.preStartPoint,
      state.startAfter,
      state.startPoint,
    ],
  );

  return (
    <>
      <MapContainer>
        <Map
          customMapStyle={(theme as ITheme).mapStyle}
          userLocationPriority={accuracy}
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
            strokeColor={(theme as ITheme).accentColor50}
            coordinates={state.path.map(value => ({
              latitude: value?.latitude ?? 0,
              longitude: value?.longitude ?? 0,
            }))}
          />
          {state.startPoint ? (
            <Marker coordinate={state.startPoint} image={startMarker} />
          ) : null}
        </Map>
      </MapContainer>
      <Content>
        <Info>
          <InfoRow>
            <Lap>{state?.lap ? `Круг ${state.lap}` : 'Приготовьтесь'}</Lap>
            <Timer />
          </InfoRow>
          <InfoRow>
            <Speed />
          </InfoRow>
          <InfoRow>
            <Laps />
            <Stop onPress={() => navigate('/result', {replace: true})}>
              <StopIcon />
            </Stop>
          </InfoRow>
        </Info>
      </Content>
    </>
  );
};
