import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

new Vue({
  render: h => h(App),
}).$mount('#app');
