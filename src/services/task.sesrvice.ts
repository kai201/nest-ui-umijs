import { request } from '@umijs/max';
const API_URL = '/sys/task';

export type SysTask = {
  /**
   * 任务编号
   */
  taskId: number;
  /**
   * 表达式
   */
  pattern: string;
  /**
   * 执行时间
   */
  runTime: Date;
  /**
   * 执行脚本
   */
  runScript: string;
  /**
   * 状态
   */
  status: number;
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

export type CreateSysTask = {};

export type UpdateSysTask = Pick<SysTask, 'taskId' | 'pattern' | 'runScript' | 'status'>;

export default {
  async fetch(primaryKey: number) {
    return await request<R<SysTask>>(`${API_URL}/${primaryKey}`, { method: 'GET' });
  },
  async fetchList(params: any = {}) {
    return await request<R<SysTask[]>>(`${API_URL}`, { method: 'GET', params });
  },
  async add(params: CreateSysTask) {
    return await request<R>(`${API_URL}/create`, { method: 'POST', data: params });
  },
  async update(params: UpdateSysTask) {
    return await request<R>(`${API_URL}/update`, { method: 'POST', data: params });
  },
  async remove(...idList: (string | number)[]) {
    return await request<R>(`${API_URL}/remove`, { method: 'POST', params: { idList } });
  },
};
