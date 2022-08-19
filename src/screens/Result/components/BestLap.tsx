import React, {FC} from 'react';
import {View} from 'react-native';
import styled from '@emotion/native';

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

export const BestLap: FC = () => (
  <View>
    <Title>лучший круг — 5</Title>
    <Time>04:05.547</Time>
  </View>
);
