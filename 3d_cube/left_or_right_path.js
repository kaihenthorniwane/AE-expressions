// this calculates the path for the left or right of the cube

const isLeft = effect("Visible Sides")("3D Point")[1] === 3;
const masterPoints = content("Master Path")
  .content("Master Path")
  .path.points();

const output = isLeft
  ? [masterPoints[0], masterPoints[3], masterPoints[7], masterPoints[4]]
  : [masterPoints[1], masterPoints[2], masterPoints[6], masterPoints[5]];
const inTangents = Array.from({ length: output.length }, () => [0, 0]);
const outTangents = Array.from({ length: output.length }, () => [0, 0]);

createPath(output, inTangents, outTangents, true);
