import {Breadcrumb, Col, Row, Tooltip} from "antd";
import Link from "next/link";
import { HomeOutlined } from '@ant-design/icons';
import style from "./Breadcrumbs.module.css";
import React from "react";
import {QuestionCircleOutlined} from '@ant-design/icons';
import config from './config/config-help';

const Breadcrumbs = ({module, breadcrumbData}) => {
  return (
    <Row>
      <Col xs={23}>
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
      </Col>
      <Col xs={1}>
        <div className={style.Help}>
          <Tooltip title={'Documentation'} placement="left" >
            <a href={module ? config[module] : '#'} target={module ? '_new' :  '_self'} style={{marginRight: '5px'}}>
              <QuestionCircleOutlined />
            </a>
          </Tooltip>
        </div>
      </Col>
    </Row>

  )
};

export default Breadcrumbs;
