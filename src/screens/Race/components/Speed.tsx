import React, {FC, useContext, useMemo} from 'react';
import styled from '@emotion/native';
import {StoreContext} from '../../../store/Store.context';
import {msTokmh} from '../../../utils/geolocation';
import {numberWithSign, speedFormatter} from '../../../utils/formatters';
import {getBestLap} from '../../../utils/race';

const Min = styled.Text`
  font-weight: 400;
  font-size: 22px;
  opacity: 0.5;
`;
const Average = styled.Text`
  font-weight: 400;
  font-size: 32px;
`;
const Max = styled.Text`
  font-weight: 400;
  font-size: 22px;
  opacity: 0.5;
`;
const Delta = styled.Text<{big?: boolean}>`
  font-size: ${props => (props.big ? '18px' : '12px')};
  color: ${props => (+(props?.children ?? 0) < 0 ? '#f53d3d' : '#44DA37')};
  height: 22px;
  vertical-align: top;
`;
const Section = styled.View`
  margin-top: 12px;
  align-items: center;
`;

export const Speed: FC = () => {
  const {
    state: {race},
  } = useContext(StoreContext);

  const bestLap = useMemo(() => getBestLap(race.laps), [race.laps]);

  return (
    <>
      <Section>
        <Min>{speedFormatter(msTokmh(race.minSpeed))}</Min>
        {bestLap && (
          <Delta>
            {numberWithSign(
              +speedFormatter(msTokmh(race.minSpeed - bestLap.minSpeed)),
            )}
          </Delta>
        )}
      </Section>
      <Section>
        <Average>{speedFormatter(msTokmh(race.averageSpeed))} км/ч</Average>
        {bestLap && (
          <Delta big>
            {numberWithSign(
              +speedFormatter(
                msTokmh(race.averageSpeed - bestLap.averageSpeed),
              ),
            )}
          </Delta>
        )}
      </Section>
      <Section>
        <Max>{speedFormatter(msTokmh(race.maxSpeed))}</Max>
        {bestLap && (
          <Delta>
            {numberWithSign(
              +speedFormatter(msTokmh(race.maxSpeed - bestLap.maxSpeed)),
            )}
          </Delta>
        )}
      </Section>
    </>
  );
};
