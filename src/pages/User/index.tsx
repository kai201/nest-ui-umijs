import React, { useState, useEffect } from 'react';
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

import * as services from '@/services/user.service';

// 脚手架示例组件
const UserView: React.FC = () => {
  const intl = useIntl();
  const [editVisible, setEditVisible] = useState(false);

  const columns: ProColumns<services.SysUser>[] = [
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
    <Button key="button1" icon={<PlusOutlined />} type="primary" onClick={() => services.list({})}>
      {intl.getMessage('btn.test', 'Test')}
    </Button>,
  ];

  const btnSubmitClick = async (data: any) => {
    console.log(data);
    return true;
  };
  const handleFetch = async (params: any, sort: any, filter: any) => {
    const { data, success } = await services.list(params);
    console.log('sort -------->', sort);
    console.log('filter ------>', filter);
    console.log('params ------>', params);
    console.log('data ------>', data);
    return { data, success };
  };

  useEffect(() => {});

  return (
    <PageContainer>
      <ProTable
        size="small"
        columns={columns}
        request={handleFetch}
        form={{ syncToUrl: true, syncToInitialValues: false }}
        toolBarRender={actions}
      />
      <ModalForm<services.CreateUser>
        title={intl.getMessage('user.modal.add.title', '新增')}
        size="small"
        open={editVisible}
        onOpenChange={setEditVisible}
        onFinish={btnSubmitClick}
      >
        <ProForm.Group>
          <ProFormText width="md" name="nickName" label="昵称" tooltip="最长为 24 位" placeholder="请输入名称" />
          <ProFormText width="md" name="userName" label="用户名" placeholder="请输入名称" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="email" label="邮箱" tooltip="最长为 24 位" placeholder="请输入名称" />
          <ProFormText width="md" name="phoneNumber" label="手机号" placeholder="请输入名称" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect width="md" options={[]} name="gender" label="性别" />
          <ProFormSelect width="md" options={[]} name="status" label="状态" />
        </ProForm.Group>
      </ModalForm>
    </PageContainer>
  );
};

export default UserView;
