import React, {FC, useCallback, useContext, useRef, useState} from 'react';
import {useNavigate} from 'react-router';
import styled from '@emotion/native';

import {DropdownButton, Map, Picker} from '../components';
import {BurgerIcon, DropdownIcon} from '../components/icons';
import MapView, {
  LongPressEvent,
  MarkerAnimated,
  MarkerDragStartEndEvent,
  UserLocationChangeEvent,
} from 'react-native-maps';
import {ThemeContext} from '@emotion/react';
// @ts-expect-error types
import startMarker from '../images/start-marker.png';
import {StoreContext} from '../contexts';
import {useStoreKey} from '../hooks';
import {ITheme} from '../themes/Theme.interface';

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

const ButtonContainer = styled.View`
  padding: 20px;
  flex-direction: row;
  align-items: center;
`;

const Menu = styled.Pressable`
  padding: 12px;
  margin-right: 16px;
`;

export const Start: FC = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const theme = useContext(ThemeContext);
  const [isInit, setInit] = useState(false);
  const map = useRef<MapView | null>();
  const accuracy = useStoreKey('accuracy');

  const {state, dispatch} = useContext(StoreContext);

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
      dispatch({
        type: 'set',
        value: {preStartPoint: event.nativeEvent.coordinate},
      });
    },
    [dispatch, isInit],
  );

  const setStartPointHandler = useCallback(
    (event: LongPressEvent | MarkerDragStartEndEvent) => {
      dispatch({
        type: 'set',
        value: {...state, startPoint: event.nativeEvent.coordinate},
      });
    },
    [dispatch, state],
  );

  const toggleShow = useCallback(() => {
    setShowSettings(prev => !prev);
  }, []);

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
          onLongPress={setStartPointHandler}
          followsUserLocation
          innerRef={ref => {
            map.current = ref;
          }}>
          {state.startPoint ? (
            <MarkerAnimated
              draggable
              onDragEnd={setStartPointHandler}
              coordinate={state.startPoint}
              image={startMarker}
            />
          ) : null}
        </Map>
      </MapContainer>
      <Content>
        <ButtonContainer>
          <Menu onPress={() => navigate('/menu')}>
            <BurgerIcon fill={(theme as ITheme).accentColor} />
          </Menu>
          <DropdownButton
            buttonOnPress={() => navigate('/race')}
            iconOnPress={toggleShow}
            icon={<DropdownIcon fill={(theme as ITheme).bgColor} />}
            text={
              state.startPoint
                ? 'Старт в точке'
                : state.startAfter
                ? `Старт через ${state.startAfter}м`
                : 'Старт сейчас'
            }
          />
        </ButtonContainer>
        {showSettings ? (
          <Picker
            value={state.startAfter ?? 0}
            onPress={startAfter =>
              dispatch({
                type: 'set',
                value: {...state, startAfter},
              })
            }
            items={[0, 10, 15, 30, 50, 75, 100]}
          />
        ) : null}
      </Content>
    </>
  );
};
