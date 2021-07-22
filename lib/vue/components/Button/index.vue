<template>
  <div class="x-button">
    <el-button type="primary"> <slot></slot>内部1 </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ComponentOptions } from 'vue';

const XButton = defineComponent({
  name: 'x-button',
  components: {},
  setup() {
    return {};
  },
});

XButton.install = function (Vue: ComponentOptions) {
  Vue.component(XButton.name, XButton);
};

export default XButton;
</script>

<style scoped>
.x-button {
  display: inline-block;
  padding: 3px 6px;
  background: #000;
  color: #fff;
}
</style>
