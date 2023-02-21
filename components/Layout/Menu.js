import {Menu} from "antd";
import React, {useContext} from "react";
import config from './config/config-menu';
import style from "./Menu.module.css";
import {useRouter} from "next/router";
import {UserContext} from "../../utils/context/UserContext";

const AppMenu = ({collapsed}) => {
  const router = useRouter();
  const user = useContext(UserContext);

  const collectOpenKeys = () => {
    const openKeys = [];
    config.forEach(menuConfig => {
      if (menuConfig.hasOwnProperty('submenu')) {
        const activeMenu = menuConfig['submenu'].filter(submenu => router.pathname.includes(submenu.link));
        if (activeMenu.length > 0) {
          openKeys.push(menuConfig.name)
        }
      }
    });
    return openKeys;
  };

  const collectSelectedKeys = () => {
    const selectedKeys = [];
    config.forEach(menuConfig => {
      if (menuConfig.hasOwnProperty('submenu')) {
        const activeMenu = menuConfig['submenu'].filter(submenu => router.pathname.includes(submenu.link));
        if (activeMenu.length > 0) {
          selectedKeys.push(...activeMenu.map(am => (am.name)))
        }
      } else {
        if (router.pathname.includes(menuConfig.link)) {
          selectedKeys.push(menuConfig.name)
        }
      }
    });
    return selectedKeys;
  };

  const getItem = (label, key, icon, group, children) => {
    let returnItem = false;

    /* Check if user is admin */
    if (user['is_admin']) {
      returnItem = true
    }

    /* Check if user in the allowed group */
    const contains = user['groups'].some(element => {
      return group.includes(element);
    });

    if (contains) {
      returnItem = true
    }

    if (returnItem) {
      return {
        key, icon, label, children
      }
    } else {
      return ''
    }
  }

  const renderItem = (config) => {
    if (config.hasOwnProperty('submenu')) {
      return getItem(
        config.hasOwnProperty('link') ? <a href={config.link}>{config.name}</a> : config.name,
        config.name,
        config.icon,
        config.group,
        config.submenu.map(conf => renderItem(conf))
      )
    } else {
      return getItem(
        config.hasOwnProperty('link') ? <a href={config.link}>{config.name}</a> : config.name,
        config.name,
        config.icon,
        config.group
      )
    }
  }

  const renderItems = () => {
    return config.map(conf => (renderItem(conf)))
  }

  return (
    <React.Fragment>
      <div className={style.Logo}>
        {collapsed ? <React.Fragment><b>C</b>WK</React.Fragment> : <React.Fragment><b>Clock</b>Work AMS</React.Fragment>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={collectOpenKeys()}
        defaultSelectedKeys={collectSelectedKeys()}
        items={renderItems()}
      />
    </React.Fragment>
  )
};

export default AppMenu;
