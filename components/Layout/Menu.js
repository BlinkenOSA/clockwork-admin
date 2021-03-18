import {Menu} from "antd";
import React, {useState} from "react";
import config from './config/config-menu';
import style from "./Menu.module.css";
import Link from "next/link";
import {useRouter} from "next/router";

const { SubMenu } = Menu;

const AppMenu = ({collapsed}) => {
  const router = useRouter();

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

  const renderMenu = (menuConfig) => {
    if (menuConfig.hasOwnProperty('submenu')) {
      return (
        <SubMenu key={menuConfig.name} icon={menuConfig.icon} title={menuConfig.name}>
          { menuConfig.submenu.map(submenu => (renderMenu(submenu))) }
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item key={menuConfig.name} icon={menuConfig.icon}>
          <Link href={menuConfig.link}>
            {menuConfig.name}
          </Link>
        </Menu.Item>
      )
    }
  };

  return (
    <React.Fragment>
      <div className={style.Logo}>
        {collapsed ? <React.Fragment><b>C</b>WK</React.Fragment> : <React.Fragment><b>Clock</b>Work AMS</React.Fragment>}
      </div>
      <Menu theme="dark" mode="inline" defaultOpenKeys={collectOpenKeys()} defaultSelectedKeys={collectSelectedKeys()}>
        { config.map(conf => (renderMenu(conf))) }
      </Menu>
    </React.Fragment>
  )
};

export default AppMenu;
