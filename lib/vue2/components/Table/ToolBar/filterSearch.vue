<template>
  <div class='filter-search'>
    <el-form :inline='true' :model='dyFormData' size='small' ref='dyFormData' class='demo-form-form'>
      <template v-for='item in columns'>
        <el-form-item :key='item.dataIndex' :prop='item.dataIndex' :label='item.title' v-if='item.isFilter'>
          <!-- input组件 -->
          <el-input v-if='item.type === formType.Input' v-model='dyFormData[item.dataIndex]' :placeholder='item.title' :type='item.dataIndex' />

          <!-- 下拉选择组件 -->
          <el-select v-if='item.type === formType.Select' v-model='dyFormData[item.dataIndex]' :placeholder='item.title'>
            <el-option v-for='o in item.options' :key='o.value' :label='o.label' :value='o.value' />
          </el-select>

          <!-- 日期组件 -->
          <el-date-picker v-if='item.type === formType.DatePicker' :type='item.dataType' v-model='dyFormData[item.dataIndex]' :placeholder='item.placeholder' />
        </el-form-item>
      </template>

      <el-form-item v-if='btnShow'>
        <el-button type='primary' @click='onSubmit()'>查询</el-button>
        <el-button @click='resetForm()'>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import {  PropType } from 'vue';
import { ICrudColumn, IListRequestParams } from '../../CrudTypes';
import { FormType, IFormComTypeEnum } from '../../Form/constant';

interface FilterSearchData {
  dyFormData: any;
  btnShow: boolean;
  formType: FormType;
}

const FilterSearch = defineComponent({
  name: 'filterSearch',
  setup() {},
  props: {
    columns: Array as PropType<ICrudColumn[]>,
    searcCb: Function as PropType<(params: IListRequestParams) => void>,
  },
  data(): FilterSearchData {
    return {
      dyFormData: {},
      btnShow: false,
      formType: IFormComTypeEnum,
    };
  },
  created() {
    const flag = this.columns?.some?.((item: ICrudColumn) => item.isFilter);
    this.btnShow = flag;
  },
  methods: {
    onSubmit() {
      this.searcCb?.(this.dyFormData);
    },
    resetForm() {
      this.$refs.dyFormData.resetFields();
      this.searcCb?.();
    },
  },
});

// FilterSearch.install = (Vue: ComponentOptions) => {
//   Vue.component(FilterSearch.name, FilterSearch);
// };
export default FilterSearch;
</script>

<style lang="scss" scoped>
.filter-search {
  text-align: left;
}
</style>
