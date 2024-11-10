// this goes in the path property of the "Ball Path" shape group

// this forces the expression to only run once
posterizeTime(0);

seedRandom(1, true);

const boundingBox = content("Transform Offsetter")
  .content("Rectangle 1")
  .content("Rectangle Path 1").size;

const widthOfBall = content("Transform Offsetter")
  .content("Ball Path")
  .content("Stroke 1").strokeWidth;

const boundingBoxXFromCenter = boundingBox[0] / 2 - widthOfBall / 2;
const boundingBoxYFromCenter = boundingBox[1] / 2 - widthOfBall / 2;

const speed = 300;
const checkIntervalInSec = 0.1;
const secondsLayerExists = outPoint - inPoint;
const distanceInterval = speed * checkIntervalInSec;
const checksToMake = secondsLayerExists / checkIntervalInSec;

// fyi, time is a variable that comes from After Effects
const secondsToNow = Array.from(
  { length: checksToMake },
  (_, i) => i * checkIntervalInSec
);
const initialPosition = [
  Math.random() * boundingBox[0],
  Math.random() * boundingBox[1],
];

const bounceState = secondsToNow.reduce(
  (acc, _) => {
    let bounced = false;
    // does the ball hit the left or right side of the bounding box?
    if (
      acc.currentPosition[0] + acc.currentDirection[0] * distanceInterval >
        boundingBoxXFromCenter ||
      acc.currentPosition[0] + acc.currentDirection[0] * distanceInterval <
        -boundingBoxXFromCenter
    ) {
      acc.currentDirection[0] *= -1;
      bounced = true;
    }

    // does the ball hit the top or bottom of the bounding box?
    if (
      acc.currentPosition[1] + acc.currentDirection[1] * distanceInterval >
        boundingBoxYFromCenter ||
      acc.currentPosition[1] + acc.currentDirection[1] * distanceInterval <
        -boundingBoxYFromCenter
    ) {
      acc.currentDirection[1] *= -1;
      bounced = true;
    }

    if (bounced) {
      acc.bouncePoints.push([...acc.currentPosition]);
    }

    // update the ball's position
    acc.currentPosition[0] += acc.currentDirection[0] * distanceInterval;
    acc.currentPosition[1] += acc.currentDirection[1] * distanceInterval;

    return acc;
  },
  {
    currentPosition: initialPosition,
    currentDirection: [1, 1],
    bouncePoints: [],
  }
);

const numPoints = bounceState.bouncePoints.length;
const inTangents = Array.from({ length: numPoints }, () => [0, 0]);
const outTangents = Array.from({ length: numPoints }, () => [0, 0]);

createPath(bounceState.bouncePoints, inTangents, outTangents, false);
