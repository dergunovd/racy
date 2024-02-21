import React, {FC} from 'react';
import {useNavigate} from 'react-router';
import styled from '@emotion/native';

import {Button} from '../../components';
import {useStoreKey} from '../../hooks';
import {HistoryRace} from '../../types';
import {HistoryItem} from './HistoryItem';

const Body = styled.View`
  background-color: ${props => props.theme.bgColor};
  height: 100%;
  padding: 24px;
`;

const Title = styled.Text`
  font-weight: 400;
  font-size: 32px;
  color: ${props => props.theme.accentColor};
`;
const Laps = styled.ScrollView`
  flex-grow: 1;
`;

export const HistoryList: FC = () => {
  const navigate = useNavigate();
  const races = useStoreKey<Array<HistoryRace>>('races', []);

  return (
    <Body>
      <Title>История заездов</Title>
      <Laps>
        {races?.reverse().map(race => (
          <HistoryItem key={race.date} {...race} />
        ))}
      </Laps>

      <Button onPress={() => navigate('/menu')}>Назад</Button>
    </Body>
  );
};
