import React,{ useState,useEffect } from "react";
import Link from 'next/link';
import {
  CarryOutOutlined,
  ContainerOutlined,
  TeamOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import Cookies from "js-cookie";
import Router,{ useRouter } from 'next/router';

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
  getItem('Recruitment', '1',<Link href="/dashboard"><ContainerOutlined/></Link>),
  getItem('Create Entry', '2',<Link href="/entry"><CarryOutOutlined/></Link>),
  getItem('Team', 'sub2', <TeamOutlined />),
];


export const MainLayout = ({children}:{children:any}) => {
  const [collapsed, setCollapsed] = useState(true);
  const [email, setEmail] = useState<any>("");

  useEffect(() =>{setEmail(Cookies.get("email"))}, []);

  return (
    <>
    <Layout >
      <Sider style={{ minHeight: '100vh'}} collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}  style={{marginTop:60}}/>
      </Sider>
      <Layout className="site-layout">
      <Header className="site-layout-background px-3" style={{ padding: 0}}>
      <nav className="" style={{float:"right", color:'white', backgroundColor:''}}>
      <span style={{position:'relative', top:3}}>{email}</span>
      <img className="header-admin-img mx-2" src={"admin.png"}/>
      </nav>
      <span 
       onClick={()=>{
        Cookies.remove('token');
        Cookies.remove('email');
        Cookies.remove('id');
        Router.push('/signin')
      }}
      className="mx-3" style={{float:"right", color:'white', backgroundColor:''}}>
      <LogoutOutlined style={{marginBottom:3, marginRight:5, fontSize:20}} />
      <span style={{position:'relative', top:3}}>Sign Out</span>
      </span> 
      </Header>
      <Content style={{ margin: '0 16px' }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <>{children}</>
      </div>
      </Content>
      </Layout>
    </Layout>
    </>
  );
};
export default MainLayout;



