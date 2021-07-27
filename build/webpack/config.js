const { join } = require('path');

module.exports = {
  noMainTemplatePath: join(__dirname, 'template'),
  react17CommonTemplatePath: join(__dirname, 'template-react17/common'),
  vue2NoneTemplatePath: join(__dirname, 'template-vue2/none'),
  vue2ElementTemplatePath: join(__dirname, 'template-vue2/element'),
  vue2CommonTemplatePath: join(__dirname, 'template-vue2/common'),
  templatePackageJson: {
    "name": "empty-project",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "keywords": [],
    "author": "",
    "license": "ISC",
    "scripts": {
      "clean": "rm dist/bundle.js",
      "dev": "webpack --mode development",
      "build": "webpack --mode production"
    },
    "dependencies": {
    },
    "devDependencies": {
      "webpack": "^5.46.0",
      "webpack-cli": "^4.7.2",
      "babel-loader": "^8.2.2",
      "@babel/core": "^7.14.8",
      "@babel/preset-env": "^7.14.8",
      "css-loader": "^6.2.0",
      "html-webpack-plugin": "^5.3.2",
      "file-loader": "^6.2.0",
      "url-loader": "^4.1.1"
    }
  }
};
