// this calculate the trim offset of the ball stroke

const lengthOfPath = content("Transform Offsetter")
  .content("Ball Path")
  .content("Calculate Path Length").roundness;

const speed = effect("Ball Speed")("Slider");

(speed / lengthOfPath) * time * 360;
