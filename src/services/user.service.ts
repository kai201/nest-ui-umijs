import { request } from '@umijs/max';

const API_URL = '/sys/user';

export type SysUser = {
  /**
   * 用户ID
   */
  userId: number;
  /**
   * 上级
   */
  prvId: number;
  /**
   * 登录账号
   */
  userName: string;
  /**
   * 用户昵称
   */
  nickName: string;
  /**
   * 用户邮箱
   */
  email: string;
  /**
   * 手机号码
   */
  phoneNumber: string;
  /**
   * 用户性别（0男;1女；2未知）
   */
  gender: number;
  /**
   * 头像路径
   */
  avatarUrl: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 盐加密
   */
  salt: string;
  /**
   * 帐号状态（0正常、1停用）
   */
  status: number;
  /**
   * 备注
   */
  remark: string;
  /**
   * 租户号
   */
  tenantId: number;
  /**
   * 乐观锁
   */
  revision: number;
  /**
   * 创建人
   */
  createdBy: number;
  /**
   * 创建时间
   */
  createdTime: Date;
  /**
   * 更新人
   */
  updatedBy: number;
  /**
   * 更新时间
   */
  updatedTime: Date;
};

export type CreateUser = Pick<SysUser, 'userName' | 'nickName' | 'phoneNumber' | 'avatarUrl' | 'email' | 'gender' | 'password' | 'remark'>;

export type UpdateUser = Pick<SysUser, 'userId' | 'prvId' | 'nickName' | 'phoneNumber' | 'avatarUrl' | 'email' | 'gender' | 'status' | 'remark'>;

export async function list(params = {}) {
  return await request<R<SysUser[]>>(API_URL, {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function fetch(primaryKey: number) {
  return await request<R<SysUser>>(`${API_URL}/${primaryKey}`, { method: 'GET' });
}

export async function nameOf(keyword: string) {
  return await request<R<SysUser[]>>(`${API_URL}/nameof`, { method: 'GET', params: { name: keyword } });
}

export async function keyof(...idList: (string | number)[]) {
  return await request<R<SysUser[]>>(`${API_URL}/keyof`, { method: 'GET', params: { idList } });
}

export async function add(params: CreateUser) {
  return await request<R>(`${API_URL}/create`, { method: 'POST', data: params });
}

export async function update(params: UpdateUser) {
  return await request<R>(`${API_URL}/update`, { method: 'POST', data: params });
}

export async function remove(...idList: (string | number)[]) {
  return await request<R>(`${API_URL}/remove`, { method: 'POST', params: { idList } });
}
