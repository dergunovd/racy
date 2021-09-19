import React, {FC} from 'react';
import {ScrollView, StyleProp, View, ViewStyle} from 'react-native';

import {LapInfo, Location, Speedometer, Timer} from './Info/index';

const card: StyleProp<ViewStyle> = {
  position: 'absolute',
  backgroundColor: '#ffffff',
  elevation: 10,
  paddingHorizontal: 10,
  paddingVertical: 5,
};

const styles: Record<string, StyleProp<ViewStyle>> = {
  leftTop: {
    ...card,
    top: 0,
    left: 0,
  },
  rightTop: {
    ...card,
    top: 0,
    right: 0,
  },
  leftBottom: {
    ...card,
    bottom: 0,
    left: 0,
  },
  rightBottom: {
    ...card,
    bottom: 0,
    right: 0,
    maxHeight: 400,
  },
};

export const Info: FC = () => (
  <>
    <View style={styles.leftTop}>
      <Speedometer />
    </View>
    <View style={styles.rightTop}>
      <Timer />
    </View>
    <View style={styles.leftBottom}>
      <Location />
    </View>
    <ScrollView style={styles.rightBottom}>
      <LapInfo />
    </ScrollView>
  </>
);
