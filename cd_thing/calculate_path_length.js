// this calculate the length of the path

posterizeTime(0);

const srcPath = content("Transform Offsetter")
  .content("Ball Path")
  .content("Path 1").path;
const points = srcPath.points();
const ballTrailLength = effect("Ball trail length")("Slider");

const lengthOfPath = points.reduce((acc, point, index) => {
  if (index === 0) {
    return acc;
  }
  return acc + length(point, points[index - 1]);
}, 0);

lengthOfPath;
