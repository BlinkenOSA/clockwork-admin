import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import PopupTable from "../../../components/Tables/PopupTable";
import {renderURL} from "../../../utils/renders/renderURL";

export default function LanguageList() {
  const breadcrumbData = [
    {text: 'Authority List'},
    {text: 'Languages'}
  ];

  const columns = [
    {
      title: 'Language Name',
      dataIndex: 'language',
      key: 'language',
      sorter: true,
    }, {
      title: 'Authority URL',
      dataIndex: 'authority_url',
      key: 'authority_url',
      sorter: false,
      render: renderURL
    }, {
      title: 'ISO 639 2',
      dataIndex: 'iso_639_2',
      key: 'iso_639_2',
      sorter: true,
    }, {
      title: 'ISO 639 3',
      dataIndex: 'iso_639_3',
      key: 'iso_639_3',
      sorter: true,
    },
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Languages</title>
      </Head>
      <Breadcrumbs module={'languages'} breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <PopupTable
          showFilter={true}
          label={'Language'}
          button={`New Language`}
          module={'languages'}
          api={`/v1/authority_list/languages/`}
          columns={columns}
          actions={['edit', 'delete']}
        />
      </Card>
    </AppLayout>
  )
}
