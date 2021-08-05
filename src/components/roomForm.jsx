import { Form, Input, message, Button } from "antd";
import { useEffect } from "react";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 18,
      offset: 6,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RoomForm = (props) => {
  let successFun;
  const [form] = Form.useForm();
  useEffect(() => {
    if (props.type === "add") {
      console.log("add");
      successFun = props.addMethod;
    } else if (props.type === "edit") {
      console.log("edit", props);
      successFun = props.editeMethod;
      // 设置表单初始值--即编辑的信息
      form.setFieldsValue(props.editRowRecord);
    }
  }, []);
  function onFinish(config) {
    //   父组件的success函数
    successFun(config);
    //   关闭modal
    props.closeModal();
    message.success("提交成功");
  }
  function onFinishFailed() {
    message.warning("请确认输入无误");
  }

  return (
    <Form
      form={form}
      {...formItemLayout}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="name"
        label="会议间名字"
        rules={[
          {
            type: "string",
            message: "The input is not string",
          },
          {
            required: true,
            message: "请输入会议间名称",
          },
        ]}
      >
        <Input placeholder="请输入会议间名称" />
      </Form.Item>
      <Form.Item
        name="applictionId"
        label="applictionId"
        rules={[
          {
            type: "string",
            message: "The input is not string",
          },
          {
            required: true,
            message: "请输入applicationId",
          },
        ]}
      >
        <Input placeholder="请输入applicationId" />
      </Form.Item>
      <Form.Item
        name="applictionSecrit"
        label="applictionSecrit"
        rules={[
          {
            type: "string",
            message: "The input is not string",
          },
          {
            required: true,
            message: "请输入applicationSecrit",
          },
        ]}
      >
        <Input placeholder="请输入applicationSecrit" />
      </Form.Item>
      <Form.Item
        name="maxNum"
        label="最大容量"
        rules={[
          {
            type: "string",
            message: "The input is not string",
          },
          {
            required: true,
            message: "请输入最大容纳量",
          },
        ]}
      >
        <Input placeholder="请输入最大容纳量" />
      </Form.Item>
      <Form.Item
        name="productId"
        label="productId"
        rules={[
          {
            type: "string",
            message: "The input is not string",
          },
          {
            required: true,
            message: "请输入productId",
          },
        ]}
      >
        <Input placeholder="请输入productId" />
      </Form.Item>
      <Form.Item
        name="msgId"
        label="msgId"
        rules={[
          {
            type: "string",
            message: "The input is not string",
          },
          {
            required: true,
            message: "请输入msgId",
          },
        ]}
      >
        <Input placeholder="请输入msgId" />
      </Form.Item>
      <Form.Item
        name="ablity"
        label="ablity"
        rules={[
          {
            type: "string",
            message: "The input is not string",
          },
          {
            required: true,
            message: "请输入ablity",
          },
        ]}
      >
        <Input placeholder="请输入ablity" />
      </Form.Item>
      <Form.Item
        name="service"
        label="service"
        rules={[
          {
            type: "string",
            message: "The input is not string",
          },
          {
            required: true,
            message: "请输入service",
          },
        ]}
      >
        <Input placeholder="请输入service" />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          确认
        </Button>
        <Button onClick={props.closeModal} style={{ marginLeft: 40 }}>
          取消
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RoomForm;
