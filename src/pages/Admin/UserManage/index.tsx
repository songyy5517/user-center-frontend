import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { useRef } from 'react';
import {searchUsers} from "@/services/ant-design-pro/api";
import {Image} from "antd";
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

// type GithubIssueItem = {
//   url: string;
//   id: number;
//   number: number;
//   title: string;
//   labels: {
//     name: string;
//     color: string;
//   }[];
//   state: string;
//   comments: number;
//   created_at: string;
//   updated_at: string;
//   closed_at?: string;
// };

// 定义了表格中展示列的各个属性；之后会被传给高级表单ProTable
const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',    // dataIndex应该与后台返回对象的属性名相对应
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '账号',    // 显示的列名
    dataIndex: 'account',
    copyable: true,    // 可复制？
  },
  {
    title: '用户名',    // 显示的列名
    dataIndex: 'username',
    copyable: true,    // 可复制？
  },

  {
    title: '头像',    // 显示的列名
    dataIndex: 'avatarUrl',
    // 渲染成图片
    // _仅表示站位，不会真正用到该参数；record标识表格中的行
    // img->Image组件（Ant design自带的组件）
    render:(_, record) => (
      <div>
        <Image src={record.avatarUrl} width={50} height={50}/>
      </div>
    )
  },
  {
    title: '性别',    // 显示的列名
    dataIndex: 'gender',
  },
  {
    title: '手机号',    // 显示的列名
    dataIndex: 'phone',
    copyable: true,    // 可复制？
  },
  {
    title: '邮箱',    // 显示的列名
    dataIndex: 'email',
    copyable: true,    // 可复制？
  },
  {
    title: '状态',    // 显示的列名
    dataIndex: 'status',
  },
  {
    title: '星球编号',    // 显示的列名
    dataIndex: 'planetCode',
    copyable: true,    // 可复制？
  },
  {
    title: '用户权限',    // 显示的列名
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '普通用户',
        status: 'Default',  // 不同status对应不用颜色的字体: Success(绿)，Default（灰），Error（红）
      },
      1: {
        text: '管理员',
        status: 'Error',
      },
    },
  },
  {
    title: '创建时间',    // 显示的列名
    dataIndex: 'createTime',
    valueType: 'dateTime',    // 声明这列的类型，默认类型为字符串
  },
  // {
  //   disable: true,
  //   title: '状态',
  //   dataIndex: 'state',
  //   filters: true,
  //   onFilter: true,
  //   ellipsis: true,
  //   valueType: 'select',
  //   valueEnum: {
  //     all: { text: '超长'.repeat(50) },
  //     open: {
  //       text: '未解决',
  //       status: 'Error',
  //     },
  //     closed: {
  //       text: '已解决',
  //       status: 'Success',
  //       disabled: true,
  //     },
  //     processing: {
  //       text: '解决中',
  //       status: 'Processing',
  //     },
  //   },
  // },
  // {
  //   disable: true,
  //   title: '标签',
  //   dataIndex: 'labels',
  //   search: false,
  //   renderFormItem: (_, { defaultRender }) => {
  //     return defaultRender(_);
  //   },
  //   render: (_, record) => (
  //     <Space>
  //       {record.labels.map(({ name, color }) => (
  //         <Tag color={color} key={name}>
  //           {name}
  //         </Tag>
  //       ))}
  //     </Space>
  //   ),
  // },
  // {
  //   title: '创建时间',
  //   key: 'showTime',
  //   dataIndex: 'created_at',
  //   valueType: 'date',
  //   sorter: true,
  //   hideInSearch: true,
  // },
  // {
  //   title: '创建时间',
  //   dataIndex: 'created_at',
  //   valueType: 'dateRange',
  //   hideInTable: true,
  //   search: {
  //     transform: (value) => {
  //       return {
  //         startTime: value[0],
  //         endTime: value[1],
  //       };
  //     },
  //   },
  // },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      //  request：从后台获取数据，返回值会自动填充到表单中
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        const userList = await searchUsers();    // 与后台交互，获取查询的用户信息
        return {
          data: userList
        }
        // return request<{
        //   data: CurrentUser[];    // 返回值类型：CurrentUser列表
        // }>('https://proapi.azurewebsites.net/github/issues', {
        //   params,
        // });
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        // <Button
        //   key="button"
        //   icon={<PlusOutlined />}
        //   onClick={() => {
        //     actionRef.current?.reload();
        //   }}
        //   type="primary"
        // >
        //   新建
        // </Button>,
        // <Dropdown
        //   key="menu"
        //   menu={{
        //     items: [
        //       {
        //         label: '1st item',
        //         key: '1',
        //       },
        //       {
        //         label: '2nd item',
        //         key: '1',
        //       },
        //       {
        //         label: '3rd item',
        //         key: '1',
        //       },
        //     ],
        //   }}
        // >
        //   <Button>
        //     <EllipsisOutlined />
        //   </Button>
        // </Dropdown>,
      ]}
    />
  );
};
