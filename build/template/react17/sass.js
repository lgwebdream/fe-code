module.exports = ({ isSass }) => {
  if (isSass) {
    return {
      file: 'styles.scss',
      text: `$primary-color: blue;

h1 {
  color: $primary-color;
}`,
    };
  }
  return null;
};
