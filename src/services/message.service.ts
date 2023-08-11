import { request } from '@umijs/max';
const API_URL = '/imessage/message';

export type ImMessage = {
  /**
   * 消息编号
   */
  messageId: number;
  /**
   * 会话编号
   */
  conversationId: number;
  /**
   * 发送人
   */
  senderId: number;
  /**
   * 接收人
   */
  receiverId: number;
  /**
   * 消息类型
   */
  msgType: number;
  /**
   * 消息编号
   */
  serverId: number;
  /**
   * At
   */
  mentions: string;
  /**
   * 微信编号
   */
  fromQw: string;
  /**
   * 文件地址
   */
  fileUrl: string;
  /**
   * 是否推送
   */
  isPush: number;
  /**
   * 发送时间
   */
  sendTime: number;
  /**
   * 消息文本
   */
  rawText: string;
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

export type CreateImMessage = {
  /**
   * 发送人
   */
  senderId: number;
  /**
   * 消息文本
   */
  rawText: string;
};

export type UpdateImMessage = CreateImMessage & {};

export default {
  async fetch(primaryKey: number) {
    return await request<R<ImMessage>>(`${API_URL}/${primaryKey}`, { method: 'GET' });
  },
  async fetchList(params: any = {}) {
    return await request<R<ImMessage[]>>(`${API_URL}`, { method: 'GET', params });
  },
  async fetchHistory(params: any = {}) {
    return await request<R<ImMessage[]>>(`${API_URL}/history`, { method: 'GET', params });
  },
  async add(params: CreateImMessage) {
    return await request<R>(`${API_URL}/create`, { method: 'POST', data: params });
  },
  async update(params: UpdateImMessage) {
    return await request<R>(`${API_URL}/update`, { method: 'POST', data: params });
  },
  async remove(...idList: (string | number)[]) {
    return await request<R>(`${API_URL}/remove`, { method: 'POST', params: { idList } });
  },
};
