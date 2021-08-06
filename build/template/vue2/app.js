module.exports = ({ isTypescript, ui }) => {
  let text = '';
  if (ui === 'element') {
    text += `<template>
  <div>
    <el-button>{{message}}</el-button>
  </div>
</template>
`;
  } else {
    text += `<template>
  <div>
    <h1>{{message}}</h1>
  </div>
</template>
`;
  }
  if (isTypescript) {
    text += `

<script lang="ts">
import Vue from 'vue';

interface IData {
  message: string
}
export default Vue.extend( {
  data (): IData {
    return {
      message: 'hello world'
    }
  }
});
</script>`;
  } else {
    text += `

<script>
import Vue from 'vue';

export default Vue.extend({
  data: function() {
    return {
      message: 'hello world'
    }
  },
});
</script>
`;
  }

  return {
    text,
    file: 'App.vue',
  };
};
