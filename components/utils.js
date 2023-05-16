// utils.js
import { PixelRatio } from 'react-native';

export function scale(size, factor) {
  return PixelRatio.getFontScale() * size * factor;
}
