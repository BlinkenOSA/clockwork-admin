import React from 'react'
import AppLayout from "../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import SimpleTable from "../../components/Tables/SimpleTable";

export default function DonorList() {
  const breadcrumbData = [
    {text: 'Donor Records'}
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 400,
      sorter: true,
    }, {
      title: 'Country',
      dataIndex: 'country',
      key: 'country__country',
      sorter: true,
    }, {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      sorter: true,
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: false,
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 300,
      sorter: false,
    },
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Donor Records</title>
      </Head>
      <Breadcrumbs module={'donors'} breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <SimpleTable
          button={'New Donor'}
          module={'donors'}
          api={`/v1/donor/`}
          columns={columns}
          actions={['view', 'edit', 'delete']}
        />
      </Card>
    </AppLayout>
  )
}
