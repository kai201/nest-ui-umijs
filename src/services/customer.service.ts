import { request } from '@umijs/max';
const API_URL = '/customer';

export type SysCustomer = {
  /**
   * 客户编号
   */
  customerId: number;
  /**
   * 外部联系人名称
   */
  customerName: string;
  /**
   * 外部联系人头像
   */
  avatarUrl: string;
  /**
   * 外部联系人性别;0-未知 1-男性 2-女性
   */
  gender: string;
  /**
   * 客户企业名称
   */
  corpName: string;
  /**
   * 客户职位
   */
  position: string;
  /**
   * 外部联系人在微信开放平台的唯一身份标识;通过此字段企业可将外部联系人与公众号/小程序用户关联起来。
   */
  unionId: string;
  /**
   * 手机号
   */
  mobilePhone: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * QQ号
   */
  qq: string;
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

export type CreateSysCustomer = {
  /**
   * 外部联系人名称
   */
  customerName: string;
};

export type UpdateSysCustomer = CreateSysCustomer & {
  /**
   * 客户编号
   */
  customerId: number;
};

export default {
  async fetch(primaryKey: number) {
    return await request<R<SysCustomer>>(`${API_URL}/${primaryKey}`, { method: 'GET' });
  },
  async fetchList(params: any) {
    return await request<R<SysCustomer[]>>(`${API_URL}`, { method: 'GET', params });
  },
  async add(params: CreateSysCustomer) {
    return await request<R>(`${API_URL}/create`, { method: 'POST', data: params });
  },
  async update(params: UpdateSysCustomer) {
    return await request<R>(`${API_URL}/update`, { method: 'POST', data: params });
  },
  async remove(...idList: (string | number)[]) {
    return await request<R>(`${API_URL}/remove`, { method: 'POST', params: { idList } });
  },
};
