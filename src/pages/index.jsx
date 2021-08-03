import React, { useState } from "react";
import { Button, Avatar, Dropdown, Menu } from "antd";
import { Switch, Route, Link } from "react-router-dom";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import ProLayout, { PageContainer } from "@ant-design/pro-layout";
import { useSelector } from "react-redux";

import defaultProps from "./_defaultProps";
import BookingHistory from "./bookingHistory/index";
import MeetingRoom from "./meetingRoom";
import UserList from "./userList";
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

export default (props) => {
  const [settings, setSetting] = useState({ fixSiderbar: false });
  //页面初始location
  const [pathname, setPathname] = useState("/index/meeting-room");
  const isLoading = useSelector((rootState) => rootState.loading.global);
  return (
    <div
      id="test-pro-layout"
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        {...defaultProps}
        // loading={isLoading}
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
        <PageContainer>
          <div
            style={{
              height: "120vh",
            }}
          >
            {/* 路由 */}
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
              <Route exact path="/index/user-list" component={UserList}></Route>
            </Switch>
          </div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
