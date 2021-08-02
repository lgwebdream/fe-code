module.exports = ({ isLess }) => {
  if (isLess) {
    return {
      file: 'styles.less',
      text: `@primary-color: lightBlue;

h1 {
  color: @primary-color;
}`,
    };
  }
  return null;
};
