import React, {FC, useContext} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {speedFormatter} from '../../utils/formatters';
import {StoreContext} from '../../store';

export const Speedometer: FC = () => {
  const {curSpeed, maxSpeed} = useContext(StoreContext);

  return (
    <>
      <View>
        <Text>
          <Icon name="speedometer" /> {speedFormatter(curSpeed)}
        </Text>
      </View>
      <View>
        <Text>
          <Icon name="speedometer" />
          <Text style={{fontSize: 10}}>max</Text> {speedFormatter(maxSpeed)}
        </Text>
      </View>
    </>
  );
};
