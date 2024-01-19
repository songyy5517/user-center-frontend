// @ts-ignore
/* eslint-disable */

declare namespace API {
  /**
   * 通用返回类：用于对接后端
   */
  type BaseResponse<T> = {
    code: number;
    data: T;
    message: string;
    description: string;
  };

  type CurrentUser = {
    id:number;
    username:string;
    account:string;
    planetCode:string;
    avatarUrl?:string;    // 可以为空
    gender:number;
    // password:string;  不返回密码
    phone:string;
    email:string;
    status:number;
    userRole:number;
    createTime:Date;
    // updateTime    不返回更新时间
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  // 注册成功后返回用新用户的id
  type RegisterResult = number;

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    account?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    account?: string;    // '?'表示属性是可选的，没有该属性也是可以的
    password?: string;
    checkPassword?: string;
    planetCode?: string;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
