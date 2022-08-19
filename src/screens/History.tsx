import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {Button} from '../components';
import {useNavigate} from 'react-router';

export const History: FC = () => {
  const navigate = useNavigate();
  return (
    <View>
      <Text>History</Text>
      <Button
        onPress={() => {
          navigate('/');
        }}>
        На главный экран
      </Button>
    </View>
  );
};
