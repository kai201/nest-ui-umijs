// 运行时配置
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  name: string;
  currentUser: CurrentUser;
  loading?: boolean;
  fetchUser?: () => Promise<CurrentUser | undefined>;
}> {
  const fetchUser = async () => {
    return undefined;
  };
  return { name: '@umijs/max', currentUser: {}, fetchUser };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    navTheme: 'light',
    // 拂晓蓝
    primaryColor: '#1890ff',
    layout: 'mix',
    contentWidth: 'Fluid',
    // fixedHeader: true,
    fixSiderbar: true,
    siderWidth: 208,
    splitMenus: true,
    colorWeak: false,
    disableContentMargin: true,
    waterMarkProps: {
      content: initialState?.currentUser?.email,
    },
    menu: {
      locale: false,
    },
    // onPageChange: (location) => {
    //   console.log(location);
    // },
  };
};

export const request: RequestConfig = {
  errorConfig: {},
  requestInterceptors: [],
  responseInterceptors: [],
};

// const codeMessage: { [key: number]: string } = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };
