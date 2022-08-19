import React, {FC, useContext} from 'react';
import styled from '@emotion/native';
import {StoreContext} from '../../../store/Store.context';
import {msTokmh} from '../../../utils/geolocation';
import {speedFormatter} from '../../../utils/formatters';

const Min = styled.Text`
  font-weight: 400;
  font-size: 22px;
  opacity: 0.5;
`;
const Average = styled.Text`
  font-weight: 400;
  font-size: 32px;
`;
const Max = styled.Text`
  font-weight: 400;
  font-size: 22px;
  opacity: 0.5;
`;
const Delta = styled.Text<{big?: boolean}>`
  font-size: ${props => (props.big ? '18px' : '12px')};
  color: ${props => (+(props?.children ?? 0) < 0 ? '#f53d3d' : '#44DA37')};
  height: 22px;
  vertical-align: top;
`;
const Section = styled.View`
  margin-top: 12px;
  align-items: center;
`;

export const Speed: FC = () => {
  const {
    state: {race},
  } = useContext(StoreContext);
  return (
    <>
      <Section>
        <Min>{speedFormatter(msTokmh(race.minSpeed))}</Min>
        <Delta>+0.2</Delta>
      </Section>
      <Section>
        <Average>{speedFormatter(msTokmh(race.curSpeed))} км/ч</Average>
        <Delta big>-0.8</Delta>
      </Section>
      <Section>
        <Max>{speedFormatter(msTokmh(race.maxSpeed))}</Max>
        <Delta>-5.2</Delta>
      </Section>
    </>
  );
};
