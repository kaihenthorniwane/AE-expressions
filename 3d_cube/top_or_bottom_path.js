// this calculates the path for the top or bottom of the cube

const isTop = effect("Fake 3D Cube")("Visible Sides")[2] === 5;
const masterPoints = content("Master Path")
  .content("Master Path")
  .path.points();

const output = isTop
  ? [masterPoints[0], masterPoints[1], masterPoints[5], masterPoints[4]]
  : [masterPoints[2], masterPoints[3], masterPoints[7], masterPoints[6]];
const inTangents = Array.from({ length: output.length }, () => [0, 0]);
const outTangents = Array.from({ length: output.length }, () => [0, 0]);

createPath(output, inTangents, outTangents, true);
