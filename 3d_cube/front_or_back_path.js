// this calculates the path for the front or back of the cube

const isFront = effect("Fake 3D Cube")("Visible Sides")[0] === 1;
const masterPoints = content("Master Path")
  .content("Master Path")
  .path.points();

const output = isFront ? masterPoints.slice(0, 4) : masterPoints.slice(4, 8);
const inTangents = Array.from({ length: output.length }, () => [0, 0]);
const outTangents = Array.from({ length: output.length }, () => [0, 0]);

createPath(output, inTangents, outTangents, true);
