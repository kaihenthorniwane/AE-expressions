// this calculates the color for the top or bottom of the cube

const isTop = effect("Fake 3D Cube")("Visible Sides")[2] === 5;
const color = isTop
  ? effect("Fake 3D Cube")("Top")
  : effect("Fake 3D Cube")("Bottom");

color;
