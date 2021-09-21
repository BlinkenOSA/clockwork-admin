import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {SimpleForm} from "../../../components/Forms/SimpleForm";

export default function DonorCreate() {
  const breadcrumbData = [
    {text: 'Donor Records'},
    {text: 'Create'},
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Create Donor Record</title>
      </Head>
      <Breadcrumbs module={'donors'} breadcrumbData={breadcrumbData} />
      <SimpleForm
        api={`/v1/donor/`}
        module={'donors'}
        type={'create'}
      />
    </AppLayout>
  )
}
