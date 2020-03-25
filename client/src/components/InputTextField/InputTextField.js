import React from 'react';
import {
  Button,
  Input,
} from 'antd';

import './InputTextField.css';

const InputTextField = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <Input
      size="large"
      className="message-input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } = {} }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <Button
      onClick={e => sendMessage(e)}
      className="send-message"
      type="primary"
      size="large"
    >
      Send
    </Button>
  </form>
);

export default InputTextField;