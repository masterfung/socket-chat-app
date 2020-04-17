import React from 'react';
import { Typography } from "antd";
import ReactEmoji from 'react-emoji';
import moment from 'moment';
import { capitalizeFirstLetter } from "../../../utils/helper";

import './Message.css';

const { Text } = Typography;

const Message = ({ message: { msg, user, time } = {}, name }) => {
  let isUserSent = false;
  let isAdminSent = false;

  const formattedName = name.trim().toLowerCase();

  if(user === formattedName) {
    isUserSent = true;
  }

  if (user === 'system') {
    isAdminSent = true;
  }

  return (
    <div className={`msg-container ${isUserSent ? "content-justify-right" : "content-justify-left"}`}>
      <div className="msg-user padding-left-10">
        <Text className="which-user">{isUserSent && !isAdminSent ? "" : capitalizeFirstLetter(user)}</Text>
        <Text className="msg-time">{moment(time).fromNow()}</Text>
      </div>
      <div className={`${isUserSent ? "bg-blue" : ""} ${isAdminSent ? "bg-system" : ""} msg-box`}>
        <Text
          className={`msg-text ${isUserSent || isAdminSent ? "white" : "black"} ${isAdminSent ? "bold" : ""}`}>
          {ReactEmoji.emojify(msg)}
        </Text>
      </div>
    </div>
  );
};

export default Message;