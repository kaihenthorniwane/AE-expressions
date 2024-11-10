// this expression calculates the points of all the sides of a 3d cube

const radius = effect("Fake 3D Cube")("Radius");
const verticalRotation = degreesToRadians(
  effect("Fake 3D Cube")("Vertical Rotation")
);
const horizontalRotation = degreesToRadians(
  effect("Fake 3D Cube")("Horizontal Rotation")
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

const masterPoints = rotatePathPointsAlongXAxisAKAVerticalRotation.map(
  (point) => {
    return [
      point[0] * Math.cos(horizontalRotation) +
        point[2] * Math.sin(horizontalRotation),
      point[1],
      -point[0] * Math.sin(horizontalRotation) +
        point[2] * Math.cos(horizontalRotation),
    ];
  }
);

// we need to create 3 points at the end of the path where their y position is the id of the side that should be visible

// This calculates the visible sides of the cube
// point 0 = top left, front
// point 1 = top right, front
// point 2 = bottom right, front
// point 3 = bottom left, front
// point 4 = top left, back
// point 5 = top right, back
// point 6 = bottom right, back
// point 7 = bottom left, back

// 1 = front
// 2 = back
// 3 = left
// 4 = right
// 5 = top
// 6 = bottom

// left and right cannot be seen at the same time
// top and bottom cannot be seen at the same time
// front and back cannot be seen at the same time
// schema for output should be [1 | 2, 3 | 4, 5 | 6]
const sides = {
  left: [masterPoints[0], masterPoints[3], masterPoints[7], masterPoints[4]],
  right: [masterPoints[1], masterPoints[2], masterPoints[6], masterPoints[5]],
  top: [masterPoints[0], masterPoints[1], masterPoints[5], masterPoints[4]],
  bottom: [masterPoints[2], masterPoints[3], masterPoints[7], masterPoints[6]],
  front: [masterPoints[0], masterPoints[1], masterPoints[2], masterPoints[3]],
  back: [masterPoints[4], masterPoints[5], masterPoints[6], masterPoints[7]],
};

const minLeftSideZ = sides.left.reduce((acc, point) => {
  return Math.min(acc, point[2]);
}, Infinity);
const isRightFirst = sides.right.some((point) => point[2] < minLeftSideZ);

const minTopSideZ = sides.top.reduce((acc, point) => {
  return Math.min(acc, point[2]);
}, Infinity);

const isBottomFirst = sides.bottom.some((point) => point[2] < minTopSideZ);

const minFrontSideZ = sides.front.reduce((acc, point) => {
  return Math.min(acc, point[2]);
}, Infinity);

const isBackFirst = sides.back.some((point) => point[2] < minFrontSideZ);

const output = [
  isBackFirst ? 2 : 1,
  isRightFirst ? 4 : 3,
  isBottomFirst ? 6 : 5,
];

// now we need to flatten the points to 2d

const flattenedToXY = masterPoints.map((point) => {
  return [point[0], point[1]];
});

const flattenedToXYWithInfoPoints = [
  ...flattenedToXY,
  ...output.map((side) => {
    return [100, side];
  }),
];

const inTangents = flattenedToXYWithInfoPoints.map(() => {
  return [0, 0];
});

const outTangents = flattenedToXYWithInfoPoints.map(() => {
  return [0, 0];
});

createPath(flattenedToXYWithInfoPoints, inTangents, outTangents, false);
