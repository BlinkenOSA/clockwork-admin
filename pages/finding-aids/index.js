import React from 'react'
import AppLayout from "../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../components/Layout/Breadcrumbs";
import {ArchivalUnitSelectForm} from "../../components/Forms/ArchivalUnitSelectForm";

export default function FindingAidsSeriesSelect() {
  const breadcrumbData = [
    {text: 'Finding Aids'},
    {text: 'Select Archival Unit'}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Finding Aids / Select Archival Unit</title>
      </Head>
      <Breadcrumbs module={'finding-aids'} breadcrumbData={breadcrumbData} />
      <ArchivalUnitSelectForm />
    </AppLayout>
  )
}
