import React, { useState } from 'react';
import { 
  Button,
  Typography,
  Input,
 } from 'antd';
 import { CommentOutlined } from '@ant-design/icons';
 import { Link } from 'react-router-dom';

import './InputUser.css';

const { Title, Text } = Typography;

const InputUser = () => {
  const [name, setName] = useState('');

  return (
    <div className="join">
      <div className="icon"><CommentOutlined /></div>
      <Title className="title-heading" level={1}>Welcome</Title>
      <Text className="helper-text">Let's get your username before we start.</Text>
      <div className="join-inputs">
        <Input 
          className="username"
          type="text"
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your username" 
          />
      </div>
      <Link
        onClick={
          (event) => (!name)
          ? event.preventDefault() 
          : null}
        to={`/chat?username=${name}`}
      >
        <Button 
          className="join-submit"
          type="primary"
        >
          Submit
        </Button>
      </Link>
    </div>
  )
};

export default InputUser;