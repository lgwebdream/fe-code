<template>
     <crud :crudProps="config"/>
</template>


<script lang="ts">
import {defineComponent} from 'vue'
import crud from '../components/crud.vue'
import config from './config'
const page = defineComponent({
  name: 'index',
  data() {
    return {
      config
    };
  },
  components: {
    crud,
  },
});
export default page;
</script>

