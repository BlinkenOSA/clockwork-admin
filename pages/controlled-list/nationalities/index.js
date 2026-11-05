import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import PopupTable from "../../../components/Tables/PopupTable";

export default function KeywordList() {
  const name = 'Nationality';
  const field = 'nationality';

  const breadcrumbData = [
    {text: 'Controlled List'},
    {text: `Nationalities`}
  ];

  const columns = [
    {
      title: name,
      dataIndex: field,
      key: field,
      sorter: true,
    }
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - {`Nationalities`}</title>
      </Head>
      <Breadcrumbs module={'controlled-lists'} breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <PopupTable
          module={`${field}s`}
          api={`/v1/controlled_list/nationalities/`}
          columns={columns}
          actions={['edit', 'delete']}
          field={field}
          label={name}
        />
      </Card>
    </AppLayout>
  )
}
