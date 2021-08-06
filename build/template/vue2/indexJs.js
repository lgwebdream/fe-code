const { sassName, lessName } = require('../../config');

module.exports = ({ ui, isSass, isLess }) => {
  let text = `import Vue from 'vue';
import App from './App.vue';
`;

  if (ui === 'element') {
    text += `
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
`;
  }
  if (isSass) {
    text += `import './${sassName}';
`;
  }
  if (isLess) {
    text += `import './${lessName}';
`;
  }
  if (ui === 'element') {
    text += `
Vue.use(ElementUI);
`;
  }

  text += `
new Vue({
  el: '#app',
  render: h => h(App),
});`;
  return {
    text,
    file: 'index.js',
  };
};
