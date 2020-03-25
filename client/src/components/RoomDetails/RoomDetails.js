import React from 'react';
import {
  Typography,
} from 'antd';
import { SmileTwoTone } from '@ant-design/icons';
import queryString from 'query-string';
import { capitalizeFirstLetter } from "../../utils/helper";

import './RoomDetails.css';

const { Title, Text } = Typography;

const RoomDetails = ({ users, search }) => {
  let { name: parsedName } = queryString.parse(search);
  return (
    <div className="textContainer">
      {
        users
          ? (
            <div className="room-details-container">
              <Title level={2}>Room Details</Title>
              <div className="room-inner-container">
                <Title level={4}>{`${users.length} Current Members`} </Title>
                <Text>
                  {users.map(({name, id}) => (
                    <div key={id} className="user-content">
                      <Text>
                        <SmileTwoTone twoToneColor="#52c41a"/>
                        <Text className="username">
                          {`${capitalizeFirstLetter(name)} ${parsedName === name ? "(Me)": ""}`}
                        </Text>
                      </Text>
                    </div>
                  ))}
                </Text>
              </div>
            </div>
          )
          : null
      }
    </div>
  );
};

export default RoomDetails;