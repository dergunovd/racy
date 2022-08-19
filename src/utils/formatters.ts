import {format} from 'date-fns';

export const speedFormatter = (value?: number) => value?.toFixed(1) ?? 'N/A';

export const timeFormatter = (value?: number) =>
  format(value ?? 0, 'mm:ss:SSS');

export const distanceFormatter = (value: number) =>
  value > 1000 ? `${(value / 1000).toFixed(2)}km` : `${value.toFixed(1)}m`;
