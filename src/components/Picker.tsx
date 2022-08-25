import React, {FC} from 'react';
import styled from '@emotion/native';

import {MediumText} from './MediumText';
import {Activable} from '../types';

interface Props {
  items: number[];
  value: number;
  onPress?: null | ((value: number) => void) | undefined;
}

const PickerBody = styled.View`
  background-color: ${props => props.theme.accentColor};
  padding: 24px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 4px 4px 0 0;
`;

const Point = styled.Pressable`
  align-items: center;
  justify-content: center;
  width: 12px;
`;

const Dot = styled.View<Activable>`
  width: 12px;
  height: 12px;
  border: 2px solid ${props => props.theme.bgColor};
  border-radius: 6px;
  background-color: ${props =>
    props.active ? props.theme.bgColor : 'transparent'};
  opacity: ${props => (props.active ? '1' : '0.5')};
  margin-bottom: 10px;
`;

const Text = styled(MediumText)<Activable>`
  color: ${props => props.theme.bgColor};
  overflow: hidden;
  margin: 0 -20px;
  font-size: 14px;
  font-weight: 500;
  opacity: ${props => (props.active ? '1' : '0.5')};
  white-space: nowrap;
`;

const Line = styled.View<Activable>`
  height: 1px;
  background: ${props => props.theme.bgColor};
  opacity: ${props => (props.active ? '1' : '0.5')};
  flex-grow: 1;
  margin-top: 6px;
`;

export const Picker: FC<Props> = ({items, onPress, value}) => (
  <PickerBody>
    {items.map((val, index) => {
      const isActive = val <= value;
      return (
        <React.Fragment key={val}>
          {index ? <Line active={isActive} /> : null}
          <Point onPress={() => onPress?.(val)}>
            <Dot active={isActive} />
            <Text active={isActive}>{val}</Text>
          </Point>
        </React.Fragment>
      );
    })}
  </PickerBody>
);
