import React from 'react'
import Head from 'next/head'
import AppLayout from "../components/Layout/Layout";
import Breadcrumbs from "../components/Layout/Breadcrumbs";
import DashbboardView from "../components/Dashboard/DashboardView";
import {useLogin} from "../utils/hooks/useLogin";

export default function Home() {
  const [ session, loading ] = useLogin();

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Dashboard</title>
      </Head>
      <Breadcrumbs breadcrumbData={[]} />
      <DashbboardView />
    </AppLayout>
  )
}
