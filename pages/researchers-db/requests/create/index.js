import React from 'react'
import AppLayout from "../../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../../components/Layout/Breadcrumbs";
import {SimpleForm} from "../../../../components/Forms/SimpleForm";

export default function RequestCreate() {
  const breadcrumbData = [
    {text: 'Researchers Database'},
    {text: 'Requests'},
    {text: 'Create'}
  ];

  const initialValues = { request_items: [{}] }

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Finding Aids / Select Archival Unit</title>
      </Head>
      <Breadcrumbs module={'requests'} breadcrumbData={breadcrumbData} />
      <SimpleForm
        api={`/v1/research/requests/create/`}
        module={'researchers-db/requests'}
        type={'create'}
        initialValues={initialValues}
      />
    </AppLayout>
  )
}
