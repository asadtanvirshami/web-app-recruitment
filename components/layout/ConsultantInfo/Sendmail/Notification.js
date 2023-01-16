import {
    RadiusBottomleftOutlined,
    RadiusBottomrightOutlined,
    RadiusUpleftOutlined,
    RadiusUprightOutlined,
  } from '@ant-design/icons';
  import { Button, Divider, notification, Space } from 'antd';
  import React, { useMemo } from 'react';
  const Context = React.createContext({
    name: 'Default',
  });
  const Notification = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
      api.info({
        message: `Notification ${placement}`,
        description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
        placement,
      });
    };
    const contextValue = useMemo(
      () => ({
        name: 'Ant Design',
      }),
      [],
    );
    return (
      <Context.Provider value={contextValue}>
        {contextHolder}
        <Space>
   
        </Space>
        <Divider />
      </Context.Provider>
    );
  };
  export default Notification;