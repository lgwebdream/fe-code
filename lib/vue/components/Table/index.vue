<template>
  <div>
    <ToolBar :batchToolbar='batchToolbar' :selectRows='selectRows' :setLoading='setLoading' :clearSelection='clearSelection' :columns='columns' :searchConfigs='searchConfigs'></ToolBar>

    <el-table :data='tableData' style='width: 100%' v-loading='loading' @selection-change='handleSelectionChange' ref='multipleTable'>
      <el-table-column type='selection' width='55'></el-table-column>
      <el-table-column type='index' label='ID' width='50'></el-table-column>
      <el-table-column v-for='(item, index) in columns' :key='index' :prop='item.dataIndex' :label='item.title'></el-table-column>
    </el-table>

    <el-pagination
      background
      layout='prev, pager, next, sizes'
      :total='total'
      @current-change='handleCurrentChange'
      :page-sizes='[10, 20, 50, 100]'
      :page-size='pageSize'
      @size-change='handleSizeChange'
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ComponentOptions, PropType } from 'vue';
import ToolBar from '../ToolBar/index.vue';
import { ICrudColumn, ICrudColumnToolbar, ICrudListRequest, ISearch } from '../CrudTypes';

interface IData {
  /** 列表总数 */
  total: number;
  /** 页面列表数量 */
  pageSize: number;
  /** 当前页数 */
  current: number;
  loading: boolean;
  tableData: unknown[];
  selectRows: unknown[];
}
const Tabel = defineComponent({
  name: 'v-table',
  props: {
    title: String,
    request: Function as PropType<ICrudListRequest<unknown, unknown>>,
    columns: Array as PropType<ICrudColumn[]>,
    batchToolbar: Array as PropType<ICrudColumnToolbar[]>,
    searchConfigs: Array as PropType<ISearch[]>,
  },
  components: {
    ToolBar,
  },
  data(): IData {
    return {
      total: 0,
      pageSize: 10,
      current: 1,
      tableData: [],
      selectRows: [],
      loading: false,
    };
  },
  async mounted() {
    // console.log(this.columns);

    this.getList();
  },
  methods: {
    searcCb(values) {
      this.getList(values);
    },
    setLoading(flag: boolean) {
      this.loading = flag;
    },
    async getList(params = {}) {
      this.setLoading(true);
      const res = await this.request({
        pageSize: this.pageSize,
        current: this.current,
        params,
      });
      const { code, data, total } = res.data;
      if (code == 1) {
        this.total = total;
        this.tableData = data;
      }
      setTimeout(() => {
        this.setLoading(false);
      }, 1000);
    },
    handleSizeChange(val: number) {
      if (this.loading) return;
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val: number) {
      if (this.loading) return;
      this.current = val;
      this.getList();
    },
    handleSelectionChange(rows) {
      this.selectRows = rows;
    },
    clearSelection() {
      this.$refs.multipleTable.clearSelection();
    },
  },
});

Tabel.install = (Vue: ComponentOptions) => {
  Vue.component(Tabel.name, Tabel);
};

export default Tabel;
</script>

<style scoped>
</style>
