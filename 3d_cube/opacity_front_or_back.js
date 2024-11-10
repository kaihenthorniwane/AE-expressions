// this calculates the opacity for the front or back of the cube

const isFront = effect("Fake 3D Cube")("Visible Sides")[0] === 1;
const opacity = isFront
  ? effect("Fake 3D Cube")("Front Opacity")
  : effect("Fake 3D Cube")("Back Opacity");

opacity;
