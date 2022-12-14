import React, {useContext, useEffect} from "react";
import {Avatar, Dropdown, Menu, Spin} from "antd";
import {useUser} from "../../utils/hooks/useUser";
import ColorHash from 'color-hash'
import style from "./UserAvatar.module.css";
import {UserOutlined, LogoutOutlined} from "@ant-design/icons";
import {signOut} from "next-auth/react";
import {useRouter} from "next/router";
import {UserContext} from "../../utils/context/UserContext";

const UserAvatar = ({displayUsername=true, ...rest}) => {
  const user = useContext(UserContext);
  const router = useRouter()

  const colorHash = new ColorHash();

  const getInitials = () => {
    const fullName = `${user.first_name} ${user.last_name}`;
    const nameParts = fullName.split(' ');
    return nameParts.map(part => part[0]).join('');
  };

  const items = [
      {
          key: 'profile',
          label: 'Profile',
          icon: <UserOutlined />
      }, {
          key: 'logout',
          label: 'Logout',
          icon: <LogoutOutlined />
      }
  ]

  const onClick = ({ key }) => {
      switch (key) {
        case "profile":
          router.push('/profile');
          break;
        case "logout":
          signOut({callbackUrl: '/auth/login'})
          break;
      }
  };

  if (!user) {
    return ''
  } else {
    return (
      <Dropdown menu={{items, onClick}}>
        <div className={style.Profile}>
          <Avatar
            style={{backgroundColor: colorHash.hex(user.username), marginRight: '10px'}}
            {...rest}
          >
            { getInitials() }
          </Avatar>
          {
            displayUsername &&
            <span>
            {user.first_name} {user.last_name} ({user.username})
          </span>
          }
        </div>
      </Dropdown>
    )
  }

};

export default UserAvatar;
