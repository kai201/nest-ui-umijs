import UploadBtn from '@/components/UploadButton';
import * as constants from '@/constants';
import * as services from '@/services/user.service';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, BetaSchemaForm, PageContainer, ProColumns, ProFormColumnsType, ProFormInstance, ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Popconfirm, Space, Table } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef } from 'react';

const statusEnum = [
  { text: '启用', value: 0, status: 'Success' },
  { text: '停用', value: 1, status: 'Error' },
];

// 脚手架示例组件
const UserView: React.FC = () => {
  const intl = useIntl();
  const tableRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance<services.CreateUser>>();

  const handleAdd = async (data: services.CreateUser) => {
    console.log(data);
    // const val1 = await formRef.current?.validateFields();
    const { success } = await services.add(data);
    await tableRef.current?.reload();
    formRef.current?.resetFields();
    return success;
  };

  const handleSave = async (data: services.UpdateUser) => {
    const { success } = await services.update(data);
    await tableRef.current?.reload();
    // return success;
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

  const createColumns: any[] = [
    {
      dataIndex: 'avatarUrl',
      ellipsis: true,
      valueType: 'avatar',
      renderFormItem: (schema: any, config: any, form: any) => {
        return <UploadBtn />;
      },
      colProps: {},
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_user.columns.userName', defaultMessage: '登录账号' }),
      dataIndex: 'userName',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      ellipsis: true,
      width: 'md',
      colProps: {
        xs: 24,
        md: 12,
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_user.columns.password', defaultMessage: '密码' }),
      dataIndex: 'password',
      valueType: 'password',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_user.columns.nickName', defaultMessage: '用户昵称' }),
      dataIndex: 'nickName',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_user.columns.email', defaultMessage: '用户邮箱' }),
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_user.columns.phoneNumber', defaultMessage: '手机号码' }),
      dataIndex: 'phoneNumber',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_user.columns.gender', defaultMessage: '用户性别（0男;1女；2未知）' }),
      dataIndex: 'gender',
      ellipsis: true,
      valueType: 'select',
      initialValue: 1,
      valueEnum: constants.gender as any,
      convertValue: (v: any) => `${v}`,
      transform: (value: any) => Number(value),
    },
  ];

  const updateColumns: ProFormColumnsType<services.UpdateUser>[] = [
    ...createColumns.filter((q) => !['userName', 'password'].includes(q.dataIndex)),
    {
      dataIndex: 'userId',
      ellipsis: true,
      readonly: true,
      transform: (value: any) => Number(value),
      colProps: {
        style: { display: 'none' },
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_user.columns.status', defaultMessage: '帐号状态（0正常、1停用）' }),
      dataIndex: 'status',
      ellipsis: true,
      valueEnum: statusEnum,
      convertValue: (v: any) => `${v}`,
      transform: (value: any) => Number(value),
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_user.columns.remark', defaultMessage: '备注' }),
      dataIndex: 'remark',
      valueType: 'textarea',
      ellipsis: true,
      colProps: {},
    },
  ];

  const tableColumns: ProColumns<services.SysUser>[] = [
    {
      title: intl.formatMessage({ id: 'pages.sys_user.columns.userName', defaultMessage: '登录账号' }),
      dataIndex: 'userName',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_user.columns.nickName', defaultMessage: '用户昵称' }),
      dataIndex: 'nickName',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_user.columns.gender', defaultMessage: '用户性别（0男;1女；2未知）' }),
      dataIndex: 'gender',
      ellipsis: true,
      valueEnum: constants.gender as any,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_user.columns.status', defaultMessage: '帐号状态（0正常、1停用）' }),
      dataIndex: 'status',
      ellipsis: true,
      valueEnum: statusEnum,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_user.columns.updatedTime', defaultMessage: '更新时间' }),
      dataIndex: 'updatedTime',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_user.columns.createdTime', defaultMessage: '创建时间' }),
      dataIndex: 'createdTime',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_user.columns.createdTime', defaultMessage: '创建时间' }),
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true,
      hideInForm: true,
      hideInSetting: true,
      search: {
        transform: ([startTime, endTime]) => {
          return { startTime: startTime && dayjs(startTime).format(), endTime: endTime && dayjs(endTime).add(1, 'day').format() };
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.tables.actions', defaultMessage: '操作' }),
      valueType: 'option',
      key: 'option',
      width: 200,
      // render: (text, record, _, action) => [
      render: (_: any, row: services.SysUser) => actionsRow(row),
    },
  ];

  const actionsRow = (row: services.SysUser) => {
    return [
      <BetaSchemaForm<services.UpdateUser>
        key={row.userId}
        title={intl.formatMessage({ id: 'pages.tables.actions.edit', defaultMessage: '编辑' })}
        layoutType={'DrawerForm'}
        trigger={<a key="editable">{intl.formatMessage({ id: 'pages.tables.actions.edit', defaultMessage: '编辑' })}</a>}
        shouldUpdate={false}
        // params={{ primaryKey: row.userId }}
        columns={updateColumns}
        rowProps={{ gutter: [16, 16] }}
        colProps={{ span: 12 }}
        grid={true}
        request={(args) => Promise.resolve(row as any)}
        onFinish={handleSave}
      />,
      <Popconfirm key="remove" title={intl.formatMessage({ id: 'pages.tables.actions.confirm', defaultMessage: '是否删除？' })} onConfirm={() => handleRemove(row.userId)}>
        <a>{intl.formatMessage({ id: 'pages.tables.actions.remove', defaultMessage: '删除' })}</a>
      </Popconfirm>,
    ];
  };

  const actions = () => [
    <BetaSchemaForm<services.CreateUser>
      title={intl.formatMessage({ id: 'pages.add.title', defaultMessage: '新增' })}
      formRef={formRef}
      layoutType={'DrawerForm'}
      trigger={
        <Button key="button" icon={<PlusOutlined />} type="primary">
          {intl.formatMessage({ id: 'pages.add.btn', defaultMessage: '新增' })}
        </Button>
      }
      shouldUpdate={true}
      columns={createColumns}
      rowProps={{ gutter: [16, 16] }}
      colProps={{ span: 12 }}
      grid={true}
      onFinish={handleAdd}
    />,
  ];

  return (
    <PageContainer>
      <ProTable
        rowSelection={{ selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT] }}
        columns={tableColumns}
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
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space size={16}>
            <Popconfirm title={intl.formatMessage({ id: 'pages.tables.actions.confirm', defaultMessage: '是否删除？' })} onConfirm={() => handleRemove(...selectedRowKeys).then((q) => onCleanSelected())}>
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
