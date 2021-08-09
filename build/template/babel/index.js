module.exports = () => {
  return {
    file: '.babelrc',
    text: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
          },
        ],
        '@babel/preset-react',
      ],
    },
  };
};
