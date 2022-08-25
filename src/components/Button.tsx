import React, {FC} from 'react';
import {PressableProps} from 'react-native';
import styled from '@emotion/native';
import {BoldText} from './BoldText';

const Pressable = styled.Pressable`
  background: ${props => props.theme.accentColor};
  padding: 20px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  opacity: ${props => (props.disabled ? '0.5' : '1')};
`;

export const Button: FC<PressableProps & {children: string}> = ({
  children,
  ...props
}) => (
  <Pressable {...props}>
    <BoldText>{children}</BoldText>
  </Pressable>
);
