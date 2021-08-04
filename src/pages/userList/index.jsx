import React from "react";
import { connect } from "react-redux";
import ProTable from "@ant-design/pro-table";
import { Button, Modal, Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.usersApi.getUserList();
  }
  getUserList = async () => {
    await this.props.usersApi.getUserList();

    // map返回一个新数组,加上一个key属性,protable需要
    let data = [];
    this.props.usersState.data.map((item, index) => {
      item.key = item.id;
      data.push(item);
    });
    return {
      data: data,
      success: true,
      total: this.props.usersState.data.length,
    };
  };
  deleteUserById(record) {
    Modal.confirm({
      title: "注意",
      content: `删除用户: ${record.userName} ?`,
      onOk: () => {
        this.props.usersApi.deleteUserById();
      },
    });
  }
  queryUser = (params, sort, fliter) => {
    // const queryResult = await this.props.usersApi.queryUser();
    const queryResult = {};
    console.log(params);
    console.log(sort);
    console.log(fliter);
    return {
      //   data: queryResult,
      data: [],
      success: true,
      total: 0,
    };
  };
  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
      },
      {
        title: "用户名",
        dataIndex: "userName",
      },
      {
        title: "手机号",
        dataIndex: "mobile",
      },
      {
        title: "密码",
        dataIndex: "password",
      },
      {
        title: "操作",
        render: (text, record, index) => (
          <>
            <Button
              type="text"
              danger
              onClick={this.deleteUserById.bind(this, record)}
            >
              删除
            </Button>
          </>
        ),
      },
    ];
    return (
      <>
        <ProTable
          options={false}
          toolbar={{
            actions: [
              <Button icon={<PlusCircleOutlined />}>添加</Button>,
              <Button type="primary">导入excel</Button>,
            ],
          }}
          tableAlertOptionRender={() => {
            return (
              <Space size={16}>
                <a>批量删除</a>
              </Space>
            );
          }}
          request={this.queryUser}
          rowKey="id"
          loading={this.props.loading}
          columns={columns}
          dataSource={this.props.usersState.data}
          pagination={{
            size: "default",
            pageSize: 12,
          }}
          rowSelection={{
            onChange: (e) => {
              console.log(e); //选中的id数组
            },
          }}
        ></ProTable>
      </>
    );
  }
}
const mapState = (state) => ({
  usersState: state.users,
  loading: state.loading.models.users,
});
const mapDispatch = (dispatch) => ({
  usersApi: dispatch.users,
});
export default connect(mapState, mapDispatch)(UserList);
