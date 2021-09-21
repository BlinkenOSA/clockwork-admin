import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {SimpleForm} from "../../../components/Forms/SimpleForm";
import {useData} from "../../../utils/hooks/useData";
import {fillManyFields} from "../../../utils/functions/fillManyFields";

export default function AccessionView() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useData(id ? `/v1/accession/${id}/` : undefined);

  const manyFieldList = [
    'items'
  ];

  const breadcrumbData = [
    {text: 'Accession Records'},
    {text: 'View'},
    {text: data ? `${data.seq}` : ''}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - View Accession Records</title>
      </Head>
      <Breadcrumbs module={'accessions'} breadcrumbData={breadcrumbData} />
      {
        data ?
        <SimpleForm
          module={'accessions'}
          type={'view'}
          initialValues={data ? fillManyFields(data, manyFieldList) : undefined} /> : ''
      }
    </AppLayout>
  )
}
