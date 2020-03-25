import React, { Fragment } from 'react';
import Message from './Message/Message';

import './Messages.css';

const Messages = ({ name, messages }) => (
  <div className="messages">
    {
      messages.map(
        (message, i) => <Fragment key={i}><Message message={message} name={name}/></Fragment>)
    }
  </div>
);

export default Messages;