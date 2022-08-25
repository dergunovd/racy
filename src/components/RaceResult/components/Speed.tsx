import React, {FC} from 'react';
import {numberWithSign, speedFormatter} from '../../../utils/formatters';
import {msTokmh} from '../../../utils/geolocation';
import styled from '@emotion/native/dist/emotion-native.cjs';
import {Lap} from '../../../store/Store.types';

const SpeedWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  margin-top: 24px;
  color: ${props => props.theme.accentColor50};
`;

const Min = styled.Text`
  font-weight: 400;
  font-size: 22px;
  opacity: 0.5;
  color: ${props => props.theme.accentColor};
`;

const Current = styled.Text`
  font-weight: 400;
  font-size: 32px;
  color: ${props => props.theme.accentColor};
`;

const Max = styled.Text`
  font-weight: 400;
  font-size: 22px;
  opacity: 0.5;
  color: ${props => props.theme.accentColor};
`;

const Delta = styled.Text`
  font-size: 12px;
  color: ${props =>
    +(props?.children ?? 0) < 0
      ? props.theme.negativeColor
      : props.theme.positiveColor};
  height: 22px;
  vertical-align: top;
`;

const Section = styled.View`
  margin-top: 12px;
  align-items: center;
`;

interface Props {
  bestLap?: Lap;
  lap: Lap;
}

export const Speed: FC<Props> = ({bestLap, lap}) => (
  <>
    <Title>Скорость</Title>

    <SpeedWrap>
      <Section>
        <Min>
          {lap.minSpeed >= 0 ? speedFormatter(msTokmh(lap.minSpeed)) : 0}
        </Min>
        {bestLap && (
          <Delta>
            {numberWithSign(
              +speedFormatter(msTokmh(lap.minSpeed - bestLap.minSpeed)),
            )}
          </Delta>
        )}
      </Section>
      <Section>
        <Current>
          {speedFormatter(msTokmh(lap.distance / lap.time))} км/ч
        </Current>
      </Section>
      <Section>
        <Max>{speedFormatter(msTokmh(lap.maxSpeed))}</Max>
        {bestLap && (
          <Delta>
            {numberWithSign(
              +speedFormatter(msTokmh(lap.maxSpeed - bestLap.maxSpeed)),
            )}
          </Delta>
        )}
      </Section>
    </SpeedWrap>
  </>
);
