import React from 'react'
import AppLayout from "../../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../../components/Layout/Breadcrumbs";
import {SimpleForm} from "../../../../components/Forms/SimpleForm";

export default function DonorCreate() {
  const breadcrumbData = [
    {text: 'Researcher'},
    {text: 'Create'},
  ];

  const initialValues = {
    occupation_type: 'student',
    publish: 'no'
  }

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Create Researcher</title>
      </Head>
      <Breadcrumbs module={'donors'} breadcrumbData={breadcrumbData} />
      <SimpleForm
        api={`/v1/research/researcher/`}
        module={'researchers-db/researchers'}
        type={'edit'}
        initialValues={initialValues} />
    </AppLayout>
  )
}
