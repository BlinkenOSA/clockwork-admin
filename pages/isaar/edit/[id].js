import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {SimpleForm} from "../../../components/Forms/SimpleForm";
import {useData} from "../../../utils/hooks/useData";
import {fillManyFields} from "../../../utils/functions/fillManyFields";

export default function IsaarEdit() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading } = useData(id ? `/v1/isaar/${id}/` : null);

  const manyFieldList = [
    'parallel_names',
    'other_names',
    'standardized_names',
    'corporate_body_identifiers',
    'places'
  ];

  const breadcrumbData = [
    {text: 'ISAAR-CPF Records'},
    {text: 'Edit'},
    {text: data ? `${data.name}` : ''}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Edit ISAAR-CPF Records</title>
      </Head>
      <Breadcrumbs module={'isaar'} breadcrumbData={breadcrumbData} />
      {
        data ?
        <SimpleForm
          api={`/v1/isaar/${id}/`}
          module={'isaar'}
          type={'edit'}
          initialValues={data ? fillManyFields(data, manyFieldList) : undefined} /> : ''
      }
    </AppLayout>
  )
}
