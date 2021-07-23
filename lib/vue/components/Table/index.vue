<template>
  <div>
    <el-table :data='tableData' style='width: 100%'>
      <el-table-column prop='date' label='日期' width='180'></el-table-column>
      <el-table-column prop='name' label='姓名' width='180'></el-table-column>
      <el-table-column prop='address' label='地址'></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ComponentOptions, PropType } from 'vue';

interface ITableDataItem {
  id: string;
  name: string;
}

const Tabel = defineComponent({
  name: 'v-table',
  props: {
    tableData: Array as PropType<any[]>,
  },
  data() {
    return {
      column: [],
    };
  },
  setup() {
    return {};
  },
});

Tabel.install = function (Vue: ComponentOptions) {
  Vue.component(Tabel.name, Tabel);
};

export default Tabel;
</script>

<style scoped>
</style>
