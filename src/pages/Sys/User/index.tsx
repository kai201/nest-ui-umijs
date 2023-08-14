import { PlusOutlined } from '@ant-design/icons';
import { ActionType, BetaSchemaForm, PageContainer, ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import * as services from '@/services/user.service';

// 脚手架示例组件
const UserView: React.FC = () => {
  const intl = useIntl();
  const tableRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance<services.CreateUser>>();
  const [pk, setPk] = useState(0);

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
    },
    {
      title: intl.formatMessage({ id: 'pages.user.label.table_3', defaultMessage: '创建时间' }),
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'date',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.user.label.table_3', defaultMessage: '创建时间' }),
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true,
      hideInForm: true,
      hideInSetting: true,
      search: {
        transform: ([startTime, endTime],x,y) => {
          //@ts-ignore
          console.log(startTime);
          return { startTime: startTime.toString(), endTime: endTime.toString() };
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.tables.actions', defaultMessage: '操作' }),
      valueType: 'option',
      key: 'option',
      width: 200,
      // render: (text, record, _, action) => [
      render: (_, { userId }) => [
        <a key="editable" onClick={() => {}}>
          {intl.formatMessage({ id: 'pages.tables.actions.edit', defaultMessage: '编辑' })}
        </a>,
        <Popconfirm key="remove" title={intl.formatMessage({ id: 'pages.tables.actions.confirm', defaultMessage: '是否删除？' })} onConfirm={() => handleRemove(userId)}>
          <a>{intl.formatMessage({ id: 'pages.tables.actions.remove', defaultMessage: '删除' })}</a>
        </Popconfirm>,
      ],
    },
  ];

  const actions = () => [
    <BetaSchemaForm<services.CreateUser>
      title={intl.formatMessage({ id: 'pages.add.title', defaultMessage: '新增' })}
      layoutType={'DrawerForm'}
      trigger={
        <Button key="button" icon={<PlusOutlined />} type="primary">
          {intl.formatMessage({ id: 'pages.add.btn', defaultMessage: '新增' })}
        </Button>
      }
      shouldUpdate={true}
      columns={columns as any}
      rowProps={{ gutter: [16, 16] }}
      grid={true}
      onFinish={(args) => {
        console.log(args);
        return Promise.resolve(false);
      }}
    />,
  ];
  return (
    <PageContainer>
      <ProTable
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
    </PageContainer>
  );
};

export default UserView;
