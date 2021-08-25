
import Vue,{VueConstructor} from 'vue';
import Table from './Table/index.vue'; 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
// 组件列表
const components = [Table];

const install: any = function (Vue:VueConstructor) {
  if (install.installed) return;
  // @ts-ignore
  components.map(component => Vue.component(new component().$options.name, component));
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  Table
};


