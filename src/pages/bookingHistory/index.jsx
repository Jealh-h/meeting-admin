import React, { useState } from "react";
import ProTable from "@ant-design/pro-table";
import { Button } from "antd";
import { connect } from "react-redux";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "日期",
    dataIndex: "day",
    valueType: "data",
  },
  {
    title: "时间段",
    dataIndex: "subscribeTime",
  },
  {
    title: "会议室名称",
    dataIndex: "roomName",
    render: (text, record, index) => `${record.meetingRoom.name}`,
  },
  {
    title: "状态",
    dataIndex: "status",
  },
  {
    title: "用户名称",
    dataIndex: "userName",
    render: (text, record, index) => `${record.meetingUsers?.userName}`,
  },
  {
    title: "操作",
    dataIndex: "operate",
    render: (text, record, index) => (
      <Button type="text" danger>
        删除
      </Button>
    ),
  },
  //   {
  //     title: "时间段",
  //     dataIndex: "address",
  //     valueType: "select",
  //     filters: true,
  //     onFilter: true,
  //     valueEnum: {
  //       london: {
  //         text: "伦敦",
  //       },
  //       "New York": {
  //         text: "纽约",
  //       },
  //     },
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     sorter: true,
  //     valueType: "option",
  //     render: () => [
  //       <a key="delete">Delete</a>,
  //       <a key="link" className="ant-dropdown-link">
  //         More actions <DownOutlined />
  //       </a>,
  //     ],
  //   },
];

const BookingHistory = (props) => {
  let data = [];
  async function getBookingHistory() {
    await props.meetingHistoryApi.getSubscribeList();
    props.meetingHistoryState.data.map((item, index) => {
      item.key = item.id;
      data.push(item);
    });
    return {
      data: data,
      success: true,
      total: data.length,
    };
  }
  function pushData() {
    data.push({
      key: 199,
      id: 199,
      day: "8-06",
      subscribeTime: "18:00-20:00",
      meetingRoom: {
        id: 1,
        name: "会议室2",
        subscribeHistoryIds: "",
        maxNum: 123,
        applictionId: "zljh864sfacklwl50q",
        applictionSecrit: "ulcklrtmnbcvc4qw6fqcs9p3263",
        productId: "5fv7p6fnag7m67w",
        deviceId: "JY01;JY219AB3A8CC86;86CCA8B39A21",
        msgId: 123,
        ablity: "open",
        service: '{"id":"123456"}',
      },
      status: "已预约",
      meetingUsers: {
        id: 30,
        userName: "5120173358",
        openId: null,
        mobile: "15681915887",
        role: null,
        password: "ty123/*/",
        isRegister: false,
      },
    });
  }
  return (
    <>
      <Button onClick={pushData}>push</Button>
      <ProTable
        search={false}
        columns={columns}
        options={false}
        request={getBookingHistory}
        pagination={{
          size: "default",
          pageSize: 12,
        }}
      />
    </>
  );
};

const mapState = (state) => ({
  meetingHistoryState: state.meetingHistory,
});
const mapDispatch = (dispatch) => ({
  meetingHistoryApi: dispatch.meetingHistory,
});
export default connect(mapState, mapDispatch)(BookingHistory);
