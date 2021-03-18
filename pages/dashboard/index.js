import React from 'react'
import Head from 'next/head'
import AppLayout from "../../components/Layout/Layout";
import {useLogin} from "../../utils/hooks/useLogin";
import Breadcrumbs from "../../components/Layout/Breadcrumbs";

export default function Dashboard() {
  const [ session, loading ] = useLogin();

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Dashboard</title>
      </Head>
      <Breadcrumbs breadcrumbData={[]} />
    </AppLayout>
  )
}
