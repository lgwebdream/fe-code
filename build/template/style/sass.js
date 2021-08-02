const { sassName } = require('../../config');

module.exports = ({ isSass }) => {
  if (isSass) {
    return {
      file: sassName,
      text: `$primary-color: blue;

h1 {
  color: $primary-color;
}`,
    };
  }
  return null;
};
