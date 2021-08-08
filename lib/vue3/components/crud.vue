<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, ComponentOptions } from 'vue';

const crud = defineComponent({
  name: 'crud',
  props: {
      crudProps:{
          type:Object,
      }
  },
  data() {
    return {};
  },
  setup() {
 
    return {};
  },
});

crud.install = (Vue: ComponentOptions) => {
  Vue.component(crud.name, crud);
};

export default crud;
</script>