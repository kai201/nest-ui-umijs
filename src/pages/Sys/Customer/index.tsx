import React, { useState, useEffect, useRef } from 'react';
import { take } from 'lodash';
import { useIntl } from '@umijs/max';
import {
  PageContainer,
  ProTable,
  ProColumns,
  ActionType,
  ProFormInstance,
  BetaSchemaForm,
  ProFormUploadButton,
  ProFormColumnsType,
} from '@ant-design/pro-components';
import { Button, Table, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import services, { SysCustomer } from '@/services/customer.service';

// 脚手架示例组件
const SysCustomerView: React.FC = () => {
  const intl = useIntl();
  const tableRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const [editVisible, setEditVisible] = useState(false);
  const [primaryKey, setPrimaryKey] = useState(0);

  const handleFetch = async (params: any) => {
    if (!params.primaryKey) return;

    let { data, success } = await services.fetch(params.primaryKey);

    if (success) console.log(data);

    return data;
  };
  const handleFetchList = async (params: any, sort: any, filter: any) => {
    console.log(sort, filter);
    const { data, success, total } = await services.fetchList(params);
    // await tableRef.current?.reload();
    formRef.current?.resetFields();
    return { data, success, total };
  };
  const handleSave = async (pk: number, data: any) => {
    console.log('handleSave', `primaryKey = ${pk}`, data);
    // const { success } = await services.add(data);
    await tableRef.current?.reload();
    // return success;
    return true;
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

  useEffect(() => {}, []);

  const columns: (ProFormColumnsType | ProColumns)[] = [
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.customerId', defaultMessage: '客户编号' }),
      dataIndex: 'customerId',
      ellipsis: true,
      hideInDescriptions: true,
      hideInTable: true,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.customerName', defaultMessage: '客户名称' }),
      dataIndex: 'customerName',
      ellipsis: true,
      tooltip: '只读，使用form.getFieldValue获取不到值',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: intl.formatMessage({ id: 'pages.sys_customer.columns.customerName.required' }),
          },
        ],
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.avatarUrl', defaultMessage: '客户头像' }),
      dataIndex: 'avatarUrl',
      ellipsis: true,
      valueType: 'text',
      renderFormItem: (schema: any, config: any, form: any) => {
        console.log('schema -> ', schema);
        console.log('config -> ', config);
        console.log('form -> ', form);
        return <ProFormUploadButton action="action.do" onChange={(v) => console.log(v)} />;
      },
      // request: async (params, props) => Promise.reject({}),
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
    ...take(columns, 5) as any,
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
        <a
          key="editable"
          onClick={() => {
            setPrimaryKey(customerId);
            setEditVisible(true);
          }}
        >
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

      <BetaSchemaForm
        layoutType={'DrawerForm'}
        open={editVisible}
        onOpenChange={setEditVisible}
        columns={columns as any}
        params={{ primaryKey }}
        request={primaryKey ? handleFetch : undefined}
        rowProps={{
          gutter: [16, 16],
        }}
        colProps={{
          span: 12,
        }}
        grid={true}
        submitter={{ onSubmit: (x) => handleSave(primaryKey, x) }}
      />
    </PageContainer>
  );
};
export default SysCustomerView;
