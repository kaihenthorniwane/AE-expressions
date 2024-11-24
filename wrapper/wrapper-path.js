const effects = thisLayer("ADBE Effect Parade");
const effectsArray = Array.from({ length: effects.numProperties }).reduce(
  (acc, _, i) => {
    acc.push(effects(i + 1)(1));
    return acc;
  },
  []
);

const offsetPosition = toComp(anchorPoint);

// first we must get all points of all layers
// then we must determine the center of all the layers
// then we must determine the boundary of the line drawn around all the layers
// then we must create a path from the boundary points

// schema of first loop should return an array of arrays
// each sub array contains the points of a single layer

const toCompWithOffset = (layer, point) => {
  return layer.toComp(point) - offsetPosition;
};

const generateLayerPoints = (layer) => {
  const layerRect = layer.sourceRectAtTime();
  const layerLeft = layerRect.left;
  const layerTop = layerRect.top;
  const layerHeight = layerRect.height;
  const layerWidth = layerRect.width;

  return [
    toCompWithOffset(layer, [layerLeft, layerTop]), // top left
    toCompWithOffset(layer, [layerLeft + layerWidth, layerTop]), // top right
    toCompWithOffset(layer, [layerLeft + layerWidth, layerTop + layerHeight]), // bottom right
    toCompWithOffset(layer, [layerLeft, layerTop + layerHeight]), // bottom left
  ];
};

const layerPoints = effectsArray
  .map((layer) => {
    return generateLayerPoints(layer);
  })
  .flat();

const ccw = (p1, p2, p3) => {
  return (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (p3[0] - p1[0]);
};

const getConvexHull = (points) => {
  if (points.length < 3) return points;

  let start = points[0];
  points.forEach((point) => {
    if (point[1] < start[1] || (point[1] === start[1] && point[0] < start[0])) {
      start = point;
    }
  });

  const sortedPoints = points
    .filter((point) => point !== start)
    .sort((a, b) => {
      const turn = ccw(start, a, b);
      if (turn === 0) {
        const distA = (a[0] - start[0]) ** 2 + (a[1] - start[1]) ** 2;
        const distB = (b[0] - start[0]) ** 2 + (b[1] - start[1]) ** 2;
        return distA - distB;
      }
      return -turn;
    });

  const hull = [start];
  sortedPoints.forEach((point) => {
    while (
      hull.length > 1 &&
      ccw(hull[hull.length - 2], hull[hull.length - 1], point) <= 0
    ) {
      hull.pop();
    }
    hull.push(point);
  });

  return hull;
};

const boundaryPoints = getConvexHull(layerPoints);

createPath(boundaryPoints, [], [], true);
