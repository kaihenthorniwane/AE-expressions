// this gets applied to "Transform Offsetter" scale property

const toCompPointToMeasure = [1, 1];
const constantPointToMeasure = [0, 0];

const constantPoint = toComp(constantPointToMeasure);
const measuredPoint = toComp(toCompPointToMeasure);

const offsetPoint = measuredPoint - constantPoint;

const offsetScaleX = 1 / offsetPoint[0];
const offsetScaleY = 1 / offsetPoint[1];

[offsetScaleX * 100, offsetScaleY * 100];
