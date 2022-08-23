import React, {FC, useContext} from 'react';
import {useNavigate} from 'react-router';
import styled from '@emotion/native';

import {Laps} from '../Race/components';
import {BestLap} from './components/BestLap';
import {Button} from '../../components';
import {StoreContext} from '../../contexts';

const Content = styled.ScrollView`
  background: ${props => props.theme.bgColor};
  padding: 16px 20px;
  width: 100%;
  height: 100%;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Finish = styled.Text`
  font-style: italic;
  font-weight: 400;
  font-size: 32px;
  color: ${props => props.theme.accentColor50};
  opacity: 0.5;
`;

const ButtonWrap = styled.View`
  justify-self: flex-end;
`;

export const Result: FC = () => {
  const navigate = useNavigate();
  const {dispatch} = useContext(StoreContext);

  return (
    <Content>
      <Row>
        <Finish>Финиш!</Finish>
      </Row>
      <Row>
        <BestLap />
      </Row>
      <Row>
        <Laps />
      </Row>
      <ButtonWrap>
        <Button
          onPress={() => {
            dispatch({type: 'reset'});

            navigate('/');
          }}>
          На главный экран
        </Button>
      </ButtonWrap>
    </Content>
  );
};
