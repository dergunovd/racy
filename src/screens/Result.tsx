import React, {FC, useContext} from 'react';
import {useNavigate} from 'react-router';
import styled from '@emotion/native';

import {Button} from '../components';
import {StoreContext} from '../contexts';
import {RaceResult} from '../components/RaceResult';

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

export const Result: FC = () => {
  const {state} = useContext(StoreContext);
  const navigate = useNavigate();
  const {dispatch} = useContext(StoreContext);

  return (
    <Content>
      <Finish>Финиш!</Finish>

      <RaceResult startPoint={state.startPoint} laps={state.laps} />

      <Button
        onPress={() => {
          dispatch({type: 'reset'});

          navigate('/');
        }}>
        На главный экран
      </Button>
    </Content>
  );
};
