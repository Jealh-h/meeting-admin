import { useState } from "react";
import { Avatar, Dropdown, Menu, Layout, message } from "antd";
import { Switch, Route, Link } from "react-router-dom";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import ProLayout, {
  PageContainer,
  DefaultFooter,
} from "@ant-design/pro-layout";
import { useSelector } from "react-redux";

import defaultProps from "./_defaultProps";
import BookingHistory from "./bookingHistory/index";
import MeetingRoom from "./meetingRoom";
import UserList from "./userList";
import Setting from "./setting";
import FeedBack from "./feedback";
import "./index.less";
import { useEffect } from "react";

const { Footer } = Layout;

function handleMenuClick(e) {
  console.log(e);
}

const UserMenu = (
  <Menu onClick={handleMenuClick}>
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
  useEffect(() => {
    const adminInfo = window.sessionStorage.getItem("admin");
    if (adminInfo === undefined || adminInfo === "") {
      message.warn({
        content: "请登录",
        duration: 0.5,
        onClose: () => {
          window.location.href = "/";
        },
      });
    }
  }, []);
  const [settings, setSetting] = useState({ fixSiderbar: false });
  //页面初始location
  const [pathname, setPathname] = useState(window.location.pathname);
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
        footerRender={() => (
          <DefaultFooter
            links={[
              {
                key: "labLink",
                title: "数据与知识工程实验室",
                href: "http://iteach.swust.edu.cn/",
              },
            ]}
            copyright="SWUST 计算机科学与技术学院"
          />
          // <Footer
          //   copyright="@2019 蚂蚁金服体验技术部出品"
          //   links={[
          //     {
          //       key: "Ant Design Pro",
          //       title: "Ant Design Pro",
          //       href: "https://pro.ant.design",
          //       blankTarget: true,
          //     },
          //     {
          //       key: "github",
          //       title: <GithubOutlined />,
          //       href: "https://github.com/ant-design/ant-design-pro",
          //       blankTarget: true,
          //     },
          //     {
          //       key: "Ant Design",
          //       title: "Ant Design",
          //       href: "https://ant.design",
          //       blankTarget: true,
          //     },
          //   ]}
          // />
        )}
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
          <div style={{ marginRight: "10%" }}>
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
              <Route
                exact
                path="/index/admin-setting"
                component={Setting}
              ></Route>
              <Route exact path="/index/feedback" component={FeedBack}></Route>
            </Switch>
          </div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
