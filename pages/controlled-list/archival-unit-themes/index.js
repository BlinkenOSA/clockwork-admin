import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import PopupTable from "../../../components/Tables/PopupTable";

export default function AccessRightsList() {
  const name = 'Archival Unit Theme';

  const breadcrumbData = [
    {text: 'Controlled List'},
    {text: name}
  ];

  const columns = [
    {
      title: 'Theme',
      dataIndex: 'theme',
      key: 'theme',
      sorter: true,
    }
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - {name}s</title>
      </Head>
      <Breadcrumbs breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <PopupTable
          button={'New Theme'}
          module={'archival-unit-themes'}
          api={`/v1/controlled_list/archival_unit_themes/`}
          columns={columns}
          actions={['edit', 'delete']}
          field={'theme'}
          label={name}
        />
      </Card>
    </AppLayout>
  )
}
