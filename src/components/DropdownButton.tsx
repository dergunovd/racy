import React, {FC, ReactNode} from 'react';
import styled from '@emotion/native';
import {GestureResponderEvent} from 'react-native';

import {BoldText} from './BoldText';

const Button = styled.Pressable`
  background-color: #313131;
  padding: 4px 0;
  border-radius: 4px;
  flex-direction: row;
  align-items: stretch;
  flex-grow: 1;
`;

const Text = styled(BoldText)`
  padding: 16px 0;
  margin: 0 auto;
`;

const Icon = styled.Pressable`
  padding: 16px;
  justify-self: flex-end;
  border-left-color: #fdfdfd;
  border-left-width: 1px;
  justify-content: center;
`;

interface Props {
  text: string;
  icon: ReactNode;
  buttonOnPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  iconOnPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}

export const DropdownButton: FC<Props> = ({
  text,
  icon,
  buttonOnPress,
  iconOnPress,
  ...props
}) => (
  <Button onPress={buttonOnPress} {...props}>
    <Text>{text}</Text>
    <Icon onPress={iconOnPress}>{icon}</Icon>
  </Button>
);
