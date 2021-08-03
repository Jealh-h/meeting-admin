import React from "react";
import { connect } from "react-redux";
import ProTable from "@ant-design/pro-table";
import { Button } from "antd";

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
    tilte: "手机号",
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
        <Button type="text">删除</Button>
      </>
    ),
  },
];

class UserList extends React.Component {
  constructor(props) {
    super(props);
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
  render() {
    return (
      <>
        <ProTable
          options={false}
          toolbar={{
            actions: [<Button>添加</Button>, <Button>导入excel</Button>],
          }}
          request={this.getUserList}
          columns={columns}
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
  usersState: state.users,
});
const mapDispatch = (dispatch) => ({
  usersApi: dispatch.users,
});
export default connect(mapState, mapDispatch)(UserList);
