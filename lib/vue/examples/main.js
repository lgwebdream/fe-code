import { createApp } from 'vue';
import App from './App.vue';
import xui from '../components'; // 导入组件库
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App);
app.use(ElementPlus);
app.use(xui);

app.config.productionTip = false;
app.mount('#app');
