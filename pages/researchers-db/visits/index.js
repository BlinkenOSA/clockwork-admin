import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import ResearchersVisitsTable from "../../../components/Tables/ResearchersVisitsTable";

export default function ResearchersVisits() {
  const breadcrumbData = [
    {text: 'Researchers Database'},
    {text: 'Researcher Visits'}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Researcher Visits</title>
      </Head>
      <Breadcrumbs module={'researchers'} breadcrumbData={breadcrumbData} />
      <ResearchersVisitsTable />
    </AppLayout>
  )
}
