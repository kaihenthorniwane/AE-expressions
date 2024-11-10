// this expression calculates the path of a side for a 3d cube

const radius = effect("Radius")("Slider");
const verticalRotation = degreesToRadians(effect("Vertical Rotation")("Angle"));
const horizontalRotation = degreesToRadians(
  effect("Horizontal Rotation")("Angle")
);

const initialPathPointsXYZ = [
  [-radius, radius, radius],
  [radius, radius, radius],
  [radius, -radius, radius],
  [-radius, -radius, radius],
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

flattenedToXY;
