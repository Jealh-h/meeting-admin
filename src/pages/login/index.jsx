import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { UserOutlined, MobileOutlined, LockOutlined } from "@ant-design/icons";
import { DefaultFooter } from "@ant-design/pro-layout";
import {
  LoginForm,
  ProFormText,
  ProFormCaptcha,
  ProFormCheckbox,
} from "@ant-design/pro-form";
import { message } from "antd";
import "./index.less";

class Login extends React.Component {
  handleLogin = async (e) => {
    message.loading({
      content: "登录中",
      duration: 0.5,
    });
    await this.props.adminApi.login(e);
    if (this.props.loginResult === "登录成功") {
      message.success({
        content: this.props.loginResult,
        duration: 1,
        onClose: () => {
          window.sessionStorage.setItem("admin", "14321");
          window.location.href = "/index/meeting-room";
        },
      });
    } else {
      message.error({
        content: "请检查账号信息",
      });
    }
  };
  render() {
    return (
      <>
        <div className="login-wrapper">
          <LoginForm
            onFinish={(e) => this.handleLogin(e)}
            title="校园会议室管理登录"
          >
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              name="userName"
              placeholder={"用户名"}
              rules={[
                {
                  required: true,
                  message: "请输入用户名",
                },
              ]}
            />
            <ProFormText.Password
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              captchaProps={{
                size: "large",
              }}
              placeholder={"请输入密码"}
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
            />
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <a
                style={{
                  cssFloat: "right",
                  marginBottom: 24,
                }}
              >
                忘记密码
              </a>
            </div>
          </LoginForm>
        </div>
        <DefaultFooter
          style={{
            marginTop: "15vh",
            backgroundColor: "#fff",
          }}
          links={[
            {
              key: "labLink",
              title: "数据与知识工程实验室",
              href: "http://iteach.swust.edu.cn/",
            },
          ]}
          copyright="SWUST 计算机科学与技术学院"
        />
      </>
    );
  }
}

const mapState = (state) => ({
  loginResult: state.admin.data,
});

const mapDispatch = (dispatch) => ({
  adminApi: dispatch.admin,
});

export default connect(mapState, mapDispatch)(Login);
