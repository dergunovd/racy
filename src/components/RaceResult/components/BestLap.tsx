import React, {FC, useContext, useMemo} from 'react';
import {View} from 'react-native';
import styled from '@emotion/native';

import {StoreContext} from '../../../contexts';
import {getBestLap} from '../../../utils/race';
import {timeFormatter} from '../../../utils/formatters';
import {Lap, Store} from '../../../store/Store.types';

const Title = styled.Text`
  font-weight: 400;
  font-size: 32px;
  color: ${props => props.theme.accentColor};
`;

const Time = styled.Text`
  font-weight: 400;
  font-size: 32px;
  color: ${props => props.theme.positiveColor};
`;

interface Props {
  laps: Store['laps'];
}

export const BestLap: FC<Props> = ({laps}) => {
  const bestLap = useMemo(() => getBestLap(laps), [laps]);

  return (
    <View>
      <Title>лучший круг — {bestLap?.lapNumber}</Title>
      <Time>{timeFormatter(bestLap?.time)}</Time>
    </View>
  );
};
