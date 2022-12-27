import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from '@umijs/max';
import {
  PageContainer,
  ProTable,
  ProColumns,
  ProForm,
  ProFormSelect,
  ProFormText,
  ModalForm,
  ActionType,
  ProFormInstance,
  ProDescriptions,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import { Button, Table, Space, Popconfirm, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import * as services from '@/services/user.service';

// 脚手架示例组件
const UserView: React.FC = () => {
  const intl = useIntl();
  const tableRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance<services.CreateUser>>();
  const [editVisible, setEditVisible] = useState(false);
  const [pk, setPk] = useState(0);

  const actions = () => [
    <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => setEditVisible(true)}>
      {intl.formatMessage({ id: 'pages.btn.add', defaultMessage: '新增' })}
    </Button>,
  ];

  const handleAdd = async (data: services.CreateUser) => {
    console.log(data);
    // const val1 = await formRef.current?.validateFields();
    const { success } = await services.add(data);
    await tableRef.current?.reload();
    formRef.current?.resetFields();
    return success;
  };

  const handleFetch = async (params: any) => {
    console.log('handleFetch');

    let { data, success } = await services.fetch(params.pk);

    return { data, success };
  };

  const handleFetchList = async (params: any, sort: any, filter: any) => {
    console.log('sort -------->', sort);
    console.log('filter ------>', filter);
    console.log('params ------>', params);
    const { data, success, total } = await services.list(params);
    console.log('data ------>', data);
    return { data, success, total };
  };

  const handleRemove = async (...idList: (string | number)[]) => {
    const { success } = await services.remove(...idList);
    tableRef.current?.reload();
    return success;
  };

  useEffect(() => {});

  const columns: ProColumns<services.SysUser>[] = [
    {
      title: intl.formatMessage({ id: 'pages.user.label.table_0', defaultMessage: '名称' }),
      dataIndex: 'userName',
      ellipsis: true,
      width: 200,
      render: (_, m) => <a onClick={() => setPk(m.userId)}>{_}</a>,
    },
    {
      title: intl.formatMessage({ id: 'pages.user.label.table_1', defaultMessage: '昵称' }),
      dataIndex: 'nickName',
      search: false,
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.user.label.table_2', defaultMessage: '邮箱' }),
      dataIndex: 'email',
      ellipsis: true,
      width: 200,
    },
    {
      title: intl.formatMessage({ id: 'pages.user.label.table_3', defaultMessage: '创建时间' }),
      key: 'showTime',
      dataIndex: 'createTime',
      valueType: 'date',
      sorter: true,
      width: 200,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.user.label.table_3', defaultMessage: '创建时间' }),
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: ([startTime, endTime]) => {
          return { startTime, endTime };
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.label.actions', defaultMessage: '操作' }),
      valueType: 'option',
      key: 'option',
      width: 200,
      // render: (text, record, _, action) => [
      render: (_, { userId }) => [
        <a key="editable" onClick={() => {}}>
          {intl.formatMessage({ id: 'pages.btn.actions.edit', defaultMessage: '编辑' })}
        </a>,
        <Popconfirm
          key="remove"
          title={intl.formatMessage({ id: 'pages.label.actions.confirm', defaultMessage: '是否删除？' })}
          onConfirm={() => handleRemove(userId)}
        >
          <a>{intl.formatMessage({ id: 'pages.btn.actions.remove', defaultMessage: '删除' })}</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        size="small"
        rowSelection={{ selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT] }}
        columns={columns}
        rowKey="userId"
        actionRef={tableRef}
        request={handleFetchList}
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
            <Popconfirm title="Are you sure to delete this task?" onConfirm={() => handleRemove(...selectedRowKeys)}>
              <a>批量删除</a>
            </Popconfirm>
            <a>导出数据</a>
          </Space>
        )}
      />

      <ModalForm<services.CreateUser>
        title={intl.formatMessage({ id: 'pages.title.add', defaultMessage: '新增' })}
        size="small"
        formRef={formRef}
        open={editVisible}
        onOpenChange={setEditVisible}
        // request={handleSave}
        onFinish={handleAdd}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="nickName"
            tooltip="最长为 24 位"
            placeholder={intl.formatMessage({ id: 'pages.user.nickName.placeholder', defaultMessage: '昵称' })}
            rules={[
              { required: true, message: '请输入昵称!' },
              { type: 'string', max: 24 },
            ]}
            required
          />
          <ProFormText
            width="md"
            name="userName"
            placeholder={intl.formatMessage({ id: 'pages.user.userName.placeholder', defaultMessage: '名称' })}
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
            placeholder={intl.formatMessage({ id: 'pages.user.email.placeholder', defaultMessage: '请输入邮箱' })}
            rules={[{ required: true, message: '请输入邮箱!' }, { type: 'email' }]}
          />
          <ProFormText
            width="md"
            name="phoneNumber"
            placeholder={intl.formatMessage({
              id: 'pages.user.phoneNumber.placeholder',
              defaultMessage: '请输入手机号',
            })}
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

      {!!pk && (
        <Drawer width={600} open={true} closable={false} onClose={() => setPk(0)} maskClosable>
          <ProDescriptions<services.SysUser>
            column={2}
            extra={false}
            title="查看"
            request={handleFetch}
            params={{ pk }}
            columns={columns as ProDescriptionsItemProps<services.SysUser>[]}
          />
        </Drawer>
      )}
    </PageContainer>
  );
};

export default UserView;
