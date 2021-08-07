<template>
  <div>
    <filter-search :searchConfigs='searchConfigs' />
    <div class='toolBarWrap'>
      <div v-for='(item, index) in batchToolbar' :key='index' class='toolBarItem'>
        <el-button v-if='!item.render' :type='item.type' :plain='item.plain' @click='btnClick(item)'>{{item.label}}</el-button>
      </div>

      <el-dialog :title='dialogTitle' v-model='dialogFormVisible' destroy-on-close :before-close='beforeCloseDialog'>
        <el-form :model='form' ref='formRef'>
          <el-form-item :label='column.title' v-for='(column,index) in columns' :key='index' :prop='column.dataIndex'>
            <el-input v-model='form[column.dataIndex]' autocomplete='off'></el-input>
          </el-form-item>

          <!-- <el-select v-model='form.region' placeholder='请选择活动区域'>
            <el-option label='区域一' value='shanghai'></el-option>
            <el-option label='区域二' value='beijing'></el-option>
          </el-select>-->
        </el-form>
        <div slot='footer' class='dialog-footer'>
          <el-button @click='clickDialogCancel'>取 消</el-button>
          <el-button type='primary' @click='clickDialogOk()'>确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { ComponentOptions, PropType } from 'vue';
import { ICrudColumn, ICrudColumnToolbar, ICrudToolbarTypeEnum, ISearch } from '../../CrudTypes';
import FilterSearch from './filterSearch.vue';

type SetLoadingFn = (flag: boolean) => void;

interface IToolBarData {
  dialogFormVisible: boolean;
  dialogCurrentData: ICrudColumnToolbar;
  form: {
    [key in string]: unknown;
  };
  dialogTitle: string;
}

const ToolBar = {
  name: 'toolbar',
  components: {
    FilterSearch,
  },
  props: {
    batchToolbar: Array as PropType<ICrudColumnToolbar[]>,
    selectRows: Array as PropType<unknown[]>,
    setLoading: Function as PropType<SetLoadingFn>,
    clearSelection: Function,
    columns: Array as PropType<ICrudColumn[]>,
    searchConfigs: Array as PropType<ISearch[]>,
  },
  data(): IToolBarData {
    return {
      dialogFormVisible: false,
      dialogCurrentData: null,
      form: {},
      dialogTitle: '',
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
    closeLoading(time = 1000) {
      setTimeout(() => {
        this.setLoading(false);
        this.clearSelection();
      }, time);
    },
    beforeCloseDialog(done) {
      this.$refs.formRef.resetFields();
      done();
    },
    clickDialogCancel() {
      this.$refs.formRef.resetFields();
      this.dialogFormVisible = false;
    },
    // 弹窗确定
    async clickDialogOk() {
      const valid = await this.$refs.formRef.validate();
      if (!valid) return false;
      this.setLoading(true);
      await this.dialogCurrentData.request?.(this.form);
      await this.closeLoading(300);
      this.dialogFormVisible = false;
      this.$refs.formRef.resetFields();
    },
  },
};

// ToolBar.install = (Vue: ComponentOptions) => {
//   Vue.component(ToolBar.name, ToolBar);
// };

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
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
