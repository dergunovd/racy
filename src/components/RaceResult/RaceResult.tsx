import React, {FC} from 'react';
import styled from '@emotion/native';

import {BestLap, Laps} from './components';
import {Store} from '../../store/Store.types';

const Content = styled.View`
  background: ${props => props.theme.bgColor};
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
`;

interface Props extends Pick<Store, 'laps' | 'startPoint'> {}

export const RaceResult: FC<Props> = ({laps, startPoint}) => (
  <Content>
    <BestLap laps={laps} />
    <Laps laps={laps} startPoint={startPoint} />
  </Content>
);
