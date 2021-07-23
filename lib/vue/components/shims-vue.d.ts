import { ComponentOptions } from 'vue';
declare module '*.vue' {
  const componentOptions: ComponentOptions;
  export default componentOptions;
}

declare interface Window {
  Vue: any;
}

declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg';
