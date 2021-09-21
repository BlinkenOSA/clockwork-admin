import React from 'react'
import AppLayout from "../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import SimpleTable from "../../components/Tables/SimpleTable";
import {renderISAD} from "../../utils/renders/renderISAD";
import {renderType} from "../../utils/renders/renderType";
import {renderStatus} from "../../utils/renders/renderStatus";

export default function ISAARList() {
  const breadcrumbData = [
    {text: 'ISAAR-CPF Records'}
  ];

  const columns = [
    {
      title: 'Authorized form(s) of name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    }, {
      title: 'Appears in',
      dataIndex: 'isad',
      key: 'isad',
      width: 200,
      render: renderISAD
    }, {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 200,
      sorter: true,
      render: renderType
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      render: renderStatus,
      className: 'centerColumn',
      width: 100
    }
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - ISAAR-CPF Records</title>
      </Head>
      <Breadcrumbs module={'isaar'} breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <SimpleTable
          button={'New ISAAR-CPF'}
          module={'isaar'}
          api={`/v1/isaar/`}
          columns={columns}
          actions={['view', 'edit', 'delete']}
        />
      </Card>
    </AppLayout>
  )
}
