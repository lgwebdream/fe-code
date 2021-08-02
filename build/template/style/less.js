const { lessName } = require('../../config');

module.exports = ({ isLess }) => {
  if (isLess) {
    return {
      file: lessName,
      text: `@primary-color: lightBlue;

h1 {
  color: @primary-color;
}`,
    };
  }
  return null;
};
