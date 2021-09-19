import React, {FC, useContext} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  distanceFormatter,
  speedFormatter,
  timeFormatter,
} from '../../utils/formatters';
import {StoreContext} from '../../store';

export const LapInfo: FC = () => {
  const {laps} = useContext(StoreContext);
  return (
    <>
      {laps.map((lap, index) => (
        <View style={{borderBottomWidth: 1}} key={index}>
          <View>
            <Text>
              <Icon name="stats-chart" /> {index + 1} lap
            </Text>
          </View>
          <View>
            <Text>
              <Icon name="timer" /> {timeFormatter(lap.time)}
            </Text>
          </View>
          <View>
            <Text>
              <Icon name="speedometer" />
              <Text style={{fontSize: 10}}>max</Text>{' '}
              {speedFormatter(lap.maxSpeed)}
            </Text>
          </View>
          <View>
            <Text>
              <Icon name="speedometer" />
              <Text style={{fontSize: 10}}>avg</Text>{' '}
              {speedFormatter(lap.avgSpeed)}
            </Text>
          </View>
          <View>
            <Text>
              <Icon name="location" /> {distanceFormatter(lap.distance)}
            </Text>
          </View>
        </View>
      ))}
    </>
  );
};
