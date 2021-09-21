import React from 'react'
import AppLayout from "../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import ISADTable from "../../components/Tables/ISADTable";

export default function ISADList() {
  const breadcrumbData = [
    {text: 'ISAD(G) Records'}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - ISAD(G) Records</title>
      </Head>
      <Breadcrumbs module={'isad'} breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <ISADTable />
      </Card>
    </AppLayout>
  )
}
