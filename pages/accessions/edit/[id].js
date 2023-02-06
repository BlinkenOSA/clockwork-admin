import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {SimpleForm} from "../../../components/Forms/SimpleForm";
import {useData} from "../../../utils/hooks/useData";
import {fillManyFields} from "../../../utils/functions/fillManyFields";

export default function AccessionEdit() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useData(id ? `/v1/accession/${id}/` : null);

  const manyFieldList = [
    'items'
  ];

  const breadcrumbData = [
    {text: 'Accession Records'},
    {text: 'Edit'},
    {text: data ? `${data.seq}` : ''}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Edit Accession Records</title>
      </Head>
      <Breadcrumbs module={'accessions'} breadcrumbData={breadcrumbData} />
      {
        data ?
        <SimpleForm
          api={`/v1/accession/${id}/`}
          module={'accessions'}
          type={'edit'}
          initialValues={data ? fillManyFields(data, manyFieldList) : undefined} /> : ''
      }
    </AppLayout>
  )
}
