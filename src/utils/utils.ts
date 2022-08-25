export const getPercentageValue = (
  min: number,
  max: number,
  value: number,
): number => (value - min) / (max - min);
