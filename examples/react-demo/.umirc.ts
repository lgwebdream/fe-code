import { defineConfig } from 'umi';
import { join } from 'path';

const reactLibPath = join(process.cwd(), '../../lib/react/');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  alias: {
    '@crud': reactLibPath,
  },
  chainWebpack: (config) => {
    config.module.rules
      .values()
      .map((it) => it.include.add(reactLibPath).add(process.cwd()));
  },
  webpack5: {},
});
