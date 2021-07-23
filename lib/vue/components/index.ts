import { ComponentOptions } from 'vue';
import XButton from './Button/index.vue';
import Table from './Table/index.vue'; 

// 组件列表
const components = [XButton,Table];

const install: any = function (Vue: ComponentOptions) {
  if (install.installed) return;
  components.map(component => Vue.component(component.name, component));
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  XButton,
  Table
};
