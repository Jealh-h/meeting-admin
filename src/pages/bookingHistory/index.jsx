import React, { useState, useEffect } from "react";
import ProTable from "@ant-design/pro-table";
import { Button, Modal } from "antd";
import { connect } from "react-redux";

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
  // 删除一条历史
  function deleteHistory(id) {
    Modal.confirm({
      content: "是否删除当前记录?",
      onOk: () => {
        props.meetingHistoryApi.deleteHistory(id);
      },
    });
  }
  const columns = [
    {
      title: "Id",
      search: false,
      dataIndex: "id",
    },
    {
      title: "日期",
      dataIndex: "day",
      valueType: "date",
    },
    {
      title: "时间段",
      search: false,
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
      search: false,
      dataIndex: "operate",
      render: (text, record, index) => (
        <Button onClick={() => deleteHistory(record.id)} type="text" danger>
          删除
        </Button>
      ),
    },
  ];
  return (
    <>
      <ProTable
        rowKey="id"
        // search={false}
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
