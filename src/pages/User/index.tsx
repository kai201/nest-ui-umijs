import React, { useState, useEffect, useRef } from 'react';
import {
  PageContainer,
  ProTable,
  ProColumns,
  ProForm,
  ProFormSelect,
  ProFormText,
  ModalForm,
  useIntl,
  ActionType,
  ProFormInstance,
} from '@ant-design/pro-components';
import { Button, Table, Space, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import * as services from '@/services/user.service';

// 脚手架示例组件
const UserView: React.FC = () => {
  const intl = useIntl();
  const tableRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance<services.CreateUser>>();
  const [editVisible, setEditVisible] = useState(false);

  const columns: ProColumns<services.SysUser>[] = [
    { title: intl.getMessage('user.label.table_0', '名称'), dataIndex: 'userName', ellipsis: true, width: 200 },
    {
      title: intl.getMessage('user.label.table_1', '昵称'),
      dataIndex: 'nickName',
      search: false,
      ellipsis: true,
    },
    { title: intl.getMessage('user.label.table_0', '邮箱'), dataIndex: 'email', ellipsis: true, width: 200 },
    {
      title: intl.getMessage('user.label.table_2', '创建时间'),
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'date',
      sorter: true,
      width: 200,
    },
    {
      title: intl.getMessage('user.label.table.actions', '操作'),
      valueType: 'option',
      key: 'option',
      width: 200,
      // render: (text, record, _, action) => [
      render: () => [
        <a key="editable" onClick={() => {}}>
          {intl.getMessage('user.label.table.actions_0', '编辑')}
        </a>,
      ],
    },
  ];

  const actions = () => [
    <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => setEditVisible(true)}>
      {intl.getMessage('btn.add', '新增')}
    </Button>,
  ];

  const btnSubmitClick = async (data: services.CreateUser) => {
    try {
      console.log(data);
      // const val1 = await formRef.current?.validateFields();
      const { success } = await services.add(data);
      await tableRef.current?.reload();
      formRef.current?.resetFields();
      return success;
    } catch (error) {
      return false;
    }
  };
  const handleFetch = async (params: any, sort: any, filter: any) => {
    const { data, success } = await services.list(params);
    console.log('sort -------->', sort);
    console.log('filter ------>', filter);
    console.log('params ------>', params);
    console.log('data ------>', data);
    return { data, success };
  };
  const handleRemove = async (idList: (string | number)[]) => {
    try {
      const { success } = await services.remove(...idList);
      tableRef.current?.reload();
      return success;
    } catch (error) {}
    return true;
  };

  useEffect(() => {});

  return (
    <PageContainer>
      <ProTable
        size="small"
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        columns={columns}
        rowKey="userId"
        actionRef={tableRef}
        request={handleFetch}
        form={{ syncToUrl: true, syncToInitialValues: false }}
        toolBarRender={actions}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        )}
        tableAlertOptionRender={({ selectedRowKeys }) => (
          <Space size={16}>
            <Popconfirm title="Are you sure to delete this task?" onConfirm={() => handleRemove(selectedRowKeys)}>
              <a>批量删除</a>
            </Popconfirm>
            <a>导出数据</a>
          </Space>
        )}
      />
      <ModalForm<services.CreateUser>
        title={intl.getMessage('user.modal.add.title', '新增')}
        size="small"
        formRef={formRef}
        open={editVisible}
        onOpenChange={setEditVisible}
        // request={handleSave}
        onFinish={btnSubmitClick}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="nickName"
            tooltip="最长为 24 位"
            placeholder="昵称"
            rules={[
              { required: true, message: '请输入昵称!' },
              { type: 'string', max: 24 },
            ]}
            required
          />
          <ProFormText
            width="md"
            name="userName"
            placeholder="名称"
            rules={[
              { required: true, message: '请输入名称!' },
              { type: 'string', max: 24 },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="email"
            tooltip="最长为 24 位"
            placeholder="请输入邮箱"
            rules={[{ required: true, message: '请输入邮箱!' }, { type: 'email' }]}
          />
          <ProFormText
            width="md"
            name="phoneNumber"
            placeholder="请输入手机号"
            rules={[
              { required: true, message: '请输入手机号!' },
              { type: 'string', len: 11 },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            width="md"
            options={[
              { value: 0, label: '男' },
              { value: 1, label: '女' },
              { value: 2, label: '未知' },
            ]}
            name="gender"
            placeholder="性别"
          />
          <ProFormSelect
            width="md"
            options={[
              { value: 0, label: '启用' },
              { value: 1, label: '禁用' },
            ]}
            name="status"
            placeholder="状态"
          />
        </ProForm.Group>
      </ModalForm>
    </PageContainer>
  );
};

export default UserView;
