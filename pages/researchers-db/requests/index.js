import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import RequestsTable from "../../../components/Tables/RequestsTable";

export default function RequestsList() {
  const breadcrumbData = [
    {text: 'Researchers Database'},
    {text: 'Requests'}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Requests</title>
      </Head>
      <Breadcrumbs module={'requests'} breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <RequestsTable />
      </Card>
    </AppLayout>
  )
}
