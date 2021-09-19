import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {timeFormatter} from '../../utils/formatters';
import {StoreContext} from '../../store';

export const Timer: FC = () => {
  const {lapStartTime} = useContext(StoreContext);
  const intervalId = useRef(0);
  const [time, setTime] = useState<number>();

  useEffect(() => {
    intervalId.current = +setInterval(
      () => setTime(lapStartTime ? Date.now() - lapStartTime : 0),
      10,
    );
    return () => {
      clearInterval(intervalId.current);
    };
  }, [lapStartTime]);

  return (
    <View>
      <Text>
        <Icon name="timer" /> {timeFormatter(time)}
      </Text>
    </View>
  );
};
