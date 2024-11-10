// this goes in the path property of the "Ball Path" shape group

// this forces the expression to only run once
posterizeTime(0);

seedRandom(effect("Bouncy Box")("Random Seed"), true);

const boundingBox = content("Transform Offsetter")
  .content("Rectangle 1")
  .content("Rectangle Path 1").size;

const widthOfBall = content("Transform Offsetter")
  .content("Ball Path")
  .content("Stroke 1").strokeWidth;

const wallWidth = content("Transform Offsetter")
  .content("Rectangle 1")
  .content("Stroke 1").strokeWidth;

const NUM_COLLISIONS = effect("Bouncy Box")("Collissions");

const boundingBoxXFromCenter =
  boundingBox[0] / 2 - widthOfBall / 2 - wallWidth / 2;
const boundingBoxYFromCenter =
  boundingBox[1] / 2 - widthOfBall / 2 - wallWidth / 2;

function findNextCollision(position, direction) {
  // Find distances to walls based on direction
  const distToXWall =
    direction[0] > 0
      ? boundingBoxXFromCenter - position[0]
      : -boundingBoxXFromCenter - position[0];

  const distToYWall =
    direction[1] > 0
      ? boundingBoxYFromCenter - position[1]
      : -boundingBoxYFromCenter - position[1];

  // Calculate which wall we'll hit using similar triangles
  const hitX =
    Math.abs(distToXWall / direction[0]) < Math.abs(distToYWall / direction[1]);

  // Return collision point and new direction
  if (hitX) {
    return {
      point: [
        position[0] + distToXWall,
        position[1] + (distToXWall * direction[1]) / direction[0],
      ],
      newDirection: [-direction[0] + (0.5 - Math.random()) / 2, direction[1]],
    };
  } else {
    return {
      point: [
        position[0] + (distToYWall * direction[0]) / direction[1],
        position[1] + distToYWall,
      ],
      newDirection: [direction[0], -direction[1] + (0.5 - Math.random()) / 2],
    };
  }
}

const initialPosition = [
  Math.random() * boundingBox[0] - boundingBoxXFromCenter,
  Math.random() * boundingBox[1] - boundingBoxYFromCenter,
];

const bouncePoints = [initialPosition];
let currentPosition = initialPosition;
let currentDirection = [1, 1];

for (let i = 0; i < NUM_COLLISIONS; i++) {
  const collision = findNextCollision(currentPosition, currentDirection);
  bouncePoints.push(collision.point);
  currentPosition = collision.point;
  currentDirection = collision.newDirection;
}

const numPoints = bouncePoints.length;
const inTangents = Array.from({ length: numPoints }, () => [0, 0]);
const outTangents = Array.from({ length: numPoints }, () => [0, 0]);

createPath(bouncePoints, inTangents, outTangents, false);
