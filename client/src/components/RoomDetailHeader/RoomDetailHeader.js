import React from 'react';
import {
  Button,
  Typography,
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import './RoomDetailHeader.css';

const { Title } = Typography;

const RoomDetailHeader = ({ room }) => {
  const returnToHome = () => window.location.href = '/';

  return (
    <div className="room-detail-header">
      <div className="left-container">
        <Title level={2} className="room-title">{room}</Title>
      </div>
      <div className="right-container">
        <Button
          type="link"
          onClick={returnToHome}
        >
          <HomeOutlined className="return-home" />
          Leave Room
        </Button>
      </div>
    </div>
  );
};

export default RoomDetailHeader;