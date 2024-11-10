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
// 2 = right
// 3 = back
// 4 = left
// 5 = top
// 6 = bottom

const masterPoints = content("Master Path")
  .content("Master Path")
  .path.points();

const sides = [
  {
    sideId: 1, // front
    points: [
      masterPoints[0],
      masterPoints[1],
      masterPoints[2],
      masterPoints[3],
    ],
  },
  {
    sideId: 2, // left
    points: [
      masterPoints[1],
      masterPoints[4],
      masterPoints[7],
      masterPoints[3],
    ],
  },
  {
    sideId: 3, // back
    points: [
      masterPoints[5],
      masterPoints[6],
      masterPoints[7],
      masterPoints[4],
    ],
  },
  {
    sideId: 4, // right
    points: [
      masterPoints[0],
      masterPoints[3],
      masterPoints[6],
      masterPoints[2],
    ],
  },
];
