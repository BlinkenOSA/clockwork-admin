import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import PopupTable from "../../../components/Tables/PopupTable";

export default function CarrierTypeList() {
  const name = 'Carrier Type';
  const field = 'type';

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
    }, {
      title: 'Type Original Language',
      dataIndex: 'type_original_language',
      key: 'type_original_language',
      sorter: true
    }, {
      title: 'Width',
      dataIndex: 'width',
      key: 'width',
      width: 100
    }, {
      title: 'Height',
      dataIndex: 'height',
      key: 'height',
      width: 100
    }, {
      title: 'Depth',
      dataIndex: 'depth',
      key: 'depth',
      width: 100
    }
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - {`${name}s`}</title>
      </Head>
      <Breadcrumbs module={'controlled-lists'} breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <PopupTable
          module={`carrier-types`}
          api={`/v1/controlled_list/carrier_types/`}
          columns={columns}
          actions={['edit', 'delete']}
          field={field}
          label={name}
        />
      </Card>
    </AppLayout>
  )
}
