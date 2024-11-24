const effects = thisLayer("ADBE Effect Parade");
const effectsArray = Array.from({ length: effects.numProperties }).reduce(
  (acc, _, i) => {
    acc.push(effects(i + 1).name);
    return acc;
  },
  []
);

const offsetPosition = toComp(anchorPoint);

// first we must get all points of all layers
// then we must determine the center of all the layers
// then we must determine the boundary of the line drawn around all the layers
// then we must exclude all points that are inside the boundary
// then we must create a path from the remaining points

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
    toCompWithOffset(layer, [layerLeft, layerTop]),
    toCompWithOffset(layer, [layerLeft + layerWidth, layerTop]),
    toCompWithOffset(layer, [layerLeft + layerWidth, layerTop + layerHeight]),
    toCompWithOffset(layer, [layerLeft, layerTop + layerHeight]),
  ];
};

const layerPoints = effectsArray.map((_, i) => {
  const layer = thisComp.layer(i + 1);
  return generateLayerPoints(layer);
});

createPath(layerPoints.flat(), [], [], true);
