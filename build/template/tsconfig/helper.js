module.exports = () => {
  const text = `declare module "*.vue" {
      import Vue from 'vue'
      export default Vue
    }`;

  return {
    text,
    file: 'vue-shim.d.ts',
  };
};
