import React, { useEffect, useRef } from 'react';
import { useIntl } from '@umijs/max';
import { DrawerForm, ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';

interface EditProps {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  // onFinish?: void;
}
// 脚手架示例组件
const EditView: React.FC = (props: EditProps) => {
  const formRef = useRef<ProFormInstance>();
  const intl = useIntl();

  // const onClick = function () {};
  useEffect(() => {
    console.log('useEffect', props);
  });

  return (
    <>
      <DrawerForm
        formRef={formRef}
        open={false}
        title={intl.formatMessage({ id: 'pages.add.title', defaultMessage: '新增' })}
        size="small"
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="nickName"
            tooltip="最长为 24 位"
            label={intl.formatMessage({ id: 'pages.user.nickName.placeholder', defaultMessage: '昵称' })}
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
            label={intl.formatMessage({ id: 'pages.user.userName.placeholder', defaultMessage: '名称' })}
            placeholder={intl.formatMessage({ id: 'pages.user.userName.placeholder', defaultMessage: '名称' })}
            rules={[
              { required: true, message: '请输入名称!' },
              { type: 'string', max: 24 },
            ]}
          />
        </ProForm.Group>
      </DrawerForm>
    </>
  );
};
export default EditView;
