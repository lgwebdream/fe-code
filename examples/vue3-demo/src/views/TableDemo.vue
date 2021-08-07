<template>
    <v-table :request='request' :columns='columns' :title='title' :batchToolbar='batchToolbar' :searchConfigs='searchConfigs'></v-table>
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
import config from './config'

export default defineComponent({
  name: 'Demo1',
  props: {},
  data() {
    return {
      ...config,
    };
  },

});
</script>


<style scoped>
</style>
