import React, {FC, useContext, useMemo} from 'react';
import styled from '@emotion/native';

import {StoreContext} from '../../../store/Store.context';
import {timeFormatter} from '../../../utils/formatters';
import {getBestLap} from '../../../utils/race';

const Container = styled.ScrollView`
  height: 80px;
  margin-right: 24px;
  margin-top: 32px;
`;
const Lap = styled.Text<{best: boolean}>`
  font-weight: 400;
  font-size: 18px;
  color: ${props => (props.best ? '#44DA37' : 'rgba(253, 253, 253, 0.5);')};
  margin-bottom: 8px;
`;

export const Laps: FC = () => {
  const {state} = useContext(StoreContext);

  const bestTime = useMemo(() => getBestLap(state.laps)?.time, [state.laps]);

  return (
    <Container>
      {state.laps.map(lap => (
        <Lap best={lap.time === bestTime} key={lap.lapNumber}>
          круг {lap.lapNumber} — {timeFormatter(lap.time)}
        </Lap>
      ))}
    </Container>
  );
};
