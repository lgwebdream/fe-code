<template>
  <div class='toolBarWrap'>
    <el-button type='primary'>添加</el-button>
    <el-button type='danger'>删除</el-button>
    <el-button type='info'>自定义</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ComponentOptions, PropType } from 'vue';

const ToolBar = defineComponent({
  name: 'v-table',
  props: {},
  data() {
    return {};
  },
  setup() {
    return {};
  },
});

ToolBar.install = (Vue: ComponentOptions) => {
  Vue.component(ToolBar.name, ToolBar);
};

export default ToolBar;
</script>

<style lang="scss" scoped>
.toolBarWrap {
  text-align: left;
}
</style>
