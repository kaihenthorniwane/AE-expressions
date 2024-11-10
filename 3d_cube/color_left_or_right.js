// this calculates the color for the left or right of the cube

const isLeft = effect("Fake 3D Cube")("Visible Sides")[1] === 3;
const color = isLeft
  ? effect("Fake 3D Cube")("Left")
  : effect("Fake 3D Cube")("Right");

color;
