import React from 'react';
import { Card, List } from 'antd';

const Receiver = (props) => {
  const renderListItem = (item) => (
    <List.Item>
      <List.Item.Meta title={item.topic} description={item.message} />
    </List.Item>
  );

  return (
    <Card title="Receiver">
      <List size="small" bordered dataSource={props.messages} renderItem={renderListItem} />
    </Card>
  );
};

export default Receiver;
