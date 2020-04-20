import React, {Fragment, useEffect} from 'react';
import Message from './Message/Message';

import './Messages.css';

const Messages = ({ name, messages, imageStorage }) => {
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
      { imageStorage.length ? (
        imageStorage.map((img) => {
          return (
            <img key={img} src={img} />
          )
        })
      ) : null}
    </div>
  );
};

export default Messages;