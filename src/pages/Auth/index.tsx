import {
  AlipayCircleOutlined,
  LockOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, FormattedMessage, SelectLang, useIntl, useModel } from '@umijs/max';
import { useLocalStorageState } from 'ahooks';
import React from 'react';
import { flushSync } from 'react-dom';

import Footer from '@/components/Footer';
import * as service from '@/services/auth.service';
import { message } from 'antd';

const ActionIcons = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    };
  });

  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={langClassName} />
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={langClassName} />
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={langClassName} />
    </>
  );
};

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

// const LoginMessage: React.FC<{ content: string }> = ({ content }) => {
//   return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
// };

const Login: React.FC = () => {
  let [, setAccessToken] = useLocalStorageState<string>('token', { serializer: (v) => v, deserializer: (v) => v });

  const { initialState, setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage: "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  const intl = useIntl();
  const fetchUser = async () => {
    const u = await initialState?.fetchUser?.();
    if (u) {
      flushSync(() => {
        setInitialState((s) => ({ ...s, currentUser: u }));
      });
    }
  };
  const handleSubmit = async (us: service.AuthUser) => {
    const res = await service.auth(us);
    if (!res.success) return message.error(res.message);

    setAccessToken(res.data);
    await fetchUser();
    const urlParams = new URL(window.location.href).searchParams;
    history.push(urlParams.get('redirect') || '/');
  };

  return (
    <>
      <div className={containerClassName}>
        <Lang />
        <div style={{ flex: '1', padding: '80px 0' }}>
          <LoginForm<service.AuthUser>
            contentStyle={{ minWidth: 280, maxWidth: '75vw' }}
            logo={<img alt="logo" src="https://preview.pro.ant.design/logo.svg" />}
            title="Ant Design"
            subTitle={intl.formatMessage({
              id: 'pages.layouts.userLayout.title',
              defaultMessage: 'Ant Design 是西湖区最具影响力的 Web 设计规范',
            })}
            initialValues={{ autoLogin: true }}
            actions={[
              <FormattedMessage key="loginWith" id="pages.login.loginWith" defaultMessage="其他登录方式" />,
              <ActionIcons key="icons" />,
            ]}
            onFinish={async (values) => {
              await handleSubmit(values);
            }}
          >
            {/* <LoginMessage content={intl.formatMessage({ id: 'pages.login.accountLogin.errorMessage', defaultMessage: '账户或密码错误(admin/ant.design)', })} /> */}

            <>
              <ProFormText
                name="userName"
                fieldProps={{ size: 'large', prefix: <UserOutlined /> }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '用户名: admin or user',
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.username.required" defaultMessage="请输入用户名!" />,
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '密码: ant.design',
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.password.required" defaultMessage="请输入密码！" />,
                  },
                ]}
              />
            </>
          </LoginForm>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;
