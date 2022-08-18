import React, {FC, useEffect, useState} from 'react';
import styled from '@emotion/native';

import {MediumText} from './MediumText';
import {Activable} from '../types';

interface Props {
  items: number[];
  onPress?: null | ((value: number) => void) | undefined;
  defaultValue?: number;
}

const PickerBody = styled.View`
  background-color: #313131;
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
  border: 2px solid #fff;
  border-radius: 6px;
  background-color: ${props => (props.active ? '#fff' : 'transparent')};
  opacity: ${props => (props.active ? '1' : '0.5')};
  margin-bottom: 10px;
`;

const Text = styled(MediumText)<Activable>`
  color: #fff;
  overflow: hidden;
  margin: 0 -20px;
  font-size: 14px;
  font-weight: 500;
  opacity: ${props => (props.active ? '1' : '0.5')};
  white-space: nowrap;
`;

const Line = styled.View<Activable>`
  height: 1px;
  background: #fff;
  opacity: ${props => (props.active ? '1' : '0.5')};
  flex-grow: 1;
  margin-top: 6px;
`;

export const Picker: FC<Props> = ({items, onPress, defaultValue}) => {
  const [val, setVal] = useState<number>(defaultValue ?? 0);

  useEffect(() => {
    onPress?.(val);
  }, [onPress, val]);

  return (
    <PickerBody>
      {items.map((value, index) => {
        const isActive = value <= val;
        return (
          <React.Fragment key={value}>
            {index ? <Line active={isActive} /> : null}
            <Point onPress={() => setVal(value)}>
              <Dot active={isActive} />
              <Text active={isActive}>{value}</Text>
            </Point>
          </React.Fragment>
        );
      })}
    </PickerBody>
  );
};
