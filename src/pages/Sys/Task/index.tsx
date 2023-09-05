import CodeMirror from '@/components/CodeMirror';
import services, { CreateSysTask, SysTask, UpdateSysTask } from '@/services/task.sesrvice';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, BetaSchemaForm, PageContainer, ProColumns, ProFormColumnsType, ProFormInstance, ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Popconfirm, Table } from 'antd';
import React, { useRef } from 'react';
const statusEnum = {
  '1': { text: '启用', status: 'Success' },
  '0': { text: '停用', status: 'Error' },
};

// 脚手架示例组件
const SysTaskView: React.FC = () => {
  const intl = useIntl();
  const tableRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

  const createColumns: ProFormColumnsType<CreateSysTask>[] = [
    {
      title: intl.formatMessage({ id: 'pages.sys_task.columns.expression', defaultMessage: '表达式' }),
      dataIndex: 'expression',
      formItemProps: {
        rules: [
          { required: true, message: '此项为必填项' },
          { pattern: /(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\d+(ns|us|µs|ms|s|m|h))+)|((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7})/, message: '时间格式错误' },
        ],
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_task.columns.status', defaultMessage: '状态' }),
      dataIndex: 'status',
      initialValue: `1`,
      valueEnum: statusEnum,
      convertValue: (v: any) => `${v}`,
      transform: (value: any) => Number(value) as any,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_task.columns.runScript', defaultMessage: '执行脚本' }),
      dataIndex: 'runScript',
      valueType: 'textarea',
      renderFormItem: () => <CodeMirror language="javascript" />,
      colProps: {},
    },
  ];

  const updateColumns: ProFormColumnsType<UpdateSysTask>[] = [
    {
      title: intl.formatMessage({ id: 'pages.sys_task.columns.taskId', defaultMessage: '任务编号' }),
      dataIndex: 'taskId',
      transform: (value: any) => Number(value) as any,
      colProps: {
        style: { display: 'none' },
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_task.columns.expression', defaultMessage: '表达式' }),
      dataIndex: 'expression',
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_task.columns.status', defaultMessage: '状态' }),
      dataIndex: 'status',
      valueEnum: statusEnum,
      convertValue: (v: any) => `${v}`,
      transform: (value: any) => Number(value) as any,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_task.columns.runScript', defaultMessage: '执行脚本' }),
      dataIndex: 'runScript',
      valueType: 'textarea',
      renderFormItem: () => <CodeMirror language="javascript" />,
      colProps: {},
    },
  ];

  const tableColumns: ProColumns<SysTask>[] = [
    {
      title: intl.formatMessage({ id: 'pages.sys_task.columns.taskId', defaultMessage: '任务编号' }),
      dataIndex: 'taskId',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_task.columns.expression', defaultMessage: '表达式' }),
      dataIndex: 'expression',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_task.columns.runTime', defaultMessage: '执行时间' }),
      dataIndex: 'runTime',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.sys_task.columns.status', defaultMessage: '状态' }),
      dataIndex: 'status',
      ellipsis: true,
      valueEnum: statusEnum,
    },
    {
      title: intl.formatMessage({ id: 'pages.tables.actions', defaultMessage: '操作' }),
      valueType: 'option',
      key: 'option',
      width: 200,
      render: (_: any, row: SysTask) => actionsRow(row),
    },
  ];

  const handleFetchList = async (params: any, sort: any, filter: any) => {
    const { data, success, total } = await services.fetchList(params);
    return { data, success, total };
  };
  const handleAdd = async (data: any) => {
    const { success } = await services.add(data);
    await tableRef.current?.reload();
    formRef.current?.resetFields();
    return success;
  };
  const handleSave = async (data: UpdateSysTask) => {
    const { success } = await services.update(data);
    await tableRef.current?.reload();
    return success;
  };
  const handleRemove = async (...idList: (string | number)[]) => {
    const { success } = await services.remove(...idList);
    tableRef.current?.reload();
    return success;
  };

  const actionsRow = (row: UpdateSysTask) => {
    return [
      <BetaSchemaForm<UpdateSysTask>
        key={row.taskId}
        title={intl.formatMessage({ id: 'pages.tables.actions.edit', defaultMessage: '编辑' })}
        layoutType={'DrawerForm'}
        trigger={<a key="editable">{intl.formatMessage({ id: 'pages.tables.actions.edit', defaultMessage: '编辑' })}</a>}
        shouldUpdate={true}
        columns={updateColumns}
        rowProps={{ gutter: [16, 16] }}
        colProps={{ span: 12 }}
        grid={true}
        initialValues={row}
        onFinish={handleSave}
      />,
      <Popconfirm key="remove" title={intl.formatMessage({ id: 'pages.tables.actions.confirm', defaultMessage: '是否删除？' })} onConfirm={() => handleRemove(row.taskId)}>
        <a>{intl.formatMessage({ id: 'pages.tables.actions.remove', defaultMessage: '删除' })}</a>
      </Popconfirm>,
    ];
  };

  const actions = () => [
    <BetaSchemaForm<CreateSysTask>
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
      initialValues={{ gender: 0 }}
      onFinish={handleAdd}
    />,
  ];
  return (
    <PageContainer>
      <ProTable
        size="small"
        actionRef={tableRef}
        rowSelection={{ selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT] }}
        form={{ syncToUrl: true, syncToInitialValues: false }}
        columns={tableColumns}
        toolBarRender={actions}
        request={handleFetchList}
        rowKey="taskId"
      />
    </PageContainer>
  );
};
export default SysTaskView;
