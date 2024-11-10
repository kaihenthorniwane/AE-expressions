// this calculate the length of the path

posterizeTime(0);

const srcPath = content("Transform Offsetter")
  .content("Ball Path")
  .content("Path 1").path;
const points = srcPath.points();
const ballTrailLength = effect("Bouncy Box")("Ball trail Length");

const lengthOfPath = points.reduce((acc, point, index) => {
  if (index === 0) {
    return acc;
  }
  return acc + length(point, points[index - 1]);
}, 0);

lengthOfPath;
