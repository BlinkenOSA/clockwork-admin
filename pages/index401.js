import React from 'react'
import Head from 'next/head'
import AppLayout from "../components/Layout/Layout";
import Breadcrumbs from "../components/Layout/Breadcrumbs";

export default function Index401() {
  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Access Denied</title>
      </Head>
      <Breadcrumbs breadcrumbData={[]} />
      <h1>Unfortunately you don't have access to this part of the AMS!</h1>
    </AppLayout>
  )
}
