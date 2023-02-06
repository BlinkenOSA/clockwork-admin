import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import ResearchersTable from "../../../components/Tables/ResearchersTable";

export default function ResearchersList() {
  const breadcrumbData = [
    {text: 'Researchers Database'},
    {text: 'Researchers'}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Researcher Records</title>
      </Head>
      <Breadcrumbs module={'researchers'} breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <ResearchersTable />
      </Card>
    </AppLayout>
  )
}
