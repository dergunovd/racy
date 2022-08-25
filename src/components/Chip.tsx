import React, {FC} from 'react';
import {PressableProps} from 'react-native';
import styled from '@emotion/native';

import {MediumText} from './MediumText';
import {Activable} from '../types';

const Pressable = styled.Pressable<Activable>`
  border: 1px solid ${props => props.theme.accentColor};
  background: ${props =>
    props.active ? props.theme.accentColor : 'transparent'};
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;
const Text = styled(MediumText)<Activable>`
  color: ${props =>
    props.active ? props.theme.bgColor : props.theme.accentColor};
`;

export const Chip: FC<PressableProps & {children: string} & Activable> = ({
  children,
  active,
  ...props
}) => (
  <Pressable active={active} {...props}>
    <Text active={active}>{children}</Text>
  </Pressable>
);
