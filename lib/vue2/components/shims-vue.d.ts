declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
declare module '*.ts' {
  import Vue from 'vue'
  export default Vue
}

declare interface Window {
  Vue: any;
}

declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg';
