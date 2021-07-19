import React from 'react';
import {Col, Layout, Row, Spin, Typography} from "antd";
import Head from "next/dist/next-server/lib/head";
import {useDidMountEffect} from "../../utils/hooks/useDidMountEffect";
import {signOut} from "next-auth/client";

const { Text, Title } = Typography;

const Logout = () => {
  useDidMountEffect(() => {
    signOut({callbackUrl: '/auth/login'});
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>AMS - Archival Management System - Login</title>
      </Head>
      <Layout style={{ minHeight: '100vh', display: 'flex' }}>
        <Row justify="center" align="middle" style={{ height: '100vh' }} gutter={0} type="flex">
          <Col lg={12}>
            <Spin />
          </Col>
        </Row>
      </Layout>
    </React.Fragment>
  )
};

export default Logout;
