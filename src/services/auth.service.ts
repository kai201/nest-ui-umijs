import { request } from '@umijs/max';

export type AuthUser = {
  userName: string;
  password: string;
};

/**
 * 认证登录凭证
 *
 * @param params 认证凭证
 * @return 认证成功则返回用户信息，否则返回 null
 */
export async function auth(params: AuthUser) {
  return await request<R>('/sys/auth', { method: 'POST', data: params });
}

/**
 * 获取当前用户
 *
 * @return 当前用户
 */
export async function currentUser() {
  return await request<R<CurrentUser>>('/sys/auth/currentUser', {
    method: 'GET',
    skipErrorHandler: true,
  });
}
