import React from "react";
import { Form, Input, Layout, Row, Col } from "antd";

const { Content } = Layout;

class Setting extends React.Component {
  render() {
    return (
      <>
        <Content
          style={{
            minHeight: "50vh",
            padding: "20px",
            backgroundColor: "#fff",
          }}
        >
          <Row>
            <Col span={12} offset={6}>
              <Form>
                <Form.Item>
                  <Input placeholder="hello" />
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </>
    );
  }
}
export default Setting;
