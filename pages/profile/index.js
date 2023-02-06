import React from 'react'
import AppLayout from "../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../components/Layout/Breadcrumbs";
import {Col, Row} from "antd";
import {ProfileDataForm} from "../../components/Forms/ProfileDataForm";
import {ProfileChangePasswordForm} from "../../components/Forms/ProfileChangePasswordForm";

export default function ProfilePage() {
  const breadcrumbData = [
    {text: 'Profile'}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - ISAAR-CPF Records</title>
      </Head>
      <Breadcrumbs module={'profile'} breadcrumbData={breadcrumbData} />
      <Row gutter={[12, 12]}>
        <Col xs={12}>
          <ProfileDataForm />
        </Col>
        <Col xs={12}>
          <ProfileChangePasswordForm />
        </Col>
      </Row>
    </AppLayout>
  )
}
