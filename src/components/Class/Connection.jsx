import React, { useRef } from 'react';
import { Card, Button, Form, Input, Row, Col, Select } from 'antd';

const Connection = (props) => {
  const initialConnectionOptions = {
    protocol: 'ws',
    host: 'broker.emqx.io',
    clientId: 'emqx_react_' + Math.random().toString(16).substring(2, 8),
    port: 8083,
    username: 'emqx_test',
    password: 'emqx_test',
  };

  const formRef = useRef();

  const handleProtocolChange = (value) => {
    formRef.current.setFieldsValue({
      port: value === 'wss' ? 8084 : 8083,
    });
  };

  const onFinish = (values) => {
    const { protocol, host, clientId, port, username, password } = values;
    const url = `${protocol}://${host}:${port}/mqtt`;
    const options = {
      clientId,
      username,
      password,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
    };
    props.connect(url, options);
  };

  const handleConnect = () => {
    formRef.current.submit();
  };

  const ConnectionForm = (
    <Form ref={formRef} layout="vertical" name="basic" initialValues={initialConnectionOptions} onFinish={onFinish}>
      <Row gutter={20}>
        <Col span={8}>
          <Form.Item label="Protocol" name="protocol">
            <Select onChange={handleProtocolChange}>
              <Select.Option value="ws">ws</Select.Option>
              <Select.Option value="wss">wss</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Host" name="host">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Port" name="port">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Client ID" name="clientId">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Password" name="password">
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return (
    <Card
      title="Connection"
      actions={[
        <Button type="primary" onClick={handleConnect}>
          {props.connectBtn}
        </Button>,
        <Button danger onClick={props.disconnect}>
          Disconnect
        </Button>,
      ]}
    >
      {ConnectionForm}
    </Card>
  );
};

export default Connection;
