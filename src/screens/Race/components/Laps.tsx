import React, {FC, useContext, useMemo} from 'react';
import styled from '@emotion/native';

import {StoreContext} from '../../../contexts';
import {timeFormatter} from '../../../utils/formatters';
import {getBestLap} from '../../../utils/race';

const Container = styled.ScrollView`
  margin-right: 24px;
  margin-top: 32px;
  flex-grow: 1;
`;
const Lap = styled.Text<{best: boolean}>`
  font-weight: 400;
  font-size: 18px;
  color: ${props =>
    props.best ? props.theme.positiveColor : props.theme.accentColor50};
  margin-bottom: 8px;
`;

export const Laps: FC = () => {
  const {state} = useContext(StoreContext);

  const bestTime = useMemo(() => getBestLap(state.laps)?.time, [state.laps]);

  return (
    <Container>
      {state.laps.map(({time, lapNumber}) => (
        <Lap best={time === bestTime} key={lapNumber}>
          круг {lapNumber} — {timeFormatter(time)}
        </Lap>
      ))}
    </Container>
  );
};
