import {notification} from "antd";

export const deleteAlert = () => {
    notification.warning({
      duration: 3,
      message: 'Removed!',
      description: `Record was removed!`,
    });
};
