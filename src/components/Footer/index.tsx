import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = 'SYY出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Knowledge Planet',
          title: '知识星球',
          href: 'https://wx.zsxq.com/dweb2/index/group/51122858222824',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> SYY Github</>,  // <GithubOutlined />表示Githhub图标，只是一个子标签，必须要有父标签来包裹
          href: 'https://github.com/songyy5517',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
