import React, {useEffect} from 'react'
import AppLayout from "../../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {SimpleForm} from "../../../../components/Forms/SimpleForm";
import {useData} from "../../../../utils/hooks/useData";

export default function ResearcherView() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useData(id ? `/v1/research/researcher/${id}/` : undefined);

  const breadcrumbData = [
    {text: 'Researcher Records'},
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
          module={'researchers-db/researchers'}
          type={'view'}
          initialValues={data} /> : ''
      }
    </AppLayout>
  )
}
