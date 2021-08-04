import React, {useEffect} from "react";
import {Avatar} from "antd";
import {useUser} from "../../utils/hooks/useUser";
import ColorHash from 'color-hash'
import {useLogin} from "../../utils/hooks/useLogin";

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

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
};

export default UserAvatar;
