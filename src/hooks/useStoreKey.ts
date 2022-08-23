import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStoreKey = (key: string, defaultValue?: string) => {
  const [value, setValue] = useState<any>();

  useEffect(() => {
    AsyncStorage.getItem(key).then(val => setValue(val ?? defaultValue));
  }, [defaultValue, key]);

  return value;
};
