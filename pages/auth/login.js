import React from 'react';
import {Card, Col, Divider, Layout, Row, Typography} from "antd";
import LoginForm from "../../components/Login/LoginForm";
import style from '../../components/Login/Login.module.css';
import Head from "next/head";

const { Text, Title } = Typography;

const Login = () => {
  return (
    <React.Fragment>
      <Head>
        <title>AMS - Archival Management System - Login</title>
      </Head>
      <Layout style={{ minHeight: '100vh', display: 'flex' }}>
        <Row justify="center" align="middle" style={{ height: '100vh' }} gutter={0} type="flex">
          <Col lg={12}>
            <Card className={style.LoginBox}>
              <Row>
                <Col lg={12} md={24} sm={24} xs={24} className={style.LoginForm}>
                  <Title level={2}>Login</Title>
                  <Text>Sign in to your account</Text>
                  <LoginForm/>
                </Col>
                <Col lg={12} md={0} sm={0} xs={0} className={style.LoginInfo}>
                  <div className={style.Logo}>
                    <img src={'/images/osa_logo.png'} alt="Logo" />
                  </div>
                  <Divider style={{color: '#FFF', marginBottom: '30px'}}><strong>Clock</strong>Work AMS</Divider>
                  <Text style={{color: '#FFF'}}>
                    Welcome to the Archival Management System of the Vera and Donald Blinken Open Society Archives!
                  </Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Layout>
    </React.Fragment>
  )
};

export default Login;
