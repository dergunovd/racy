import React, {
  FC,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Pressable} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import styled from '@emotion/native';
import {ThemeContext} from '@emotion/react';

import {Map} from '../../../components';
import {StoreContext} from '../../../contexts';
import {getBestLap} from '../../../utils/race';
import {timeFormatter} from '../../../utils/formatters';
import {Speed} from './Speed';
import {ITheme} from '../../../themes/Theme.interface';
// @ts-expect-error types
import startMarker from '../../../images/start-marker.png';
import {Store} from '../../../store/Store.types';
import {getPercentageValue} from '../../../utils/utils';
import {colorFromRGB, getGradientColor} from '../../../utils/color';

const Container = styled.ScrollView`
  margin-top: 32px;
  flex-grow: 1;
`;
const Lap = styled.View`
  padding: 4px;
  border-bottom-color: ${props => props.theme.accentColor50};
  border-bottom-width: 1px;
`;

const LapTime = styled.Text<{best: boolean}>`
  font-weight: 400;
  font-size: 18px;
  color: ${props =>
    props.best ? props.theme.positiveColor : props.theme.accentColor50};
`;

const TimeDelta = styled.Text<{best: boolean}>`
  font-weight: 400;
  font-size: 18px;
  color: ${props =>
    props.best ? props.theme.accentColor50 : props.theme.negativeColor};
`;

const MapWrap = styled.View`
  height: 350px;
  border-radius: 4px;
`;

const LapInfo = styled.View`
  flex-grow: 1;
`;

interface Props extends Pick<Store, 'laps' | 'startPoint'> {}

export const Laps: FC<Props> = ({laps, startPoint}) => {
  const [selectedLap, setSelectedLap] = useState<number>();
  const bestLap = useMemo(() => getBestLap(laps), [laps]);
  const map = useRef<MapView | null>();
  const theme = useContext(ThemeContext);
  const getLines = useCallback(
    (lap: Store['path']) =>
      lap
        .map((value, index, array) => {
          if (!index) {
            return null;
          }
          return [array[index - 1], value];
        })
        .filter(line => line),
    [],
  );

  return (
    <Container>
      {laps.map(lap => (
        <Lap key={lap.lapNumber}>
          <Pressable
            onPress={() => {
              setSelectedLap(lap.lapNumber === selectedLap ? 0 : lap.lapNumber);
            }}>
            <LapTime best={lap.time === bestLap?.time}>
              круг {lap.lapNumber} — {timeFormatter(lap.time)}{' '}
              {lap.lapNumber === selectedLap && (
                <TimeDelta best={lap.time === bestLap?.time}>
                  +{timeFormatter(lap.time - (bestLap?.time ?? lap.time))}
                </TimeDelta>
              )}
            </LapTime>
          </Pressable>
          <LapInfo>
            {lap.lapNumber === selectedLap && (
              <>
                <Speed bestLap={bestLap} lap={lap} />

                <MapWrap>
                  <Map
                    customMapStyle={(theme as ITheme).mapStyle}
                    camera={
                      startPoint
                        ? {
                            center: startPoint,
                            zoom: 15,
                            heading: 0,
                            pitch: 0,
                          }
                        : undefined
                    }
                    innerRef={ref => {
                      map.current = ref;
                    }}>
                    {getLines(lap.path).map((line, index) => (
                      <Polyline
                        key={index}
                        strokeWidth={5}
                        strokeColor={colorFromRGB(
                          getGradientColor(
                            [0, 255, 0],
                            [255, 0, 0],
                            getPercentageValue(
                              lap.minSpeed,
                              lap.maxSpeed,
                              line?.[0]?.speed ?? 0,
                            ),
                          ),
                        )}
                        coordinates={
                          line?.map(l => ({
                            latitude: l?.latitude ?? 0,
                            longitude: l?.longitude ?? 0,
                          })) ?? []
                        }
                      />
                    ))}
                    {startPoint ? (
                      <Marker coordinate={startPoint} image={startMarker} />
                    ) : null}
                  </Map>
                </MapWrap>
              </>
            )}
          </LapInfo>
        </Lap>
      ))}
    </Container>
  );
};
