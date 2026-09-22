import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {ArchivalUnitSelectForm} from "../../../components/Forms/ArchivalUnitSelectForm";

export default function UnprocessedMaterialsSeriesSelect() {
  const breadcrumbData = [
    {text: 'Finding Aids'},
    {text: 'Unprocessed Materials'}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Finding Aids / Unprocessed Materials</title>
      </Head>
      <Breadcrumbs module={'finding-aids/archival-unit-select'} breadcrumbData={breadcrumbData} />
      <ArchivalUnitSelectForm unprocessedMaterials />
    </AppLayout>
  )
}
