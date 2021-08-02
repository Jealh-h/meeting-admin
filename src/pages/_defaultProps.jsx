import React from "react";
import {
  UserOutlined,
  AntDesignOutlined,
  HomeOutlined,
  ClockCircleOutlined,
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
        path: "https://ant.design",
        name: "Ant Design 官网外链",
        icon: <AntDesignOutlined />,
      },
    ],
  },
  location: {
    pathname: "/index/meeting-room",
  },
};
