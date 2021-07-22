<template>
  <Demo1 />
</template>

<script lang="ts">
import Demo1 from './components/Demo1.vue';

export default {
  name: 'App',
  components: {
    Demo1,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
