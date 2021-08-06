// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = ({ ui, main, isTypescript }) => {
  let text = '';
  // eslint-disable-next-line prefer-const
  if (isTypescript) {
    text = `<template>
  <div>
    <h1>
    <div>{{message}}</div>
    <button @click="onClick">Click!</button>
    </h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class App extends Vue{
  message: string = 'hello world!'

   // 组件方法也可以直接声明为实例的方法
   onClick (): void {
    window.alert(this.message)
  }
};
</script>

<style>
h1 {
  color: white;
  background-color: black;
}
</style>
  `;
  } else {
    text = `<template>
  <div>
    <h1>
      {{name}}
    </h1>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  data: function() {
    return {
      name: 'Hello World!',
    }
  },
});
</script>

<style>
h1 {
  color: white;
  background-color: black;
}
</style>
  `;
  }

  return {
    text,
    file: 'App.vue',
  };
};
