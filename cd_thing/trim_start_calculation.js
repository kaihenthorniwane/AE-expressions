// this calculate the trim paths start of the ball stroke

const lengthOfPath = content("Transform Offsetter")
  .content("Ball Path")
  .content("Calculate Path Length").roundness;

const ballTrailLength = effect("Bouncy Box")("Ball trail Length");

const percentageOffsetLeft =
  (360 -
    content("Transform Offsetter").content("Ball Path").content("Trim Paths 1")
      .offset) /
  360;
const lengthLeft = percentageOffsetLeft * lengthOfPath;

const lengthToUse = Math.min(lengthLeft, ballTrailLength);

(lengthToUse / lengthOfPath) * 100;
