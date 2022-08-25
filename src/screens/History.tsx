import React, {FC, useMemo} from 'react';
import {useNavigate, useParams} from 'react-router';
import styled from '@emotion/native';

import {Button} from '../components';
import {RaceResult} from '../components/RaceResult';
import {useStoreKey} from '../hooks';
import {HistoryRace} from '../types';
import {dateFormatter} from '../utils/formatters';

const Content = styled.View`
  background: ${props => props.theme.bgColor};
  padding: 16px 20px;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const Finish = styled.Text`
  font-style: italic;
  font-weight: 400;
  font-size: 32px;
  color: ${props => props.theme.accentColor50};
  opacity: 0.5;
`;

export const History: FC = () => {
  const {date} = useParams<{date?: string}>();
  const races = useStoreKey<Array<HistoryRace>>('races', []);
  const race = useMemo(
    () => races?.find(r => r.date === +(date ?? 0)),
    [date, races],
  );

  const navigate = useNavigate();

  return (
    <Content>
      <Finish>{dateFormatter(race?.date)}</Finish>

      <RaceResult startPoint={race?.startPoint} laps={race?.laps ?? []} />

      <Button onPress={() => navigate('/history')}>Назад</Button>
    </Content>
  );
};
