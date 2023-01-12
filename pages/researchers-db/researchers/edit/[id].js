import React from 'react'
import AppLayout from "../../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {SimpleForm} from "../../../../components/Forms/SimpleForm";
import {useData} from "../../../../utils/hooks/useData";

export default function DonorEdit() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useData(id ? `/v1/research/${id}/` : undefined);

  const breadcrumbData = [
    {text: 'Researcher Records'},
    {text: 'View'},
    {text: data ? `${data.name}` : ''}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Edit Donor Records</title>
      </Head>
      <Breadcrumbs module={'donors'} breadcrumbData={breadcrumbData} />
      {
        data ?
        <SimpleForm
          api={`/v1/research/${id}/`}
          module={'researchers-db/researchers'}
          type={'edit'}
          initialValues={data} /> : ''
      }
    </AppLayout>
  )
}
