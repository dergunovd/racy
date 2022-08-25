type Color = [number, number, number];

export const getGradientColor = (
  color1: Color,
  color2: Color,
  weight: number,
): Color => [
  Math.round(color1[0] * weight + color2[0] * (1 - weight)),
  Math.round(color1[1] * weight + color2[1] * (1 - weight)),
  Math.round(color1[2] * weight + color2[2] * (1 - weight)),
];

export const colorFromRGB = (color: Color) =>
  `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
