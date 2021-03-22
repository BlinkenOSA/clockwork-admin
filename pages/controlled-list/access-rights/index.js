import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import PopupTable from "../../../components/Tables/PopupTable";

export default function AccessRightsList() {
  const name = 'Access Rights';

  const breadcrumbData = [
    {text: 'Controlled List'},
    {text: name}
  ];

  const columns = [
    {
      title: 'Statement',
      dataIndex: 'statement',
      key: 'statement',
      sorter: true,
    }
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - {name}</title>
      </Head>
      <Breadcrumbs breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <PopupTable
          button={`New ${name}`}
          module={'access-rights'}
          api={`/v1/controlled_list/access_rights/`}
          columns={columns}
          actions={['edit', 'delete']}
          field={'statement'}
          label={'Access Rights Statement'}
        />
      </Card>
    </AppLayout>
  )
}
