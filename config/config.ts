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
  chainWebpack(memo, { env, webpack }) {
    // memo.plugin('extract-css').tap(() => [{ filename: 'static/[name].[hash].css', chunkFilename: 'static/[name].[hash].css', ignoreOrder: true }]);
    // console.log(Object.keys(memo.plugins));
    // memo.output.filename('static/[name].[hash].js').chunkFilename('static/[name].[hash].js').end();
  },
  // extraPostCSSPlugins: [require('tailwindcss')({ config: './tailwind.config.js' })],

  extraPostCSSPlugins: [require('tailwindcss')],
  npmClient: 'pnpm',
  define: {},
});
