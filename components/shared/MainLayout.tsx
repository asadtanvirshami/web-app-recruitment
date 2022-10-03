import React,{ useState,useEffect } from "react";
import {
  CarryOutOutlined,
  ContainerOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import CooKies from "js-cookie";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Recruitment', '1',<Link href="/home"><ContainerOutlined/></Link>),
  getItem('Create Entry', '2',<Link href="/entry"><CarryOutOutlined/></Link>),
  getItem('Team', 'sub2', <TeamOutlined />),
];


export const MainLayout = ({children}:{children:React.ReactNode}) => {
  const [collapsed, setCollapsed] = useState(true);
  const [email, setEmail] = useState<any>("");

  useEffect(() =>{setEmail(CooKies.get("email"))}, []);

  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}  style={{marginTop:60}}/>
      </Sider>
      <Layout className="site-layout">
      <Header className="site-layout-background px-3" style={{ padding: 0}}>
      <nav className="" style={{float:"right", color:'white', backgroundColor:''}}><p className="mx-4">Logout</p></nav> 
      <nav className="" style={{float:"right", color:'white', backgroundColor:''}}>{email}
      <img className="header-admin-img mx-2" src={"admin.png"}/>
      </nav>
      </Header>
      <Content style={{ margin: '0 16px' }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      {children}
      </div>
      </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;



