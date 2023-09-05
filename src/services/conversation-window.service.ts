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
  /**
   * 获取聊天窗口
   *
   * @param primaryKey 主键
   * @return 聊天窗口
   */
  async fetch(primaryKey: number) {
    return await request<R<ImConversationWindow>>(`${API_URL}/${primaryKey}`, { method: 'GET' });
  },
  /**
   * 获取群组列表
   *
   * @param params 请求参数
   * @returns 群组列表
   */
  async fetchList(params: any = {}) {
    return await request<R<ImConversationWindow[]>>(`${API_URL}`, { method: 'GET', params });
  },
  /**
   * 添加会话
   *
   * @param params 创建会话参数
   * @return 创建会话成功返回消息 ID，失败返回 Promise(null)
   */
  async add(params: CreateImConversationWindow) {
    return await request<R>(`${API_URL}/create`, { method: 'POST', data: params });
  },
  /**
   * 更新聊天窗口内容
   *
   * @param params 更新前的聊天窗口内容
   * @return 更新成功返回 true，否则返回 false
   */
  async update(params: UpdateImConversationWindow) {
    return await request<R>(`${API_URL}/update`, { method: 'POST', data: params });
  },
  /**
   * 删除单个项目
   *
   * @param idList 待删除 ID 列表，多个参数传递，多个参数之间用逗号隔开
   * @return 删除成功后返回 Promise
   */
  async remove(...idList: (string | number)[]) { 
    return await request<R>(`${API_URL}/remove`, { method: 'POST', params: { idList } });
  },
};

 