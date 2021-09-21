import React from 'react'
import AppLayout from "../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import ArchivalUnitTable from "../../components/Tables/ArchivalUnitTable";
import {renderArchivalUnit} from "../../utils/renders/renderArchivalUnit";

export default function ArchivalUnitList() {
  const breadcrumbData = [
    {text: 'Archival Units'},
  ];

  const columns = [
    {
      title: 'Reference Code',
      dataIndex: 'reference_code',
      key: 'reference_code',
      render: renderArchivalUnit,
      sorter: true,
      ellipsis: true
    }
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Archival Units</title>
      </Head>
      <Breadcrumbs module={'archival-units'} breadcrumbData={breadcrumbData} />
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
