import {Menu} from "antd";
import React, {useContext, useEffect, useState} from "react";
import config from './config/config-menu';
import style from "./Menu.module.scss";
import {useRouter} from "next/router";
import {UserContext} from "../../utils/context/UserContext";

const AppMenu = ({collapsed}) => {
  const router = useRouter();
  const user = useContext(UserContext);

  const isActivePath = (link) => {
    if (!link) {
      return false;
    }

    return router.pathname === link || router.pathname.startsWith(`${link}/`);
  };

  const collectActiveTrail = (menuItems, parents = []) => {
    for (const menuItem of menuItems) {
      const currentTrail = [...parents, menuItem.name];

      if (menuItem.hasOwnProperty('submenu')) {
        const submenuTrail = collectActiveTrail(menuItem.submenu, currentTrail);
        if (submenuTrail.length > 0) {
          return submenuTrail;
        }
      }

      if (isActivePath(menuItem.link)) {
        return currentTrail;
      }
    }

    return [];
  };

  const activeTrail = collectActiveTrail(config);
  const activeOpenKeys = activeTrail.slice(0, -1);
  const selectedKeys = activeTrail.slice(-1);
  const [openKeys, setOpenKeys] = useState(activeOpenKeys);

  useEffect(() => {
    setOpenKeys(activeOpenKeys);
  }, [router.pathname]);

  const getItem = (label, key, icon, group, children) => {
    let returnItem = false;

    /* Check if user is admin */
    if (user['is_admin']) {
      returnItem = true
    }

    /* Check if menu should be displayed to everyone */
    if (group.includes('__ALL__')) {
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
        <a href={'/'}>
        {collapsed ? <React.Fragment><b>C</b>WK</React.Fragment> : <React.Fragment><b>Clock</b>Work AMS</React.Fragment>}
        </a>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
        selectedKeys={selectedKeys}
        items={renderItems()}
      />
    </React.Fragment>
  )
};

export default AppMenu;
