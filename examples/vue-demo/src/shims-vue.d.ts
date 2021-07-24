declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  export default componentOptions;
}

declare module 'vue/types/vue' {
  import VueRouter, { Route } from 'vue-router';
  interface Vue {
    $router: VueRouter; // 这表示this下有这个东西
    $route: Route;
    $http: any;
    $Message: any;
    $Modal: any;
  }
}
declare interface Window {
  Vue: any;
}

declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg';
