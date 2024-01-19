// 项目的全局入口文件
import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
// @ts-ignore
import {RequestConfig} from "@@/plugin-request/request";

const isDev = process.env.NODE_ENV === 'development';    // 判断是否为开发环境
const loginPath = '/user/login';
// WHILE_LIST: 无需登录态的页面
const WHILE_LIST = ['/user/register', loginPath];

// 修改request请求地址：添加前缀
export const request: RequestConfig = {
  // prefix: '/api',    // http://localhost:8080/api/ or /api
  timeout: 1000000,    // 连接超时时间
};

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * 页面每次加载/刷新都会执行这个方法
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  alert(process.env.NODE_ENV)    // 打印当前环境（development）
  // 定义函数fetchUserInfo: 获取当前用户信息，如果没获取到，则跳转到登录页面loginPath。
  const fetchUserInfo = async () => {
    try {
      // 调用接口（与后端交互），获取当前用户的信息
      const user = await queryCurrentUser();    // import {currentUser as queryCurrentUser}
      return user;
    } catch (error) {
      // history.push(loginPath);    当前用户信息不存在
    }
    return undefined;    // undefined：定义了变量，但是没有为其赋值，此时该变量的值就是undefined
  };

  // 如果页面无需登录态（在while list中），无需返回用户信息
  if (WHILE_LIST.includes(history.location.pathname)) {
    return {
      fetchUserInfo,    // undefined
      settings: defaultSettings,
    };
  }
  const currentUser = await fetchUserInfo();    // 存在登录态的页面（/welcome）
  return {
    fetchUserInfo,    // user: 当前用户信息
    currentUser,    // 当前用户信息
    settings: defaultSettings,
  };


}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {    // 水印
      content: initialState?.currentUser?.username,    // name -> username
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 解决重定向问题：定义白名单，排除跳转页是注册页面的情况
      // const WHILE_LIST = ['/user/register', loginPath];    // 作为全局常量
      if (WHILE_LIST.includes(location.pathname)){
        return;
      }
      // 如果没有登录，重定向到 login（每次页面切换，都会进行逻辑判断）
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: any, props: { location: { pathname: string | string[]; }; }) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
