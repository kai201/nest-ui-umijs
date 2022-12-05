import React, { useState, useEffect, useRef } from 'react';
import { take } from 'lodash';
import { useIntl } from '@umijs/max';
import {
  PageContainer,
  ProTable,
  ProColumns,
  ProForm,
  ProFormText,
  ModalForm,
  ActionType,
  ProFormInstance,
  ProDescriptions,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import { Button, Table, Popconfirm, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import services, { SysCustomer, CreateSysCustomer } from '@/services/customer.service';

// 脚手架示例组件
const SysCustomerView: React.FC = () => {
  const intl = useIntl();
  const tableRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const [editVisible, setEditVisible] = useState(false);
  const [primaryKey, setPrimaryKey] = useState(0);

  const handleFetch = async (params: any) => {
    let { data, success } = await services.fetch(params.primaryKey);
    return { data, success };
  };
  const handleFetchList = async (params: any, sort: any, filter: any) => {
    console.log(sort, filter);
    const { data, success, total } = await services.fetchList(params);
    await tableRef.current?.reload();
    formRef.current?.resetFields();
    return { data, success, total };
  };
  const handleAdd = async (data: any) => {
    const { success } = await services.add(data);
    await tableRef.current?.reload();
    return success;
  };
  const handleRemove = async (...idList: (string | number)[]) => {
    const { success } = await services.remove(...idList);
    tableRef.current?.reload();
    return success;
  };
  const actions = () => [
    <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => setEditVisible(true)}>
      {intl.formatMessage({ id: 'pages.add.btn', defaultMessage: '新增' })}
    </Button>,
  ];

  useEffect(() => {});

  const columns: ProColumns[] = [
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.customerId', defaultMessage: '客户编号' }),
      dataIndex: 'customerId',
      ellipsis: true,
      hideInDescriptions: true,
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.customerName', defaultMessage: '客户名称' }),
      dataIndex: 'customerName',
      ellipsis: true,
      tooltip: '只读，使用form.getFieldValue获取不到值',
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.avatarUrl', defaultMessage: '客户头像' }),
      dataIndex: 'avatarUrl',
      ellipsis: true,
      // valueType: 'avatar',
      // readonly: true
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.gender', defaultMessage: '客户性别' }),
      dataIndex: 'gender',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.corpName', defaultMessage: '企业名称' }),
      dataIndex: 'corpName',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.position', defaultMessage: '客户职位' }),
      dataIndex: 'position',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.unionId', defaultMessage: '微信标识' }),
      dataIndex: 'unionId',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.mobilePhone', defaultMessage: '手机号' }),
      dataIndex: 'mobilePhone',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.email', defaultMessage: '邮箱' }),
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.qq', defaultMessage: 'QQ号' }),
      dataIndex: 'qq',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.tenantId', defaultMessage: '租户号' }),
      dataIndex: 'tenantId',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.revision', defaultMessage: '乐观锁' }),
      dataIndex: 'revision',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.createdBy', defaultMessage: '创建人' }),
      dataIndex: 'createdBy',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.createdTime', defaultMessage: '创建时间' }),
      dataIndex: 'createdTime',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.updatedBy', defaultMessage: '更新人' }),
      dataIndex: 'updatedBy',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.updatedTime', defaultMessage: '更新时间' }),
      dataIndex: 'updatedTime',
      ellipsis: true,
    },
  ];

  const tableColumns: ProColumns[] = [
    ...take(columns, 5),
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.createdTime', defaultMessage: '创建时间' }),
      dataIndex: 'createdTime',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.tables.actions', defaultMessage: '操作' }),
      valueType: 'option',
      key: 'option',
      width: 200,
      render: (_, { customerId }) => [
        <a key="view" onClick={() => setPrimaryKey(customerId)}>
          {intl.formatMessage({ id: 'pages.tables.actions.view', defaultMessage: '查看' })}
        </a>,
        <a key="editable" onClick={() => setPrimaryKey(customerId)}>
          {intl.formatMessage({ id: 'pages.tables.actions.edit', defaultMessage: '编辑' })}
        </a>,
        <Popconfirm
          key="remove"
          title={intl.formatMessage({ id: 'pages.tables.actions.remove.tooltip', defaultMessage: '是否删除？' })}
          onConfirm={() => handleRemove(customerId)}
        >
          <a>{intl.formatMessage({ id: 'pages.tables.actions.remove', defaultMessage: '删除' })}</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<SysCustomer>
        size="small"
        rowSelection={{ selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT] }}
        columns={tableColumns}
        actionRef={tableRef}
        form={{ syncToUrl: true, syncToInitialValues: false }}
        request={handleFetchList}
        toolBarRender={actions}
        rowKey="customerId"
      />
      <ModalForm<CreateSysCustomer>
        title={intl.formatMessage({ id: 'pages.add.title', defaultMessage: '新增' })}
        size="small"
        formRef={formRef}
        open={editVisible}
        onOpenChange={setEditVisible}
        onFinish={handleAdd}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="customerName"
            tooltip="最长为 24 位"
            placeholder={intl.formatMessage({
              id: 'pages.sys_customer.columns.customerName.placeholder',
              defaultMessage: '外部联系人名称',
            })}
            rules={[
              { required: true, message: '请输入昵称!' },
              { type: 'string', max: 24 },
            ]}
            required
          />
          <ProFormText
            width="md"
            name="avatarUrl"
            placeholder={intl.formatMessage({
              id: 'pages.sys_customer.columns.avatarUrl.placeholder',
              defaultMessage: '外部联系人头像',
            })}
            rules={[
              { required: true, message: '请输入名称!' },
              { type: 'string', max: 24 },
            ]}
          />
        </ProForm.Group>
      </ModalForm>

      {!!primaryKey && (
        <Drawer width={600} open={true} closable={false} onClose={() => setPrimaryKey(0)} maskClosable>
          <ProDescriptions
            column={2}
            extra={false}
            layout="horizontal"
            title={intl.formatMessage({ id: 'pages.view.title', defaultMessage: '查看' })}
            request={handleFetch}
            params={{ primaryKey }}
            columns={columns as ProDescriptionsItemProps<SysCustomer>[]}
          />
        </Drawer>
      )}
    </PageContainer>
  );
};
export default SysCustomerView;
