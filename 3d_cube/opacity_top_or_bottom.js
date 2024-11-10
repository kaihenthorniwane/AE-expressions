// this calculates the opacity for the top or bottom of the cube

const isTop = effect("Fake 3D Cube")("Visible Sides")[2] === 5;
const opacity = isTop
  ? effect("Fake 3D Cube")("Top Opacity")
  : effect("Fake 3D Cube")("Bottom Opacity");

opacity;
