import React, { useState, useEffect } from "react";
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
  // useEffect第二个参数[]
  // 当数组存在并有值时，如果数组中的任何值发生更改，则每次渲染后都会触发回调。
  // 当它不存在时，每次渲染后都会触发回调。
  // 当它是一个空列表时，回调只会被触发一次，类似于 componentDidMount。
  useEffect(() => {
    getBookingHistory();
  }, []);

  function getBookingHistory() {
    props.meetingHistoryApi.getSubscribeList();
  }
  return (
    <>
      <ProTable
        rowKey="id"
        search={false}
        columns={columns}
        options={false}
        loading={props.loading}
        dataSource={props.meetingHistoryState.data}
        // request={getBookingHistory}
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
  loading: state.loading.models.meetingHistory,
});
const mapDispatch = (dispatch) => ({
  meetingHistoryApi: dispatch.meetingHistory,
});
export default connect(mapState, mapDispatch)(BookingHistory);
