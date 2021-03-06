import React from "react";
import {
  UserOutlined,
  FormOutlined,
  HomeOutlined,
  ClockCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export default {
  route: {
    path: "/index/meeting-room",
    routes: [
      {
        path: "/index/meeting-room",
        name: "会议室管理",
        icon: <HomeOutlined />,
      },
      {
        path: "/index/user-list",
        name: "用户管理",
        icon: <UserOutlined />,
        access: "canAdmin",
      },
      {
        path: "/index/booking-history",
        name: "预约历史",
        icon: <ClockCircleOutlined />,
      },
      {
        path: "index/admin-setting",
        name: "个人设置",
        icon: <SettingOutlined />,
      },
      {
        path: "index/feedback",
        name: "反馈",
        icon: <FormOutlined />,
      },
    ],
  },
  location: {
    pathname: "/index/meeting-room",
  },
};
