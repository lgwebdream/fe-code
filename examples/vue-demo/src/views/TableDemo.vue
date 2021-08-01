<template>
  <div>
    <v-table :request='request' :columns='columns' :title='title' :batchToolbar='batchToolbar' :searchConfigs='searchConfigs'></v-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import {
  ICrud,
  ICrudToolbarTypeEnum,
  ICurdFromItemTypeEnum,
} from '@fe-code/vue/components/CrudTypes';

const apiConfig = {
  add: '/api/json/add',
  edit: '/api/json/edit',
  delete: '/api/json/delete',
  list: '/api/json/list',
};

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
      batchToolbar: [
        {
          label: '添加',
          type: 'primary',
          toolbarType: ICrudToolbarTypeEnum.Add,
          request: row => {
            return axios(apiConfig.add, { method: 'post', data: row });
          },
        },
        {
          label: '删除',
          type: 'danger',
          toolbarType: ICrudToolbarTypeEnum.Delete,
          request: row =>
            axios(apiConfig.delete, { method: 'post', data: row }).then(() => {
              this.$message({
                message: '删除成功',
                type: 'success',
              });
            }),
        },
        {
          label: '批量删除',
          type: 'danger',
          toolbarType: ICrudToolbarTypeEnum.DeleteBatch,
          request: row =>
            axios(apiConfig.delete, { method: 'post', data: row }).then(() => {
              this.$message({
                message: '删除成功',
                type: 'success',
              });
            }),
        },
      ],
      searchConfigs: [
        {
          type: ICurdFromItemTypeEnum.Input,
          label: '审批人',
          value: '',
          prop: 'user',
          placeholder: '审批人',
        },
        {
          type: ICurdFromItemTypeEnum.Select,
          label: '活动区域',
          value: '',
          prop: 'region',
          placeholder: '活动区域',
          data: [
            {
              label: '上海',
              value: 'shanghai',
            },
            {
              label: '北京',
              value: 'beijing',
            },
          ],
        },
        // {
        //   type: ICurdFromItemTypeEnum.Picker,
        //   label: '日期',
        //   value: '',
        //   prop: 'data',
        //   placeholder: '请选择日期',
        //   dataType: 'data',
        // },
      ],
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
