<template>
  <div>
    <h1>
      {{name}}
    </h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: function() {
    return {
      name: 'Hello World!',
    }
  },
});
</script>

<style>
h1 {
  color: white;
  background-color: black;
}
</style>
