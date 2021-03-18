import React, {useState} from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import useSWR from "swr";
import {get} from "../../../utils/api";
import {useRouter} from "next/router";
import {SimpleForm} from "../../../components/Forms/SimpleForm";

export default function AccessionList() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(id ? `/v1/accession/${id}/` : null, url => get(url));

  const breadcrumbData = [
    {text: 'Accession Records'},
    {text: 'Edit'},
    {text: data ? `${data.seq}` : ''}
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Edit Accession Records</title>
      </Head>
      <Breadcrumbs breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        {data ? <SimpleForm module={'accessions'} initialValues={data} /> : ''}
      </Card>
    </AppLayout>
  )
}
