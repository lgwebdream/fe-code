module.exports = ({ ui }) => {
  const headerText = `import Vue from 'vue';
import App from './App.vue';
  `;

  const bodyText = `new Vue({
  el: '#app',
  render: h => h(App),
});`;
  let text;

  if (ui === 'element') {
    text = `${headerText}
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

${bodyText}`;
  } else {
    text = `${headerText}${bodyText}`;
  }
  return {
    text,
    file: 'index.js',
  };
};
