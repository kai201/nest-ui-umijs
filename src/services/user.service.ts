import { request } from '@umijs/max';

export type SysUser = {
  userId: number;
  prvId: number;
  nickName: string;
  userName: string;
  userLevel: number;
  email: string;
  phoneNumber: string;
  gender: number;
  avatar: string;
  status: number;
  delFlag: boolean;
  loginIp: string;
  loginTime: Date;
  createBy: string;
  createTime: Date;
  updateBy: string;
  updateTime: Date;
  remark: string;
};

export type CreateUser = {
  prvId?: number;
  nickName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  gender: number;
  avatar: string;
  status: number;
  delFlag: boolean;
};

export type UpdateUser = CreateUser & {
  userId: number;
  loginIp: string;
  loginTime: Date;
};

export async function list(params = {}) {
  return await request<R<SysUser[]>>('/user', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function fetch(pk: number) {
  return await request<R<SysUser>>(`/user/${pk}`, { method: 'GET' });
}

export async function add(params: CreateUser) {
  return await request<R>('/user/create', { method: 'POST', data: params });
}

export async function update(params: UpdateUser) {
  return await request<R>('/user/update', { method: 'POST', data: params });
}

export async function remove(...idList: (string | number)[]) {
  return await request<R>('/user/remove', { method: 'POST', params: { idList } });
}
