import React, { useState } from "react";
import { Button, Descriptions, Result, Avatar, Dropdown, Menu } from "antd";
import { Switch, Route, Link } from "react-router-dom";
import {
  PlusCircleOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import ProLayout, {
  PageContainer,
  SettingDrawer,
} from "@ant-design/pro-layout";

import defaultProps from "./_defaultProps";
import BookingHistory from "./bookingHistory/index";
import MeetingRoom from "./meetingRoom";
import "./index.less";

const UserMenu = (
  <Menu>
    <Menu.Item key="1" icon={<UserOutlined />}>
      个人中心
    </Menu.Item>
    <Menu.Item key="2" icon={<SettingOutlined />}>
      个人设置
    </Menu.Item>
    <Menu.Item key="3" icon={<LogoutOutlined />}>
      退出登录
    </Menu.Item>
  </Menu>
);

export default () => {
  const [settings, setSetting] = useState({ fixSiderbar: false });
  const [pathname, setPathname] = useState("/index/meeting-room");
  return (
    <div
      id="test-pro-layout"
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        {...defaultProps}
        title="校园会议室"
        logo="https://wx.qlogo.cn/mmhead/Q3auHgzwzM53cxTn0SXNGGHOFEwpxZGpc7nbz4tjt6sdpbEWYEicewA/0"
        location={{
          pathname,
        }}
        // loading={true}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <Link
            onClick={() => {
              setPathname(item.path || "/index/meeting-room");
            }}
            to={item.path}
          >
            {dom}
          </Link>
        )}
        rightContentRender={() => (
          <div style={{ marginRight: "5em" }}>
            <Dropdown overlay={UserMenu} placement="bottomCenter">
              <Avatar shape="square" size="small" icon={<UserOutlined />} />
            </Dropdown>
          </div>
        )}
        {...settings}
      >
        <PageContainer
          //   content={content}
          tabList={[
            {
              tab: "基本信息",
              key: "base",
            },
            {
              tab: "详细信息",
              key: "info",
            },
          ]}
          extra={[
            <Button
              key="addRoom"
              shape="round"
              type="primary"
              icon={<PlusCircleOutlined />}
            >
              添加会议室
            </Button>,
            <Button key="2">操作</Button>,
            <Button key="1" type="primary">
              主操作
            </Button>,
          ]}
        >
          <div
            style={{
              height: "120vh",
            }}
          >
            <Switch>
              <Route
                exact
                path="/index/meeting-room"
                component={MeetingRoom}
              ></Route>
              <Route
                exact
                path="/index/booking-history"
                component={BookingHistory}
              ></Route>
            </Switch>
          </div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
