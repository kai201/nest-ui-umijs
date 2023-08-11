import { request } from '@umijs/max';
const API_URL = '/imessage/member';

export type ImMember = {
  /**
   * 用户编号
   */
  memberId: number;
  /**
   * 平台
   */
  platId: number;
  /**
   * 用户标识
   */
  platNo: string;
  /**
   * 用户类型（内部、外部）
   */
  memberType: number;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 昵称
   */
  nickName: string;
  /**
   * 真实名称
   */
  realName: string;
  /**
   * 邀请人
   */
  inviterId: number;
  /**
   * 企业编号
   */
  corpId: string;
  /**
   * 企业名称
   */
  corpShortName: string;
  /**
   * 微信Id
   */
  wxUnionId: string;
  /**
   * 头像地址
   */
  avatorUrl: string;
  /**
   * 状态
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

export type CreateImMember = {};

export type UpdateImMember = CreateImMember & {};

export default {
  async fetch(primaryKey: number) {
    return await request<R<ImMember>>(`${API_URL}/${primaryKey}`, { method: 'GET' });
  },
  async fetchList(params: any = {}) {
    return await request<R<ImMember[]>>(`${API_URL}`, { method: 'GET', params });
  },
  async add(params: CreateImMember) {
    return await request<R>(`${API_URL}/create`, { method: 'POST', data: params });
  },
  async update(params: UpdateImMember) {
    return await request<R>(`${API_URL}/update`, { method: 'POST', data: params });
  },
  async remove(...idList: (string | number)[]) {
    return await request<R>(`${API_URL}/remove`, { method: 'POST', params: { idList } });
  },
};
