import { request } from '@umijs/max';

export type AuthUser = {
  userName: string;
  password: string;
};

export async function auth(params: AuthUser) {
  return await request<R>('/auth', { method: 'POST', data: params });
}

export async function currentUser() {
  return await request<R<CurrentUser>>('/auth/currentUser', {
    method: 'GET',
    skipErrorHandler: true,
  });
}
