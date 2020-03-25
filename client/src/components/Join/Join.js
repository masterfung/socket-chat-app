import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  Input,
  Radio,
} from 'antd';
import { CommentOutlined } from '@ant-design/icons';

import './Join.css';

const { Title, Text } = Typography;

export default function SignIn() {
  const [name, setName] = useState('');
  const [defaultRoom, setDefaultRoom] = useState('general');
  const [room, setRoom] = useState('');

  return (
    <div className="join">
      <div className="join-inner-container">
        <div className="icon"><CommentOutlined /></div>
        <Title className="title-heading" level={1}>Welcome</Title>
        <Text className="helper-text">Let's get your name before we start.</Text>
        <div className="join-inputs">
          <Input
            className="name"
            addonBefore="Username"
            type="text"
            maxLength={18}
            required
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
          />
          <Radio.Group
            onChange={(e) => {
              setDefaultRoom(e.target.value);
            }}
            value={defaultRoom}
          >
            <Radio  value="general" >General</Radio>
            <Radio value="random">Random</Radio>
            <Radio value="new">New Room</Radio>
          </Radio.Group>
          <Input
            className="room-name"
            addonBefore="Room"
            type="text"
            maxLength={30}
            required
            disabled={defaultRoom !== "new"}
            onKeyDown={(e) => (e.key === 'Enter' ? setRoom(e.target.value) : null )}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Enter a room name"
          />
        </div>
        <Link
          onClick={e => (name && (room || defaultRoom)) ? null : e.preventDefault()}
          to={`/chat?name=${name}&room=${defaultRoom === "new" ? room : defaultRoom}`}
        >
          <Button
            className="join-submit"
            type="primary"
          >
            Enter
          </Button>
        </Link>
      </div>
    </div>
  );
}
