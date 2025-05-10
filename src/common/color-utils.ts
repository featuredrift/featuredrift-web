/** linearly interpolate between two hex colors */
export function interpolateColor(a: string, b: string, t: number): string {
  const c1 = hexToRgb(a);
  const c2 = hexToRgb(b);
  if (!c1 || !c2) return a;
  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const bVal = Math.round(c1.b + (c2.b - c1.b) * t);
  return rgbToHex(r, g, bVal);
}

export function hexToRgb(hex: string) {
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(h, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

export function getSafetyRatingColor(safetyRating: number) {
  if (!safetyRating) {
    return '#ff0000';
  } else if (safetyRating === 1) {
    return '#53eafd';
  } else if (safetyRating >= 0.5) {
    return interpolateColor('#ffff00', '#00ff00', (safetyRating - 0.5) * 2);
  } else {
    return interpolateColor('#ff0000', '#ffff00', safetyRating * 2);
  }
}
