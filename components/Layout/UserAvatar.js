import React, {useEffect} from "react";
import {Avatar, Dropdown, Menu} from "antd";
import {useUser} from "../../utils/hooks/useUser";
import ColorHash from 'color-hash'
import {useLogin} from "../../utils/hooks/useLogin";
import style from "./UserAvatar.module.css";
import {UserOutlined, LogoutOutlined} from "@ant-design/icons";
import {signOut} from "next-auth/client";

const UserAvatar = ({displayUsername=true, ...rest}) => {
  const [ session, loading ] = useLogin();

  const user = useUser();

  const colorHash = new ColorHash();

  if (!user) return <div>Loading...</div>;

  const getInitials = () => {
    const fullName = `${user.first_name} ${user.last_name}`;
    const nameParts = fullName.split(' ');
    return nameParts.map(part => part[0]).join('');
  };

  const menu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />}>
        <a href="/profile">
          Profile
        </a>
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} onClick={() => signOut({callbackUrl: '/auth/login'})}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
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
};

export default UserAvatar;
