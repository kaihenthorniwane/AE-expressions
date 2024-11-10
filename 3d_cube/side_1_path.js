// this expression calculates the path of a side for a 3d cube

const radius = effect("Radius")("Slider");
const verticalRotation = effect("Vertical Rotation")("Slider");
const horizontalRotation = effect("Horizontal Rotation")("Slider");

const initialPathPointsXYZ = [
  [-radius, radius, radius],
  [radius, radius, radius],
  [radius, -radius, radius],
  [-radius, -radius, radius],
];
