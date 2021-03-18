import {Breadcrumb} from "antd";
import Link from "next/link";
import { HomeOutlined } from '@ant-design/icons';
import style from "./Breadcrumbs.module.css";
import React from "react";

const Breadcrumbs = ({breadcrumbData}) => {
  return (
    <Breadcrumb className={style.Breadcrumb}>
      <Breadcrumb.Item>
        <Link href={'/'}>
          <HomeOutlined />
        </Link>
      </Breadcrumb.Item>
      {breadcrumbData.map((b, idx) => {
        return(
          <Breadcrumb.Item key={idx}>
            {b.link ? <Link href={b.link}>{b.text}</Link> : b.text}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
};

export default Breadcrumbs;
