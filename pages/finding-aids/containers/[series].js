import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {useData} from "../../../utils/hooks/useData";
import ContainerTable from "../../../components/Tables/ContainerTable";

export default function FindingAidsContainerView() {
  const router = useRouter();
  const { series } = router.query;

  const { data, loading } = useData(series ? `/v1/archival_unit/${series}/` : null);

  const breadcrumbData = [
    {text: 'Finding Aids'},
    {text: data ? `${data.title_full}` : ''},
    {text: 'Containers'}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Containers</title>
      </Head>
      <Breadcrumbs module={'finding-aids'} breadcrumbData={breadcrumbData} />
      <ContainerTable
        seriesID={series}
        seriesTitle={data ? `${data.title_full}` : ''}
      />
    </AppLayout>
  )
}
