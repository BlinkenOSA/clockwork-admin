import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import PopupTable from "../../../components/Tables/PopupTable";

export default function PersonRoleList() {
  const name = 'Person Role';
  const field = 'role';

  const breadcrumbData = [
    {text: 'Controlled List'},
    {text: `${name}s`}
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
        <title>AMS - Archival Management System - {`${name}s`}</title>
      </Head>
      <Breadcrumbs breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <PopupTable
          button={`New ${name}`}
          module={`${field}s`}
          api={`/v1/controlled_list/person_roles/`}
          columns={columns}
          actions={['edit', 'delete']}
          field={field}
          label={name}
        />
      </Card>
    </AppLayout>
  )
}
