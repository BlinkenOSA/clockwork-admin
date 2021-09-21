import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {SimpleForm} from "../../../components/Forms/SimpleForm";
import {useData} from "../../../utils/hooks/useData";

export default function DonorEdit() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useData(id ? `/v1/donor/${id}/` : undefined);

  const breadcrumbData = [
    {text: 'Donor Records'},
    {text: 'Edit'},
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
          api={`/v1/donor/${id}/`}
          module={'donors'}
          type={'edit'}
          initialValues={data} /> : ''
      }
    </AppLayout>
  )
}
