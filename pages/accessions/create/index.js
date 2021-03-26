import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {SimpleForm} from "../../../components/Forms/SimpleForm";
import {useData} from "../../../utils/hooks/useData";

export default function AccessionCreate() {
  const { data, error } = useData(`/v1/accession/create/`);

  const breadcrumbData = [
    {text: 'Accession Records'},
    {text: 'Create'},
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Create Accession Record</title>
      </Head>
      <Breadcrumbs breadcrumbData={breadcrumbData} />
      {
        data ?
        <SimpleForm
          api={`/v1/accession/`}
          module={'accessions'}
          type={'create'}
          initialValues={data} /> : ''
      }
    </AppLayout>
  )
}
