import { request } from '@umijs/max';
const API_URL = '/imessage/conversation';

export type ImConversation = {
  /**
   * 聊天窗口编号
   */
  conversationId: number;

  /**
   * 会话
   */
  conversationNo: string;

  /**
   * 会话名称
   */
  conversationName: string;
  /**
   * 归属者
   */
  ownId: number;

  /**
   * 封面
   */
  avatarUrl: string;

  /**
   * 群主
   */
  masterId: string;

  /**
   * 会话类型（群、个人）
   */
  conversationType: number;

  /**
   * 二维码
   */
  qrUrl: string;

  /**
   * 备注
   */
  remarks: string;

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

export type QueryImConversation = {
  /**
   * 会话
   */
  conversationNo: string;
};

export default {
  async fetch(primaryKey: number) {
    return await request<R<ImConversation>>(`${API_URL}/${primaryKey}`, { method: 'GET' });
  },
  async fetchList(params: QueryImConversation) {
    return await request<R<ImConversation[]>>(`${API_URL}`, { method: 'GET', params });
  },
};
