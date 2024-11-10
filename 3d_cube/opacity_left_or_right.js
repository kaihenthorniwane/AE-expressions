// this calculates the opacity for the left or right of the cube

const isLeft = effect("Fake 3D Cube")("Visible Sides")[1] === 3;
const opacity = isLeft
  ? effect("Fake 3D Cube")("Left Opacity")
  : effect("Fake 3D Cube")("Right Opacity");

opacity;
