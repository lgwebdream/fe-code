<template>
  <div>
    <filter-search :columns='columns' :searcCb='searcCb' />
    <div class='toolBarWrap'>
      <div v-for='(item, index) in batchToolbar' :key='index' class='toolBarItem'>
        <el-button v-if='!item.render' :type='item?.type || "link"' :plain='!!item.plain' @click='btnClick(item)'>{{item.label}}</el-button>
      </div>

      <el-dialog :title='dialogTitle' v-model='dialogFormVisible' destroy-on-close :before-close='beforeCloseDialog'>
        <Form ref='formRef' :columns='columns' :onCancel='clickDialogCancel' :onOk='clickDialogOk' :formOptions='formOptions' />
      </el-dialog>
    </div>
  </div>
</template>

<script lang="tsx">
import { defineComponent, ComponentOptions, PropType,h } from 'vue';
import { ICrudColumn, ICrudColumnToolbar, ICrudToolbarTypeEnum, IListRequestParams, ISearch } from '../../CrudTypes';
import FilterSearch from './filterSearch.vue';
import Form from '../Form/index.vue'

type SetLoadingFn = (flag: boolean) => void;

interface IToolBarData {
  dialogFormVisible: boolean;
  dialogCurrentData: ICrudColumnToolbar;
  dialogTitle: string;
  formOptions?: any;
}

const ToolBar = defineComponent({
  name: 'toolbar',
  functional: true,
  components: {
    FilterSearch,
    Form
  },
  props: {
    batchToolbar: Array as PropType<ICrudColumnToolbar[]>,
    selectRows: Array as PropType<unknown[]>,
    setLoading: Function as PropType<SetLoadingFn>,
    clearSelection: Function,
    columns: Array as PropType<ICrudColumn[]>,
    searchConfigs: Array as PropType<ISearch[]>,
    searcCb: Function as PropType<(params: IListRequestParams)=>void>,
  },
  data(): IToolBarData {
    return {
      dialogFormVisible: false,
      dialogCurrentData: null,
      dialogTitle: '',
      formOptions: {
        labelWidth: '100px'
      }
    };
  },
  created() {
    const form = {};
    this.columns?.forEach(column => {
      form[column.dataIndex] = null;
    });
    this.form = form;
  },
  methods: {
    // 按钮点击事件
    btnClick(item: ICrudColumnToolbar) {
      this[item.toolbarType]?.(item);
    },
    [ICrudToolbarTypeEnum.Add](item) {
      this.dialogTitle = '添加';
      this.dialogFormVisible = true;
      this.dialogCurrentData = item;
    },
    [ICrudToolbarTypeEnum.Edit](item) {
      this.dialogTitle = '编辑';
      this.dialogFormVisible = true;
      this.dialogCurrentData = item;
    },
    async [ICrudToolbarTypeEnum.Delete](item) {
      const len = this.selectRows.length;
      if (len === 1) {
        this.setLoading(true);
        await item.request?.(this.selectRows[0]);
        this.closeLoading();
        return;
      }
      if (len > 1) {
        this.$message({
          message: '请选择批量删除',
          type: 'error',
        });
        return;
      }
      this.$message({
        message: '未选中',
      });
    },
    async [ICrudToolbarTypeEnum.DeleteBatch](item) {
      const len = this.selectRows.length;
      if (len > 1) {
        this.setLoading(true);
        await item.request?.(this.selectRows);
        this.closeLoading();
        return;
      }
      this.$message({
        message: '未选中',
      });
    },
    // 关闭loading
    closeLoading(time = 1000) {
      setTimeout(() => {
        this.setLoading(false);
        this.clearSelection();
      }, time);
    },
    // 关闭弹窗前钩子
    beforeCloseDialog(done) {
      // this.$refs.formRef.getRef().resetFields();
      done();
    },
    // 取消弹窗
    clickDialogCancel() {
      // this.$refs.formRef.getRef().resetFields();
      this.dialogFormVisible = false;
    },
    // 弹窗确定
    async clickDialogOk() {
      const formRef = this.$refs.formRef.getRef()
      const valid = await formRef.validate();
      if (!valid) return false;
      this.setLoading(true);
      await this.dialogCurrentData.request?.(this.form);
      await this.closeLoading(300);
      this.dialogFormVisible = false;
      formRef.resetFields();
    },
  },
});

ToolBar.install = (Vue: ComponentOptions) => {
  Vue.component(ToolBar.name, ToolBar);
};

export default ToolBar;
</script>

<style lang="scss" scoped>
.toolBarWrap {
  display: flex;
  text-align: left;
  .toolBarItem {
    margin-right: 20px;
  }
}
</style>
