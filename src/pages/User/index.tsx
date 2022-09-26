import React, { useState } from 'react';
import {
  PageContainer,
  ProTable,
  ProColumns,
  ProForm,
  ProFormSelect,
  ProFormText,
  ModalForm,
  useIntl,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// 脚手架示例组件
const UserView: React.FC = () => {
  const intl = useIntl();
  const [editVisible, setEditVisible] = useState(false);

  const columns: ProColumns[] = [
    { title: intl.getMessage('user.label.table_0', '用户名称'), dataIndex: 'x', ellipsis: true, width: 200 },
    {
      title: intl.getMessage('user.label.table_1', '用户昵称'),
      dataIndex: 'y',
      search: false,
      ellipsis: true,
    },
    {
      title: intl.getMessage('user.label.table_2', '创建时间'),
      key: 'showTime',
      dataIndex: 'created_at',
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

  const btnSubmitClick = async (data: any) => {
    console.log(data);
    return true;
  };

  return (
    <PageContainer>
      <ProTable
        size="small"
        columns={columns}
        form={{ syncToUrl: true, syncToInitialValues: false }}
        toolBarRender={actions}
      />
      <ModalForm
        title={intl.getMessage('user.modal.add.title', '新增')}
        size="small"
        open={editVisible}
        onOpenChange={setEditVisible}
        onFinish={btnSubmitClick}
      >
        <ProForm.Group>
          <ProFormText width="md" name="name" label="签约客户名称" tooltip="最长为 24 位" placeholder="请输入名称" />
          <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect width="xs" options={[]} name="useMode" label="合同约定生效方式" />
          <ProFormSelect width="xs" options={[]} name="unusedMode" label="合同约定失效效方式" />
        </ProForm.Group>
      </ModalForm>
    </PageContainer>
  );
};

export default UserView;
