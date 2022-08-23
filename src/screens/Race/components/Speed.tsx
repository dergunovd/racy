import React, {FC, useContext, useMemo} from 'react';
import styled from '@emotion/native';

import {StoreContext} from '../../../contexts';
import {msTokmh} from '../../../utils/geolocation';
import {numberWithSign, speedFormatter} from '../../../utils/formatters';
import {getBestLap} from '../../../utils/race';

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
      : props.theme.accentColor50};
  height: 22px;
  vertical-align: top;
`;

const Section = styled.View`
  margin-top: 12px;
  align-items: center;
`;

export const Speed: FC = () => {
  const {state} = useContext(StoreContext);

  const bestLap = useMemo(() => getBestLap(state.laps), [state.laps]);

  return (
    <>
      <Section>
        <Min>
          {state.minSpeed >= 0 ? speedFormatter(msTokmh(state.minSpeed)) : 0}
        </Min>
        {bestLap && (
          <Delta>
            {numberWithSign(
              +speedFormatter(msTokmh(state.minSpeed - bestLap.minSpeed)),
            )}
          </Delta>
        )}
      </Section>
      <Section>
        <Current>{speedFormatter(msTokmh(state.curSpeed))} км/ч</Current>
      </Section>
      <Section>
        <Max>{speedFormatter(msTokmh(state.maxSpeed))}</Max>
        {bestLap && (
          <Delta>
            {numberWithSign(
              +speedFormatter(msTokmh(state.maxSpeed - bestLap.maxSpeed)),
            )}
          </Delta>
        )}
      </Section>
    </>
  );
};
