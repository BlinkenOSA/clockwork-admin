import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import PopupTable from "../../../components/Tables/PopupTable";
import {renderURL} from "../../../utils/renders/renderURL";

export default function CountryList() {
  const breadcrumbData = [
    {text: 'Authority List'},
    {text: 'Countries'}
  ];

  const columns = [
    {
      title: 'Country Name',
      dataIndex: 'country',
      key: 'country',
      sorter: true,
    }, {
      title: 'Authority URL',
      dataIndex: 'authority_url',
      key: 'authority_url',
      sorter: false,
      render: renderURL
    }, {
      title: 'Alpha 2',
      dataIndex: 'alpha2',
      key: 'alpha2',
      sorter: true,
    }, {
      title: 'Alpha 3',
      dataIndex: 'alpha3',
      key: 'alpha3',
      sorter: true,
    },
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Countries</title>
      </Head>
      <Breadcrumbs module={'countries'} breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <PopupTable
          showFilter={true}
          label={`Country`}
          module={'countries'}
          api={`/v1/authority_list/countries/`}
          columns={columns}
          actions={['edit', 'delete']}
        />
      </Card>
    </AppLayout>
  )
}
