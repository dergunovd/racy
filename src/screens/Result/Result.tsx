import React, {FC, useContext, useMemo} from 'react';
import styled from '@emotion/native';

import {Laps} from '../Race/components/Laps';
import {BestLap} from './components/BestLap';
import {Button} from '../../components';
import {useNavigate} from 'react-router';
import {StoreContext} from '../../store/Store.context';
import {getBestLap} from '../../utils/race';

const Content = styled.ScrollView`
  background: #313131;
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
  color: #fdfdfd;
  opacity: 0.5;
`;

const ButtonWrap = styled.View`
  justify-self: flex-end;
  //align-self: flex-end;
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
