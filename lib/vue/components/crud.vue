<template>
    <div>
           <!-- button -->
       <!-- <table></table> -->
       
    </div>
</template>

<script lang="ts">
import { defineComponent, ComponentOptions, PropType } from 'vue';

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
      console.log(this.crudProps)
    return {};
  },
});

crud.install = (Vue: ComponentOptions) => {
  Vue.component(crud.name, crud);
};

export default crud;
</script>