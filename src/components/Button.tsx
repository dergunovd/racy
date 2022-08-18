import React, {FC} from 'react';
import {PressableProps} from 'react-native';
import styled from '@emotion/native';
import {BoldText} from './BoldText';

const Pressable = styled.Pressable`
  background: #313131;
  padding: 20px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

export const Button: FC<PressableProps & {children: string}> = ({
  children,
  ...props
}) => (
  <Pressable {...props}>
    <BoldText>{children}</BoldText>
  </Pressable>
);
