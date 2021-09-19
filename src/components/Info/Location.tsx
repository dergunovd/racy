import React, {FC, useContext} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {distanceFormatter} from '../../utils/formatters';
import {StoreContext} from '../../store';

export const Location: FC = () => {
  const {coords, distance} = useContext(StoreContext);

  return (
    <>
      <View>
        <Text>
          <Icon name="location" /> {coords?.latitude ?? 'N/A'},
          {coords?.longitude ?? 'N/A'}
        </Text>
      </View>
      <View>
        <Text>
          <Icon name="location" /> {distanceFormatter(distance)}
        </Text>
      </View>
    </>
  );
};
