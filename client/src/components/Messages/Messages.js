import React, {Fragment, useEffect} from 'react';
import Message from './Message/Message';

import './Messages.css';

const Messages = ({ name, messages, image }) => {
  useEffect(() => {
    const messagesSelector = document.querySelector('.messages');
    messagesSelector.scrollTop = messagesSelector.scrollHeight;
  }, [messages]);

  return (
    <div className="messages">
      {
        messages.map(
          (message, i) => <Fragment key={i}><Message message={message} name={name}/></Fragment>)
      }
      <img src={image} />
    </div>
  );
};

export default Messages;