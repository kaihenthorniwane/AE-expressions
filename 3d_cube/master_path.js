// this expression calculates the points of all the sides of a 3d cube

const radius = effect("Radius")("Slider");
const verticalRotation = degreesToRadians(effect("Vertical Rotation")("Angle"));
const horizontalRotation = degreesToRadians(
  effect("Horizontal Rotation")("Angle")
);

const initialPathPointsXYZ = [
  [-radius, radius, radius], // top left, front
  [radius, radius, radius], // top right, front
  [radius, -radius, radius], // bottom right, front
  [-radius, -radius, radius], // bottom left, front
  [-radius, radius, -radius], // top left, back
  [radius, radius, -radius], // top right, back
  [radius, -radius, -radius], // bottom right, back
  [-radius, -radius, -radius], // bottom left, back
];

const rotatePathPointsAlongXAxisAKAVerticalRotation = initialPathPointsXYZ.map(
  (point) => {
    return [
      point[0],
      point[1] * Math.cos(verticalRotation) -
        point[2] * Math.sin(verticalRotation),
      point[1] * Math.sin(verticalRotation) +
        point[2] * Math.cos(verticalRotation),
    ];
  }
);

const rotatePathPointsAlongYAxisAKAHorizontalRotation =
  rotatePathPointsAlongXAxisAKAVerticalRotation.map((point) => {
    return [
      point[0] * Math.cos(horizontalRotation) +
        point[2] * Math.sin(horizontalRotation),
      point[1],
      -point[0] * Math.sin(horizontalRotation) +
        point[2] * Math.cos(horizontalRotation),
    ];
  });

const flattenedToXY = rotatePathPointsAlongYAxisAKAHorizontalRotation.map(
  (point) => {
    return [point[0], point[1]];
  }
);

const inTangents = flattenedToXY.map((point) => {
  return [0, 0];
});

const outTangents = flattenedToXY.map((point) => {
  return [0, 0];
});

createPath(flattenedToXY, inTangents, outTangents, false);
