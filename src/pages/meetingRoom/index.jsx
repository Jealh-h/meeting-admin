import React from "react";
import ProTable from "@ant-design/pro-table";
import {
  PlusCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { Button, message, Modal, Form, Input } from "antd";

import RoomForm from "../../components/roomForm";

class MeetingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      type: "", //用于确认form的提交函数
      editRowRecord: {},
    };
    this.roomFormRef = React.createRef();
  }

  getMeetingRoomList = async () => {
    await this.props.MeetingRoomApi.getList();

    return {
      data: this.props.MeetingRoomState.data,
      success: true,
      total: this.props.MeetingRoomState.data.length,
    };
  };
  componentDidMount() {
    this.props.MeetingRoomApi.getList();
    console.log(this.props.MeetingRoomState.data);
  }

  // 添加房间
  addMeetingRoom = () => {
    this.setState({
      open: true,
      type: "add",
    });
  };
  // 编辑房间
  editMeetingRoom = (record) => {
    this.setState({
      open: true,
      type: "edit",
      editRowRecord: record,
    });
  };
  // 根据id删除房间
  deleteRoom = (id) => {
    Modal.confirm({
      title: "注意",
      icon: <ExclamationCircleOutlined />,
      content: `是否删除${id.name}`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        message.success({
          content: "调用删除api",
        });
        // this.props.MeetingRoomApi.deleteRoom(id);
      },
    });
  };
  render() {
    const columns = [
      {
        title: "id",
        search: false,
        dataIndex: "id",
      },
      {
        title: "议论间名字",
        dataIndex: "name",
        valueType: "text",
      },
      {
        title: "applicationId",
        dataIndex: "applictionId",
      },
      {
        title: "最大容量",
        search: false,
        dataIndex: "maxNum",
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
        search: false,
        dataIndex: "service",
      },
      {
        title: "操作",
        search: false,
        valueType: "option",
        render: (text, record, index, action) => (
          <>
            <Button
              type="link"
              onClick={this.deleteRoom.bind(this, record)}
              danger
            >
              删除
            </Button>
            <Button
              type="link"
              key="editable"
              onClick={this.editMeetingRoom.bind(this, record)}
            >
              编辑
            </Button>
          </>
        ),
      },
    ];
    return (
      <>
        <ProTable
          search={false}
          options={false}
          columns={columns}
          loading={this.props.loading}
          dataSource={this.props.MeetingRoomState.data}
          rowKey="id"
          // size="small"
          scroll={{ x: "max-content" }}
          toolbar={{
            actions: [
              <Button
                key="addRoom"
                shape="round"
                type="primary"
                onClick={this.addMeetingRoom}
                icon={<PlusCircleOutlined />}
              >
                添加会议室
              </Button>,
            ],
          }}
          // request={()=>this.getMeetingRoomList}
          pagination={{
            size: "default",
            pageSize: 12,
          }}
        ></ProTable>
        <Modal
          title="添加会议室"
          footer={null}
          centered={true}
          destroyOnClose={true}
          onCancel={() =>
            this.setState({ open: false, editRowRecord: {}, type: "" })
          }
          visible={this.state.open}
        >
          <RoomForm
            type={this.state.type}
            editRowRecord={this.state.editRowRecord}
            addMethod={this.props.MeetingRoomApi.addRoom}
            editeMethod={this.props.MeetingRoomApi.updateRoom}
            closeModal={() => this.setState({ open: false })}
          />
        </Modal>
      </>
    );
  }
}

const mapState = (state) => ({
  MeetingRoomState: state.meetingRoom,
  loading: state.loading.models.meetingRoom,
});
const mapDispatch = (dispatch) => ({
  MeetingRoomApi: dispatch.meetingRoom,
});

export default connect(mapState, mapDispatch)(MeetingRoom);
