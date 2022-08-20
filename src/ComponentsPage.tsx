import React from 'react';
import {Text, View} from 'react-native';
import styled from '@emotion/native';

import {
  Button,
  Chip,
  DropdownButton,
  InputWithUnit,
  Picker,
} from './components';
import {DropdownIcon} from './components/icons';

const Br = styled.View`
  height: 16px;
`;
const ComponentsPage = () => (
  <View style={{padding: 16, backgroundColor: '#fff'}}>
    <Text>123</Text>
    <Br />
    <Button>Готово</Button>
    <Br />
    <DropdownButton
      buttonOnPress={() => console.log('button')}
      iconOnPress={() => console.log('icon')}
      icon={<DropdownIcon />}
      text="Старт через 10 м"
    />
    <Br />
    <Picker
      onPress={console.log}
      value={15}
      items={[0, 10, 15, 30, 50, 75, 100]}
    />
    <Br />
    <View style={{flexDirection: 'row'}}>
      <Chip>Экономная</Chip>
      <Text> </Text>
      <Chip active>Средняя</Chip>
    </View>
    <Br />
    <InputWithUnit value="5" unit="метров" keyboardType="numeric" />
    <Br />
    <InputWithUnit
      value="десять"
      unit="метров"
      keyboardType="numeric"
      error="Это не число :("
    />
  </View>
);

export default ComponentsPage;
