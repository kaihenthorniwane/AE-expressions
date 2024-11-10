// This calculates the visible sides of the cube
// point 0 = top left, front
// point 1 = top right, front
// point 2 = bottom right, front
// point 3 = bottom left, front
// point 4 = top left, back
// point 5 = top right, back
// point 6 = bottom right, back
// point 7 = bottom left, back

// 1 = front
// 2 = back
// 3 = left
// 4 = right
// 5 = top
// 6 = bottom

const masterPoints = content("Master Path")
  .content("Master Path")
  .path.points();

// left and right cannot be seen at the same time
// top and bottom cannot be seen at the same time
// front and back cannot be seen at the same time
// schema for output should be [1 | 2, 3 | 4, 5 | 6]
// the first number will be the y value of the 9th point in the master path
// the second number will be the y value of the 10th point in the master path
// the third number will be the y value of the 11th point in the master path

[masterPoints[8][1], masterPoints[9][1], masterPoints[10][1]];
