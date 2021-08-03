import React from "react";
import ProTable from "@ant-design/pro-table";
import { PlusCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Button } from "antd";

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "议论间名字",
    dataIndex: "name",
  },
  {
    title: "applicationId",
    dataIndex: "applictionId",
  },
  {
    title: "applictionSecrit",
    dataIndex: "applictionSecrit",
  },
  {
    title: "productId",
    dataIndex: "productId",
  },
  {
    title: "deviceId",
    dataIndex: "deviceId",
  },
  {
    title: "msgId",
    dataIndex: "msgId",
  },
  {
    title: "ablity",
    dataIndex: "ablity",
  },
  {
    title: "service",
    dataIndex: "service",
  },
  {
    title: "操作",
    dataIndex: "operate",
    render: (text, record, index) => (
      <>
        <Button type="text">删除</Button>
      </>
    ),
  },
];

class MeetingRoom extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeetingRoomList = async () => {
    await this.props.MeetingRoomApi.getList();

    // map返回一个新数组,加上一个key属性,protable需要
    let data = [];
    this.props.MeetingRoomState.data.map((item, index) => {
      item.key = item.id;
      data.push(item);
    });
    return {
      data: data,
      success: true,
      total: this.props.MeetingRoomState.data.length,
    };
  };
  componentDidMount() {}
  render() {
    return (
      <>
        <ProTable
          search={false}
          options={false}
          columns={columns}
          toolbar={{
            actions: [
              <Button
                key="addRoom"
                shape="round"
                type="primary"
                icon={<PlusCircleOutlined />}
              >
                添加会议室
              </Button>,
            ],
          }}
          request={this.getMeetingRoomList}
          pagination={{
            size: "default",
            pageSize: 12,
          }}
        ></ProTable>
      </>
    );
  }
}

const mapState = (state) => ({
  MeetingRoomState: state.meetingRoom,
});
const mapDispatch = (dispatch) => ({
  MeetingRoomApi: dispatch.meetingRoom,
});

export default connect(mapState, mapDispatch)(MeetingRoom);
