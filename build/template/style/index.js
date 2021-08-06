const sass = require('./sass');
const less = require('./less');

module.exports = ({ isSass, isLess }) => {
  return [sass({ isSass }), less({ isLess })].filter(Boolean);
};
