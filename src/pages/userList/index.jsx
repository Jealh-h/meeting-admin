import React from "react";
import { connect } from "react-redux";
import ProTable from "@ant-design/pro-table";
import { Button, Modal, Space, message, Upload } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ModalForm, ProFormText } from "@ant-design/pro-form";

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
class UserList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.usersApi.getUserList();
  }
  // 添加用户
  addUser = (param) => {
    this.props.usersApi.addUser(param);
  };
  // 删除用户
  deleteUserById(record) {
    Modal.confirm({
      title: "注意",
      content: `删除用户: ${record.userName} ?`,
      onOk: () => {
        message.success({
          content: "删除用户api",
        });
        // this.props.usersApi.deleteUserById(record.id);
      },
    });
  }
  // 查询用户
  queryUser = (params, sort, fliter) => {
    // const queryResult = await this.props.usersApi.queryUser();
    const queryResult = {};
    console.log(params);
    console.log(sort);
    console.log(fliter);
    return {
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
    const uploadProps = {
      action: "http://127.0.0.1:8080/api/user/uploadExcel",
      accept: ".xls,xlsx",
      //   listType: "picture-card",
      name: "file",
      showUploadList: false,
      onChange: (info) => {
        if (info.file.status === "uploading") {
          if (this.state.loading === true) {
            message.loading("上传中~", 0);
          }
          this.setState({
            loading: false,
          });
        }
        if (info.file.status === "done") {
          let fileList = info.fileList;
          fileList = fileList.slice(-1);
          fileList.forEach((file) => {
            if (file.response) {
              if (file.response === "success") {
                message.success({
                  content: "导入成功",
                });
                // 更新列表
                this.props.usersApi.getUserList();
              } else {
                message.error("导入错误:" + file.response);
              }
            }
          });
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} 上传遇到错误，请联系管理员`);
        }
      },
      beforeUpload: (file) => {
        if (!file.type.startsWith(".xls") || !file.type.startsWith(".xlsx")) {
          message.warning("请上传图片类型的文件~");
          return false;
        }
      },
    };
    return (
      <>
        <ProTable
          options={false}
          toolbar={{
            actions: [
              <ModalForm
                title="新建用户"
                width={400}
                trigger={<Button icon={<PlusCircleOutlined />}>添加</Button>}
                onFinish={async (values) => {
                  await this.addUser(values);
                  message.success("提交成功");
                  return true;
                }}
              >
                <ProFormText
                  width="md"
                  name="userName"
                  label="用户名"
                  placeholder="请输入用户名"
                  rules={[
                    {
                      required: true,
                      message: "请输入用户名",
                    },
                  ]}
                />

                <ProFormText
                  width="md"
                  name="mobile"
                  label="手机号"
                  placeholder="请输入手机号"
                  rules={[
                    {
                      required: true,
                      message: "请输入手机号",
                    },
                  ]}
                />
                <ProFormText
                  width="md"
                  name="password"
                  label="密码"
                  placeholder="请输入密码"
                  rules={[
                    {
                      required: true,
                      message: "请输入密码",
                    },
                  ]}
                />
              </ModalForm>,
              <Upload {...uploadProps}>
                <Button type="primary">导入excel</Button>
              </Upload>,
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
