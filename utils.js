module.exports.transformArr2TrueObj = arr =>
  arr.reduce((pre, cur) => ({ ...pre, ...{ [cur]: true } }), {});
