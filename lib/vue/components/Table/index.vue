<template>
  <div>
    <ToolBar></ToolBar>
    <el-table :data='tableData' style='width: 100%'>
      <el-table-column type='index' width='50' v-if='sequence'></el-table-column>
      <el-table-column v-for='(item, index) in column' :key='index' :prop='item.prop' :label='item.label' :width='item.width'></el-table-column>
    </el-table>

    <el-pagination background layout='prev, pager, next' :total='total'></el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ComponentOptions, PropType } from 'vue';
import { TableDataItem, TableColumnItem } from './type';
import ToolBar from '../ToolBar/index.vue';

const Tabel = defineComponent({
  name: 'v-table',
  props: {
    tableData: {
      type: Array as PropType<TableDataItem[]>,
      required: true,
    },
    column: Array as PropType<TableColumnItem[]>,
    sequence: Boolean,
    total: Number,
  },
  components: {
    ToolBar,
  },
  data() {
    return {};
  },
  setup() {
    return {};
  },
});

Tabel.install = (Vue: ComponentOptions) => {
  Vue.component(Tabel.name, Tabel);
};

export default Tabel;
</script>

<style scoped>
</style>
