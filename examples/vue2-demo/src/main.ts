import Vue from 'vue'
import App from './App.vue'
import router from './router'

import xui from '@fe-code/vue2'; // 导入组件库

Vue.use(xui)



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
