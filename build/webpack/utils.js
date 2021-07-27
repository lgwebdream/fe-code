const {
  noMainTemplatePath,
  vue2NoneTemplatePath,
  vue2ElementTemplatePath,
  vue2CommonTemplatePath,
  react17CommonTemplatePath,
  templatePackageJson,
  templateWebpackConfig,
} = require('./config');

/*
 * "vue": "^2.6.14"
 * "vue-loader": "^15.9.6",
 * "vue-template-compiler": "^2.6.14",
 * "element-ui": "^2.15.3",
 * */

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
    if (main === 'vue') {
      result.dependencies.vue = '^2.6.14';
      result.devDependencies['vue-loader'] = '^15.9.6';
      result.devDependencies['vue-template-compiler'] = '^2.6.14';
    }
    if (ui === 'element') {
      result.dependencies['element-ui'] = '^2.15.3';
    }
    return result;
  },
};
