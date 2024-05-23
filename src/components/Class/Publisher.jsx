import React, { useState } from 'react';
import { Card, Form, Input, Row, Col, Button, Select } from 'antd';
import { QosOption } from './index';

const Publisher = (props) => {
  const [record, setRecord] = useState({
    topic: 'testtopic/react',
    qos: 0,
  });

  const onRecordChange = (value) => {
    const changedRecord = { ...record, ...value };
    setRecord(changedRecord);
  };

  const handlePublish = () => {
    props.publish(record);
  };

  const PublishForm = (
    <Form layout="vertical" name="basic" initialValues={record} onValuesChange={onRecordChange}>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item label="Topic" name="topic">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <QosOption.Consumer>
            {(value) => (
              <Form.Item label="QoS" name="qos">
                <Select options={value} />
              </Form.Item>
            )}
          </QosOption.Consumer>
        </Col>
        <Col span={24}>
          <Form.Item label="Payload" name="payload">
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col span={8} offset={16} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handlePublish}>
              Publish
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return <Card title="Publisher">{PublishForm}</Card>;
};

export default Publisher;
