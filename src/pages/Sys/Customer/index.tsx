import services, { CreateSysCustomer, SysCustomer, UpdateSysCustomer } from '@/services/customer.service';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, BetaSchemaForm, PageContainer, ProColumns, ProFormColumnsType, ProFormInstance, ProFormUploadButton, ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import * as constants from '@/constants';

// 脚手架示例组件
const SysCustomerView: React.FC = () => {
  const intl = useIntl();
  const tableRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance<CreateSysCustomer>>();
  const viewContainerRef = useRef(null);
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

  const handleAdd = async (data: CreateSysCustomer) => {
    const val1 = await formRef.current?.validateFields();
    console.log('xxxx', val1);
    const { success } = await services.add(data);
    await tableRef.current?.reload();
    formRef.current?.resetFields();
    return success;
  };

  const handleSave = async (data: UpdateSysCustomer) => {
    const { success } = await services.update(data);
    await tableRef.current?.reload();
    return success;
  };

  const handleRemove = async (...idList: (string | number)[]) => {
    const { success } = await services.remove(...idList);
    tableRef.current?.reload();
    return success;
  };

  useEffect(() => {}, []);

  const createColumns: ProFormColumnsType[] = [
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.customerName', defaultMessage: '客户名称' }),
      dataIndex: 'customerName',
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
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.gender', defaultMessage: '客户性别' }),
      dataIndex: 'gender',
      valueType: 'select',
      valueEnum: constants.gender as any,
      convertValue: (v: any) => `${v}`,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.corpName', defaultMessage: '企业名称' }),
      dataIndex: 'corpName',
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.position', defaultMessage: '客户职位' }),
      dataIndex: 'position',
    },
  ];

  const updateColumns: ProFormColumnsType[] = [
    ...createColumns,
    {
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.customerId', defaultMessage: '客户编号' }),
      dataIndex: 'customerId',
      colProps: {
        style: { display: 'none' },
      },
      transform: (value: any) => Number(value) as any,
    },
  ];

  const tableColumns: ProColumns<SysCustomer>[] = [
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
      title: intl.formatMessage({ id: 'pages.sys_customer.columns.gender', defaultMessage: '客户性别' }),
      dataIndex: 'gender',
      ellipsis: true,
      valueEnum: constants.gender,
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
      title: intl.formatMessage({ id: 'pages.tables.actions', defaultMessage: '操作' }),
      valueType: 'option',
      key: 'option',
      width: 200,
      // render: (text, record, _, action) => [
      render: (_: any, row: SysCustomer) => actionsRow(row),
    },
  ];

  const actionsRow = (row: SysCustomer) => {
    return [
      <BetaSchemaForm<UpdateSysCustomer>
        key={row.customerId}
        title={intl.formatMessage({ id: 'pages.tables.actions.edit', defaultMessage: '编辑' })}
        layoutType={'DrawerForm'}
        // drawerProps={{ rootStyle: { position: 'absolute' }, getContainer: () => viewContainerRef.current! }}
        trigger={<a key="editable">{intl.formatMessage({ id: 'pages.tables.actions.edit', defaultMessage: '编辑' })}</a>}
        shouldUpdate={true}
        columns={updateColumns}
        rowProps={{ gutter: [16, 16] }}
        colProps={{ span: 12 }}
        grid={true}
        initialValues={row}
        onFinish={handleSave}
      />,
      <Popconfirm key="remove" title={intl.formatMessage({ id: 'pages.tables.actions.confirm', defaultMessage: '是否删除？' })} onConfirm={() => handleRemove(row.customerId)}>
        <a>{intl.formatMessage({ id: 'pages.tables.actions.remove', defaultMessage: '删除' })}</a>
      </Popconfirm>,
    ];
  };

  const actions = () => [
    <BetaSchemaForm<CreateSysCustomer>
      title={intl.formatMessage({ id: 'pages.add.title', defaultMessage: '新增' })}
      formRef={formRef}
      layoutType={'DrawerForm'}
      // drawerProps={{ rootStyle: { position: 'absolute' },getContainer: () => viewContainerRef.current! }}
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
      initialValues={{ gender: 0 }}
      onFinish={handleAdd}
    />,
  ];
  return (
    <div style={{ position: 'relative', display: 'block', boxSizing: 'border-box' }} ref={viewContainerRef}>
      <PageContainer>
        <ProTable<SysCustomer>
          rowKey="customerId"
          rowSelection={{ selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT] }}
          columns={tableColumns}
          actionRef={tableRef}
          form={{ syncToUrl: true, syncToInitialValues: false }}
          request={handleFetchList}
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
              <Popconfirm
                title={intl.formatMessage({ id: 'pages.tables.actions.confirm', defaultMessage: '是否删除？' })}
                onConfirm={() => handleRemove(...selectedRowKeys).then((q) => onCleanSelected())}
              >
                <a>批量删除</a>
              </Popconfirm>
              <a>导出数据</a>
            </Space>
          )}
        />
      </PageContainer>
    </div>
  );
};
export default SysCustomerView;
