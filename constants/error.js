const FileError = {
  FileNotFound: {
    errno: -4058,
    message: path => `${path} does not exist`,
  },
};

module.exports = FileError;
