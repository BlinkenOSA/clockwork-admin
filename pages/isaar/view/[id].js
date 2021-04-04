import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {SimpleForm} from "../../../components/Forms/SimpleForm";
import {useData} from "../../../utils/hooks/useData";

export default function AccessionList() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useData(id ? `/v1/isaar/${id}/` : undefined);

  const breadcrumbData = [
    {text: 'ISAAR-CPF Records'},
    {text: 'View'},
    {text: data ? `${data.name}` : ''}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - View ISAAR-CPF Records</title>
      </Head>
      <Breadcrumbs breadcrumbData={breadcrumbData} />
      {
        data ?
        <SimpleForm
          module={'isaar'}
          type={'view'}
          initialValues={data} /> : ''
      }
    </AppLayout>
  )
}
