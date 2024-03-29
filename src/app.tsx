// 运行时配置
import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import * as services from '@/services/auth.service';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { RequestConfig, RunTimeLayoutConfig, history } from '@umijs/max';
import { message } from 'antd';

const loginPath = '/auth';
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  name?: string;
  currentUser?: CurrentUser;
  loading?: boolean;
  fetchUser?: () => Promise<CurrentUser | undefined>;
}> {
  const fetchUser = async () => {
    try {
      let { data } = await services.currentUser();
      return data;
    } catch (e) {
      history.push(loginPath);
    }
  };
  if (window.location.pathname !== loginPath) {
    const currentUser = await fetchUser();
    return { name: '@umijs/max', currentUser, fetchUser };
  }
  return { name: '@umijs/max', currentUser: {}, fetchUser };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    layout: 'mix',
    contentWidth: 'Fluid',
    colorPrimary: '#00B96B',
    // fixedHeader: true,
    fixSiderbar: true,
    siderWidth: 208,
    splitMenus: true,
    disableContentMargin: true,
    token: {},
    waterMarkProps: {
      content: initialState?.currentUser?.nickName,
    },
    menu: {
      type: 'group',
      locale: false,
    },
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    ...initialState?.settings,
    // onPageChange: (location) => {
    //   console.log(location);
    // },
  };
};

const codeMessage: { [key: number]: string } = {
  0: '网络连接失败，请检查网络后重试。',
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export const request: RequestConfig = {
  // baseURL: 'http://118.122.77.101:7000',
  baseURL: 'http://127.0.0.1:3000',
  // baseURL: 'api',
  // paramsSerializer: (params) => queryString.stringify(params),
  errorConfig: {
    errorHandler(e: any, opts) {
      if (opts?.skipErrorHandler) throw e;
      if (e.response) message.error(codeMessage[e.response.status]);
    },
  },
  requestInterceptors: [
    (url, options) => {
      const accessToken: string = localStorage.getItem('token') || '';

      if (accessToken) {
        options.headers['auth'] = `${accessToken}`;
      }
      return { url, options };
    },
  ],
  // responseInterceptors: [
  //   (response) => {
  //     // 拦截响应数据，进行个性化处理
  //     const { data } = response;
  //     if (!(data as R).success) message.error('请求失败！');
  //     return response;
  //   },
  // ],
};
