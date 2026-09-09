import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import RequestsTable from "../../../components/Tables/RequestsTable";
import RestrictedRequestsTable from "../../../components/Tables/RestrictedRequestsTable";

export default function RestrictedAccess() {
  const breadcrumbData = [
    {text: 'Researchers Database'},
    {text: 'Restricted Access Management'}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Restricted Access</title>
      </Head>
      <Breadcrumbs module={'requests'} breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <RestrictedRequestsTable />
      </Card>
    </AppLayout>
  )
}
