import React,{ useState,useEffect } from "react";
import Link from 'next/link';
import {
  FormOutlined,
  ContainerOutlined,
  LogoutOutlined,
  CheckSquareOutlined,
  UserOutlined,
  UserAddOutlined 
} from '@ant-design/icons';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import Cookies from "js-cookie";
import Router from 'next/router';

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
  getItem('Create Entry', '2',<Link href="/entry"><FormOutlined /></Link>),
];


export const MainLayout = ({children}:{children:any}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [email, setEmail] = useState<any>("");

  useEffect(() =>{setEmail(Cookies.get("email"))}, []);

  return (
    <>
    <Layout >
      <Sider style={{ minHeight: '100vh', backgroundColor:''}}  collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{marginTop:60}}>
      <Menu.Item icon={<ContainerOutlined />}>
      <Link href="/dashboard"><a style={{textDecoration:'none'}}>Dashboard</a></Link>
      </Menu.Item>
      <Menu.Item icon={<FormOutlined />}>
      <Link href="/consultantInfo"><a style={{textDecoration:'none'}}>Consultant info</a></Link>
      </Menu.Item>
      <Menu.Item icon={<CheckSquareOutlined />}>
      <Link href="/history"><a style={{textDecoration:'none'}}>Mail history</a></Link>
      </Menu.Item>
      <Menu.Item icon={<UserOutlined />}>
      <Link href="/admin"><a style={{textDecoration:'none'}}>Administration</a></Link>
      </Menu.Item>
      <Menu.Item icon={<UserAddOutlined/>}>
      <Link href="/entry"><a style={{textDecoration:'none'}}>Add Consultant</a></Link>
      </Menu.Item>
      </Menu>
      </Sider>
      <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0}}>
      <img src={"logo.png"} className="img-fluid px-1" width={220} />
      <nav className="px-3" style={{float:"right", color:'white', backgroundColor:''}}>
      <span style={{position:'relative', top:3}}>{email}</span>
      <img className="header-admin-img mx-2" src={"admin.png"}/>
      </nav>
      <span 
       className="mx-3" style={{float:"right", color:'white', backgroundColor:'', cursor:'pointer'}}
       onClick={()=>{
         Cookies.remove('token');
         Cookies.remove('email');
         Cookies.remove('id');
         Router.push("/signin");
        }}>
      <LogoutOutlined style={{marginBottom:3, marginRight:5, fontSize:20}} />
      <span style={{position:'relative', top:3}}>Sign Out</span>
      </span> 
      </Header>
      <Content style={{ margin: '0 16px' }}>
        {collapsed && <span className="menu-toggler"><AiOutlineRight onClick={() => setCollapsed(!collapsed)} /></span>}
        {!collapsed && <span className="menu-toggler"><AiOutlineLeft onClick={() => setCollapsed(!collapsed)} /></span>}
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



