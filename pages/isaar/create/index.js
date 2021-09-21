import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {SimpleForm} from "../../../components/Forms/SimpleForm";

export default function IsaarCreate() {
  const data = {
    parallel_names: [{}],
    other_names: [{}],
    standardized_names: [{}],
    corporate_body_identifiers: [{}],
    places: [{}]
  };

  const breadcrumbData = [
    {text: 'ISAAR-CPF Records'},
    {text: 'Create'},
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Create ISAAR-CPF Record</title>
      </Head>
      <Breadcrumbs module={'isaar'} breadcrumbData={breadcrumbData} />
      {
        data ?
        <SimpleForm
          api={`/v1/isaar/`}
          module={'isaar'}
          type={'create'}
          initialValues={data} /> : ''
      }
    </AppLayout>
  )
}
