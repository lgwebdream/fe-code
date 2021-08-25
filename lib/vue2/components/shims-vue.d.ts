declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
declare module '*.ts' {
  import Vue from 'vue'
  export default Vue
}
declare module 'vue/types/vue' {
  // 3. 声明为 Vue 补充的东西
    interface Vue {
      install: string
    }
  }
declare interface Window {
  Vue: any;
}

declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg';
