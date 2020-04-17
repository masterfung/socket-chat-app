import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import { notification } from 'antd';
import RoomDetails from '../RoomDetails/RoomDetails';
import RoomDetailHeader from '../RoomDetailHeader/RoomDetailHeader';
import Messages from '../Messages/Messages';
import InputTextField from '../InputTextField/InputTextField';
import { SERVER_ADDRESS } from '../../utils/constants';

import './ChatRoom.css';

let socket;

const ChatRoom = ({
                    location: { search } = {},
                  }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(search);

    socket = io(SERVER_ADDRESS);

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        notification.open({
          message: <span className="error-msg-title">An Error Has Occurred</span>,
          description: error,
          duration: 10,
        });
      }
    });
  }, [search]);

  useEffect(() => {
    socket.on('room-detail', ({ users }) => {
      setUsers(users);
    });

    socket.on('message', (message, error) => {
      setMessages([...messages, message ]);
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();

    if(message) {
      socket.emit(
        'send-message',
        message);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="room-details">
        <RoomDetails
          search={search}
          users={users}
        />
      </div>
      <div className="messages-container">
          <RoomDetailHeader
            room={room}
          />
          <Messages
            messages={messages}
            name={name}
          />
          <InputTextField
            message={message}
            sendMessage={sendMessage}
            setMessage={setMessage}
          />
      </div>
    </div>
  );
};

export default ChatRoom;
