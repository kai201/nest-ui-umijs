import { request } from '@umijs/max';
const API_URL = '/imessage/conversation/window';

export type ImConversationWindow = {
  /**
   * 聊天窗口编号
   */
  conversationId: number;
  /**
   * 成员编号
   */
  memberId: number;
  /**
   * 会话名称
   */
  conversationName: string;
  /**
   * 封面
   */
  avatarUrl: string;
  /**
   * 归属者
   */
  ownId: number;
  /**
   * 未读
   */
  unRead: number;
  /**
   * 消息内容
   */
  digest: string;
  /**
   * 消息发送人
   */
  digestMember: number;
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

export type CreateImConversationWindow = {
  /**
   * 成员编号
   */
  memberId: number;
  /**
   * 会话名称
   */
  conversationName: string;
  /**
   * 封面
   */
  avatarUrl: string;
};

export type UpdateImConversationWindow = CreateImConversationWindow & {};

export default {
  async fetch(primaryKey: number) {
    return await request<R<ImConversationWindow>>(`${API_URL}/${primaryKey}`, { method: 'GET' });
  },
  async fetchList(params: any = {}) {
    return await request<R<ImConversationWindow[]>>(`${API_URL}`, { method: 'GET', params });
  },
  async add(params: CreateImConversationWindow) {
    return await request<R>(`${API_URL}/create`, { method: 'POST', data: params });
  },
  async update(params: UpdateImConversationWindow) {
    return await request<R>(`${API_URL}/update`, { method: 'POST', data: params });
  },
  async remove(...idList: (string | number)[]) {
    return await request<R>(`${API_URL}/remove`, { method: 'POST', params: { idList } });
  },
};
