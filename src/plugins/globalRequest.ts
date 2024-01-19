/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import {extend} from 'umi-request';
import {message} from 'antd';
import {history} from 'umi';
import {stringify} from "querystring";

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  // 指定每次请求的前缀：如果是生产环境，则请求生产环境的后端地址；
  // http://user-backend.code-nav.cn   http://106.53.192.192:8080
  prefix: process.env.NODE_ENV === 'production' ? 'http://106.53.192.192:8080' : undefined,
  credentials: 'include', // 默认请求是否带上cookie
  // requestType: 'form',
});

/**
 * 所有请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  //
  console.log(`Do request url = ${url}`)

  return {
    url,
    options: {
      ...options,
      headers: {
      },
    },
  };
});

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {

  const res = await response.clone().json();

  if (res.code === 0){
    return res.data;
  }
  // 任何地方出现“未登录”的错误：重定向到登录页
  if (res.code === 40100){
    message.error("请先登录！");
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: location.pathname,
      }),
    });
  }
  else{
    message.error(res.description);    // 所有的错误处理逻辑
  }
  return res.data;
});

export default request;
