import React, {FC} from 'react';
import styled from '@emotion/native';

import {HistoryRace} from '../../types';
import {dateFormatter, declOfNum} from '../../utils/formatters';
import {useNavigate} from 'react-router';

const Item = styled.Pressable`
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.accentColor50};
  padding: 12px 0;
`;
const Date = styled.Text`
  color: ${props => props.theme.accentColor50};
`;
const Laps = styled.Text`
  font-size: 24px;
  color: ${props => props.theme.accentColor};
`;

export const HistoryItem: FC<HistoryRace> = ({laps, date}) => {
  const navigate = useNavigate();

  return (
    <Item onPress={() => navigate(`/history/${date}`)}>
      <Laps>
        {laps.length} {declOfNum(laps.length, ['круг', 'круга', 'кругов'])}
      </Laps>
      <Date>{dateFormatter(date)}</Date>
    </Item>
  );
};
