import { defineConfig } from 'umi';
import { join } from 'path';

const reactLibPath = join(process.cwd(), '../../lib/react/');

const pageRouters = [
  { path: '/', component: '@/pages/index' },
  { path: '/table', component: '@/pages/Table' },
  { path: '/toolbar', component: '@/pages/toolbar' },
]

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: pageRouters,
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
