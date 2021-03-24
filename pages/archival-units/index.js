import React from 'react'
import AppLayout from "../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import ArchivalUnitTable from "../../components/Tables/ArchivalUnitTable";

export default function ArchivalUnitList() {
  const breadcrumbData = [
    {text: 'Archival Units'},
  ];

  const archivalUnitRender = (text, record) => {
    return(
      <React.Fragment>
        <strong style={{marginLeft: '10px'}}>{record.reference_code}</strong>
        <span style={{marginLeft: '20px'}}>{record.title}</span>
      </React.Fragment>
    )
  };

  const columns = [
    {
      title: 'Reference Code',
      dataIndex: 'reference_code',
      key: 'reference_code',
      render: archivalUnitRender,
      sorter: true,
      ellipsis: true
    }
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Archival Units</title>
      </Head>
      <Breadcrumbs breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <ArchivalUnitTable
          showFilter={true}
          label={`Archival Unit`}
          module={'archival-units'}
          api={`/v1/archival_unit/`}
          columns={columns}
          actions={['edit', 'delete']}
        />
      </Card>
    </AppLayout>
  )
}
