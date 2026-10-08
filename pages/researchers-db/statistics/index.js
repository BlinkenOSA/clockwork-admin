import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import ResearchStatisticsView from "../../../components/ResearchStatistics/ResearchStatisticsView";

export default function ResearchersVisits() {
  const breadcrumbData = [
    {text: 'Researchers Database'},
    {text: 'Research Statistics'}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Research Statistics</title>
      </Head>
      <Breadcrumbs module={'researchers'} breadcrumbData={breadcrumbData} />
      <ResearchStatisticsView />
    </AppLayout>
  )
}
