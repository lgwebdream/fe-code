const {
  noMainTemplatePath,
  vue2NoneTemplatePath,
  vue2ElementTemplatePath,
  vue2CommonTemplatePath,
  react17CommonTemplatePath,
  templatePackageJson,
  templateSnowpackConfig,
} = require('./config');

/** *
 * "react": "^17.0.2",
 "react-dom": "^17.0.2",
 "antd": "^4.16.8"
 */

module.exports = {
  getInitTemplate(framework, ui) {
    if (framework === 'vue') {
      if (ui === 'element') {
        return vue2ElementTemplatePath;
      }
      return vue2NoneTemplatePath;
    }
    return noMainTemplatePath;
  },

  getCommonTemplate(framework) {
    const commons = {
      vue: vue2CommonTemplatePath,
      react: react17CommonTemplatePath,
    };
    return commons[framework];
  },

  getPackageJson({ ui, main }) {
    const result = JSON.parse(JSON.stringify(templatePackageJson));
    if (main === 'react') {
      result.dependencies.react = '^17.0.2';
      result.dependencies['react-dom'] = '^17.0.2';
    }
    if (ui === 'antd') {
      result.dependencies.antd = '^4.16.8';
    }
    return result;
  },

  getSnowpackConfigJson({ ui }) {
    const result = JSON.parse(JSON.stringify(templateSnowpackConfig));
    if (ui === 'antd') {
      result.packageOptions = ['antd'];
    }
    return result;
  },
};
