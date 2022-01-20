import React, {useEffect} from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {SimpleForm} from "../../../components/Forms/SimpleForm";
import {useData} from "../../../utils/hooks/useData";

export default function DonorView() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useData(id ? `/v1/donor/${id}/` : undefined);

  const breadcrumbData = [
    {text: 'Donor Records'},
    {text: 'View'},
    {text: data ? `${data.name}` : ''}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - View Donor Records</title>
      </Head>
      <Breadcrumbs module={'donors'} breadcrumbData={breadcrumbData} />
      {
        data ?
        <SimpleForm
          module={'donors'}
          type={'view'}
          initialValues={data} /> : ''
      }
    </AppLayout>
  )
}
