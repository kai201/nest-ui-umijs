import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  antd: {
    dark: false,
    compact: false,
    import: true,
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '运管',
    pwa: false,
  },
  theme: {
    'root-entry-name': 'variable',
  },
  routes,
  npmClient: 'pnpm',
});
