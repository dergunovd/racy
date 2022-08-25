import {format, formatDistance} from 'date-fns';
import {ru} from 'date-fns/locale';

export const speedFormatter = (value?: number) => value?.toFixed(1) ?? '0';

export const timeFormatter = (value?: number) =>
  format(value ?? 0, 'mm:ss:SSS');

export const dateFormatter = (value?: number) =>
  formatDistance(value ?? 0, Date.now(), {addSuffix: true, locale: ru});

export const distanceFormatter = (value: number) =>
  value > 1000 ? `${(value / 1000).toFixed(2)}km` : `${value.toFixed(1)}m`;

export const numberWithSign = (value: number) =>
  value > 0 ? `+${value}` : value;

export const declOfNum = (number: number, titles: string[]): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};
