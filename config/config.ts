import { defineConfig } from '@umijs/max';
import routes from './routes';
export default defineConfig({
  antd: {
    dark: false,
    compact: false,
    // import: true,
  },
  access: {},
  model: {},
  initialState: {},
  request: { dataField: 'data' as any },
  layout: {
    title: '运管',
    pwa: false,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  theme: {
    'root-entry-name': 'variable',
  },
  routes,
  npmClient: 'pnpm',
  define: {},
});
