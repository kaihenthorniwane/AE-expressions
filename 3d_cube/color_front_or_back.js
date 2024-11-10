// this calculates the color for the front or back of the cube

const isFront = effect("Fake 3D Cube")("Visible Sides")[0] === 1;
const color = isFront
  ? effect("Fake 3D Cube")("Front")
  : effect("Fake 3D Cube")("Back");

color;
