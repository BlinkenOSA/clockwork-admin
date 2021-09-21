import React from 'react'
import AppLayout from "../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import PopupTable from "../../components/Tables/PopupTable";

export default function MLRList() {
  const breadcrumbData = [
    {text: 'MLR - Master Location Register'}
  ];

  const columns = [
    {
      title: 'Series',
      dataIndex: 'series',
      key: 'series',
    }, {
      title: 'Carrier',
      dataIndex: 'carrier_type',
      key: 'carrier_type',
      width: 200,
    }, {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      className: 'centerColumn',
    }, {
      title: 'Module / Row / Section / Shelf',
      dataIndex: 'mrss',
      key: 'mrss',
      className: 'centerColumn',
    }, {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      width: 100,
      className: 'centerColumn',
    },
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - MLR></title>
      </Head>
      <Breadcrumbs module={'mlr'} breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <PopupTable
          showFilter={true}
          footer={false}
          module={'mlr'}
          label={'MLR Record'}
          api={`/v1/mlr/`}
          columns={columns}
          actions={['edit']}
        />
      </Card>
    </AppLayout>
  )
}
