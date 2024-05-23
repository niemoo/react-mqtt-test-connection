import React, { useState } from 'react';
import { Card, Form, Input, Row, Col, Button, Select } from 'antd';
import { QosOption } from './index';

const Subscriber = (props) => {
  const [record, setRecord] = useState({
    topic: 'controller/state-pupuk',
    qos: 0,
  });

  const onRecordChange = (value) => {
    const changedRecord = { ...record, ...value };
    setRecord(changedRecord);
  };

  const handleSubscribe = () => {
    const { topic, qos } = record;
    props.subscribe(topic, qos);
  };

  const handleUnsub = () => {
    const { topic, qos } = record;
    props.unsubscribe(topic, qos);
  };

  const SubForm = (
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
        <Col span={8} offset={16} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleSubscribe}>
              Subscribe
            </Button>
            {props.showUnsub ? (
              <Button type="danger" style={{ marginLeft: '10px' }} onClick={handleUnsub}>
                Unsubscribe
              </Button>
            ) : null}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return <Card title="Subscriber">{SubForm}</Card>;
};

export default Subscriber;
