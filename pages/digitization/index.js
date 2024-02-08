import React from 'react'
import Head from 'next/head'
import AppLayout from "../../components/Layout/Layout";
import Breadcrumbs from "../../components/Layout/Breadcrumbs";
import DigitizationLogView from "../../components/Digitization/DigitizationLogView";

export default function Digitization() {
  const breadcrumbData = [
    {text: 'Digitization Log'}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Digitization Log</title>
      </Head>
      <Breadcrumbs module={'digitization-log'} breadcrumbData={breadcrumbData} />
      <DigitizationLogView />
    </AppLayout>
  )
}
