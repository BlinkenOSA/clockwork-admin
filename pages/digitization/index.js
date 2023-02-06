import React from 'react'
import AppLayout from "../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import PopupTable from "../../components/Tables/PopupTable";
import {renderDigitalVersion} from "../../utils/renders/renderDigitalVersion";

export default function DigitizationLogList() {
  const breadcrumbData = [
    {text: 'Digitization Log'}
  ];

  const columns = [
    {
      title: 'Container No.',
      dataIndex: 'container_no',
      key: 'container_no',
      sorter: true,
      width: 200
    }, {
      title: 'Barcode',
      dataIndex: 'barcode',
      key: 'barcode',
      width: 150,
      sorter: true
    }, {
      title: 'Digital Version',
      dataIndex: 'digital_version_exists',
      key: 'digital_version_exists',
      width: 150,
      className: 'centerColumn',
      sorter: true,
      render: renderDigitalVersion
    }, {
      title: 'Creation Date',
      dataIndex: 'digital_version_creation_date',
      key: 'digital_version_creation_date',
      className: 'centerColumn',
      width: 150,
      sorter: true
    }, {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
      className: 'centerColumn',
    }, {
      title: 'Carrier Type',
      dataIndex: 'carrier_type',
      key: 'carrier_type',
      className: 'centerColumn',
      sorter: true
    },
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Digitization Log</title>
      </Head>
      <Breadcrumbs module={'digitization-log'} breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <PopupTable
          showFilter={true}
          footer={false}
          module={'digitization'}
          label={'Digitization Log'}
          api={`/v1/digitization/`}
          columns={columns}
          actions={['view']}
        />
      </Card>
    </AppLayout>
  )
}
