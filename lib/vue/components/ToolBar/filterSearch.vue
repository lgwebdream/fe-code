<template>
  <div class='filter-search'>
    <el-form :inline='true' :model='form' size='small' ref='form' class='demo-form-form'>
      <el-form-item v-for='item in searchConfigs' :key='item.prop' :prop='item.prop' :label='item.label'>
        <el-input v-if='item.type === Input' v-model='item.value' :placeholder='item.placeholder' />
        <el-select v-if='item.type === Select' v-model='item.value' :placeholder='item.placeholder'>
          <el-option v-for='o in item.data' :key='o.value' :label='o.label' :value='o.value' />
        </el-select>
        <el-date-picker v-if='item.type === Picker' :type='item.dataType' v-model='item.value' :placeholder='item.placeholder' />
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='onSubmit("form")'>查询</el-button>
        <el-button @click='resetForm("form")'>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ComponentOptions, PropType } from 'vue';
import { ISearch, ICurdFromItemTypeEnum } from '../CrudTypes';

const FilterSearch = defineComponent({
  name: 'filterSearch',
  setup() {},
  props: {
    searchConfigs: Array as PropType<ISearch[]>,
  },
  data() {
    return {
      ...ICurdFromItemTypeEnum,
    };
  },
  created() {
    // console.log('343434', this.searchConfigs);
  },
  methods: {
    onSubmit(formName) {
      const values = this.searchConfigs.reduce((prev, { prop, value }) => {
        prev[prop] = value;
        return prev;
      }, {});
      this?.$parent?.$parent?.searcCb?.(values);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this?.$parent?.$parent?.searcCb?.();
    },
  },
});

FilterSearch.install = (Vue: ComponentOptions) => {
  Vue.component(FilterSearch.name, FilterSearch);
};
export default FilterSearch;
</script>

<style lang="scss" scoped>
.filter-search {
  text-align: left;
}
</style>
