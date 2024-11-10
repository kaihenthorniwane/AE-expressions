// this calculate the trim paths start of the ball stroke

const lengthOfPath = content("Transform Offsetter")
  .content("Ball Path")
  .content("Calculate Path Length").roundness;

const ballTrailLength = effect("Ball trail length")("Slider");

(ballTrailLength / lengthOfPath) * 100;
