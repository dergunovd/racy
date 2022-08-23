import React, {FC, useContext, useMemo} from 'react';
import {View} from 'react-native';
import styled from '@emotion/native';

import {StoreContext} from '../../../store/Store.context';
import {getBestLap} from '../../../utils/race';
import {timeFormatter} from '../../../utils/formatters';

const Title = styled.Text`
  font-weight: 400;
  font-size: 32px;
  color: #fdfdfd;
`;

const Time = styled.Text`
  font-weight: 400;
  font-size: 32px;
  color: #44da37;
`;

export const BestLap: FC = () => {
  const {state} = useContext(StoreContext);

  const bestLap = useMemo(() => getBestLap(state.laps), [state.laps]);

  return (
    <View>
      <Title>лучший круг — {bestLap?.lapNumber}</Title>
      <Time>{timeFormatter(bestLap?.time)}</Time>
    </View>
  );
};
