<template>
  <div>
    <el-form :model='formModel' ref='formRef' :inline='!!formOptions?.inline'>
      <el-form-item v-for='(item,index) in columns' :key='index' :prop='item.dataIndex' :label='item.title' :label-width='formOptions?.labelWidth || "auto"' :rules='item.rules'>
        <!-- input组件 -->
        <el-input v-if='item.type === formType.Input' v-model='formModel[item.dataIndex]' :placeholder='item.title' :type='item.dataIndex' />

        <!-- 数值组件 -->
        <el-input-number v-if='item.type === formType.InputNumber' v-model='formModel[item.dataIndex]' />

        <!-- 下拉选择组件 -->
        <el-select v-if='item.type === formType.Select' v-model='formModel[item.dataIndex]' :placeholder='item.title'>
          <el-option v-for='o in item.options' :key='o.value' :label='o.label' :value='o.value' :placeholder='item.title' />
        </el-select>

        <!-- 日期组件 -->
        <el-date-picker v-if='item.type === formType.DatePicker' :type='item.dataType' v-model='formModel[item.dataIndex]' :placeholder='item.title' />

        <!-- 评分组件 -->
        <el-rate v-if='item.type === formType.Rate' v-model='formModel[item.dataIndex]' />

        <!-- 滑块组件 -->
        <el-slider v-if='item.type === formType.Slider' v-model='formModel[item.dataIndex]' />

        <!-- 开关组件 -->
        <el-switch v-if='item.type === formType.Switch' v-model='formModel[item.dataIndex]' />

        <!-- 多勾选组件 -->
        <el-checkbox-group v-if='item.type === formType.CheckboxGroup' v-model='formModel[item.dataIndex]'>
          <el-checkbox v-for='checkboxItem in item.options' :label='checkboxItem.label' :key='checkboxItem.value'>{{checkboxItem.label}}</el-checkbox>
        </el-checkbox-group>

        <!-- 单选组件 -->
        <el-radio-group v-if='item.type === formType.RadioGroup' v-model='formModel[item.dataIndex]'>
          <el-radio v-for='radioItem in item.options' :key='radioItem.value' :label='radioItem.value'>{{radioItem.label}}</el-radio>
        </el-radio-group>

        <!-- 级联选择器 -->
        <el-cascader v-if='item.type === formType.Cascader' v-model='formModel[item.dataIndex]' :options='item.fieldProps?.cascaderData' :placeholder='item.title'></el-cascader>
      </el-form-item>
    </el-form>

    <div slot='footer' class='dialog-footer'>
      <el-button @click='clickDialogCancel'>取 消</el-button>
      <el-button type='primary' @click='clickDialogOk'>确 定</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ComponentOptions, PropType } from 'vue';
import { ICrudColumn } from '../../CrudTypes';
import { FormType, IFormComTypeEnum, IFormData } from './constant';

interface IData {
  formModel: IFormData;
  formType: FormType;
}

// form表单配置参数
interface FormOptions {
  labelWidth?: number | string;
  inline?: boolean; // 是否单行排列
}

const Form = defineComponent({
  name: 'v-form',
  props: {
    columns: Array as PropType<ICrudColumn[]>,
    onCancel: Function as PropType<(formModel: IFormData) => void>,
    onOk: Function as PropType<(formModel: IFormData) => void>,
    formOptions: Object as PropType<FormOptions>,
  },
  data(): IData {
    const newData = { formModel: {}, formType: IFormComTypeEnum };
    // 初始化容错数据
    this.columns?.forEach((itemColumn: ICrudColumn) => {
      // 多选
      if (itemColumn.type === newData.formType.CheckboxGroup) {
        newData.formModel[itemColumn.dataIndex] = [];
      }
    });
    return newData;
  },
  mounted() {},
  methods: {
    // 获取formRef上方法，供父组件用
    getRef() {
      return this.$refs.formRef;
    },
    // 取消按钮事件
    clickDialogCancel() {
      this.onCancel?.(this.formModel);
    },
    // 确定按钮事件
    clickDialogOk() {
      this.onOk?.(this.formModel);
    },
  },
});

Form.install = (Vue: ComponentOptions) => {
  Vue.component(Form.name, Form);
};

export default Form;
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
