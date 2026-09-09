import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import RequestTableDigital from "../../../components/Tables/RequestTableDigital";

export default function DigitalRequestsList() {
  const breadcrumbData = [
    {text: 'Researchers Database'},
    {text: 'Digital Requests'}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Digital Requests</title>
      </Head>
      <Breadcrumbs module={'requests'} breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <RequestTableDigital />
      </Card>
    </AppLayout>
  )
}
