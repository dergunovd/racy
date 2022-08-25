import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStoreKey = <T>(
  key: string,
  defaultValue?: T,
): T | undefined => {
  const [value, setValue] = useState<any>();

  useEffect(() => {
    AsyncStorage.getItem(key).then(val => setValue(val ?? defaultValue));
  }, [defaultValue, key]);

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
