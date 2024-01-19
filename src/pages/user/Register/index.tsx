import {SYSTEM_LOGO} from "@/constants";
import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,

} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import styles from './index.less';  // Logo常量

// const LoginMessage: React.FC<{
//   content: string;
// }> = ({ content }) => (
//   <Alert
//     style={{
//       marginBottom: 24,
//     }}
//     message={content}
//     type="error"
//     showIcon
//   />
// );
const Register: React.FC = () => {
  // const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  // const fetchUserInfo = async () => {
  //   const userInfo = await initialState?.fetchUserInfo?.();
  //   if (userInfo) {
  //     await setInitialState((s) => ({
  //       ...s,
  //       currentUser: userInfo,
  //     }));
  //   }
  // };

  // 表单提交；为values增加了类型约束
  // async表示异步函数
  // values的类型是API.RegisterParams，password和checkPassword是values中的属性
  const handleSubmit = async (values: API.RegisterParams) => {
    // 校验
    const {password, checkPassword} = values;
    if (password !== checkPassword){
      message.error('两次输入的密码不一致！');
      return;
    }

    try {
      // 注册（执行注册方法）
      // const id = await register(values);    // 调用注册接口与后端交互，获取新用户的id
      const id = await register(values);    // 调用注册接口与后端交互，获取后端返回的BaseResponse对象

      if (id) {    // 状态码为0，代码正常运行；且id存在，说明注册成功
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        // await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        // 用户注册成功之后，跳转至登录页
        if (!history) return;    // history API没有初始化好，则直接return。
        const { query } = history.location;
        history.push({    // 跳转到指定路由
          pathname: 'user/login',
          query,
        })

        return;
      }

      // console.log(msg);
      // 如果失败去设置用户错误信息
      // setUserLoginState(user);
    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);    // ??是一个逻辑操作符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。
    }
  };

  // const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          // 将按钮文本改成“注册”
          submitter={{
            searchConfig:{
              submitText: '注册'
          }
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="用户中心系统"
          subTitle={'企业核心的用户管理系统，基于SpringBoot后端 + React前端的全栈项目'}
          initialValues={{
            autoLogin: true,
          }}

          // 表单提交；点击提交按钮（注册）会执行的方法
          // 表单项中的值和name会自动被转换成一个对象（values）
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账号密码注册'} />
            {/*<Tabs.TabPane key="mobile" tab={'手机号注册'} />*/}
          </Tabs>

          {/*{status === 'error' && loginType === 'account' && (*/}
          {/*  <LoginMessage content={'错误的账号和密码'} />*/}
          {/*)}*/}
          {type === 'account' && (
            <>
              <ProFormText
                name="account"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    message: '密码长度不能小于8位！',
                    type: 'string',
                    min: 8,
                  }
                ]}
              />
              {/*确认密码输入框*/}
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请再次输入密码'}    // 表单提示语
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    message: '密码长度不能小于8位！',
                    type: 'string',
                    min: 8,
                  }
                ]}
              />
              {/*星球编号输入框*/}
              <ProFormText.Password
                name="planetCode"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入星球编号'}    // 表单提示语
                rules={[      // 校验规则
                  {
                    required: true,      // 自动校验是否填写
                    message: '星球编号是必填项！',
                  },
                  {
                    message: '长度不能大于5位！',
                    type: 'string',
                    max: 5,
                  }
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            {/*<ProFormCheckbox noStyle name="autoLogin">*/}
            {/*  自动注册*/}
            {/*</ProFormCheckbox>*/}

            {/*<a*/}
            {/*  style={{*/}
            {/*    float: 'right',*/}
            {/*  }}*/}
            {/*  href={SYY_LINK}    // 跳转到页面*/}
            {/*  target="_blank"    // 在新页面中打开*/}
            {/*>*/}
            {/*  忘记密码请联系SYY*/}
            {/*</a>*/}
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
