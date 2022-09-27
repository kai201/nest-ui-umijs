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

export async function list(params: any) {
  return await request<SysUser[]>('/user/list', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function add(params: CreateUser) {
  return await request('/user/add', { method: 'POST', data: params });
}
