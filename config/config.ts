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
    '@primary-color': '#00B96B',
    'root-entry-name': 'variable',
    '@border-radius': 6,
  },
  routes,
  npmClient: 'pnpm',
  define: {},
});
