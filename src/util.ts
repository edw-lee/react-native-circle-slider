export function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function radToDeg(rad: number) {
  return (rad * 180) / Math.PI;
}

export function toPositiveRad(rad: number) {
  rad = clampTo360Rad(rad);

  if (rad < 0) {
    return 2 * Math.PI + rad;
  }

  return rad;
}

export function clampTo360Rad(rad: number) {
  return rad % (2 * Math.PI);
}
