import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {useData} from "../../../utils/hooks/useData";
import dynamic from "next/dynamic";

const FindingAidsGrid = dynamic(
  () => import('../../../components/Grids/FindingAidsGrid'),
  { ssr: false }
);

export default function FindingAidsTableView() {
  const router = useRouter();
  const { series } = router.query;

  const { data, loading } = useData(series ? `/v1/archival_unit/${series}/` : null);

  const breadcrumbData = [
    {text: 'Finding Aids'},
    {text: data ? `${data.title_full}` : ''},
    {text: 'Table View'}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Table View</title>
      </Head>
      <Breadcrumbs breadcrumbData={breadcrumbData} />
      <FindingAidsGrid seriesID={series} />
    </AppLayout>
  )
}
