<template>
  <div>
    <v-table :request='request' :columns='columns' :title='title'></v-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { ICrud } from '@fe-code/vue/components/CrudTypes';

export default defineComponent({
  name: 'Demo1',
  props: {},
  data() {
    const demoTable: ICrud = {
      title: '人员管理',
      columns: [
        { dataIndex: 'date', title: '日期', readonly: true },
        { dataIndex: 'name', title: '姓名' },
        { dataIndex: 'address', title: '地址' },
      ],
      request: async params => {
        return axios.get('/api/json/list', { params });
      },
    };
    return {
      ...demoTable,
    };
  },
  // async mounted() {},
});
</script>


<style scoped>
</style>
