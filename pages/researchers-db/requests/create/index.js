import React from 'react'
import AppLayout from "../../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../../components/Layout/Breadcrumbs";
import {ArchivalUnitSelectForm} from "../../../../components/Forms/ArchivalUnitSelectForm";
import {RequestsForm} from "../../../../components/Forms/fields/RequestsForm";

export default function RequestCreate() {
  const breadcrumbData = [
    {text: 'Researchers Database'},
    {text: 'Requests'},
    {text: 'Create'}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Finding Aids / Select Archival Unit</title>
      </Head>
      <Breadcrumbs module={'requests'} breadcrumbData={breadcrumbData} />
      <RequestsForm />
    </AppLayout>
  )
}
