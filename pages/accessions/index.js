import React from 'react'
import AppLayout from "../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import SimpleTable from "../../components/Tables/SimpleTable";

export default function AccessionList() {
  const breadcrumbData = [
    {text: 'Accession Records'}
  ];

  const renderReferenceCode = (text, record, index) => {
    if (record.archival_unit) {
      return(<span>{record.archival_unit.reference_code}</span>)
    } else {
      return(<span style={{color: 'rgba(0, 0, 0, 0.35)'}}>HU OSA {record.archival_unit_legacy_number}</span>)
    }
  };

  const columns = [
    {
      title: 'Seq. no.',
      dataIndex: 'seq',
      key: 'seq',
      width: 100,
      sorter: true,
    }, {
      title: 'Transfer date',
      dataIndex: 'transfer_date',
      key: 'transfer_date',
      width: 160,
      sorter: true,
    }, {
      title: 'Ref. code',
      dataIndex: 'archival_unit.reference_code',
      sortKeys: ['archival_unit__fonds', 'archival_unit_legacy_number'],
      key: 'reference_code',
      width: 120,
      sorter: true,
      render: renderReferenceCode
    }, {
      title: 'Archival Unit',
      dataIndex: 'title',
      key: 'title'
    }
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Accession Records</title>
      </Head>
      <Breadcrumbs breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <SimpleTable
          button={'New Accession'}
          module={'accessions'}
          api={`/v1/accession/`}
          columns={columns}
          actions={['view', 'edit', 'delete']}
        />
      </Card>
    </AppLayout>
  )
}
