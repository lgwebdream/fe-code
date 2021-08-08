<template>
  <div>33232</div>
</template>

<script lang="ts">
import { defineComponent, ComponentOptions, PropType } from 'vue';
import ToolBar from '../ToolBar/index.vue';

interface IData {
}
const Tabel = defineComponent({
  name: 'v-table',
  components: {
    ToolBar,
  },
  data(): IData {
    return {
    };
  },
  async mounted() {
  },
  methods: {
  },
});

Tabel.install = (Vue: ComponentOptions) => {
  Vue.component(Tabel.name, Tabel);
};

export default Tabel;
</script>

<style scoped>
</style>
