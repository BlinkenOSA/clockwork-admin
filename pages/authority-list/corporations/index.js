import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import PopupTable from "../../../components/Tables/PopupTable";
import {renderURL} from "../../../utils/renders/renderURL";
import {renderWikidataURL} from "../../../utils/renders/renderWikidataURL";

export default function CorporationsList() {
  const breadcrumbData = [
    {text: 'Authority List'},
    {text: 'Corporations'}
  ];

  const columns = [
    {
      title: 'Corporation Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    }, {
      title: 'Authority URL',
      dataIndex: 'authority_url',
      key: 'authority_url',
      sorter: false,
      render: renderURL
    }, {
      title: 'Wikidata',
      dataIndex: 'wikidata_id',
      key: 'wikidata_id',
      sorter: false,
      render: renderWikidataURL
    }
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Corporations</title>
      </Head>
      <Breadcrumbs module={'corporations'} breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <PopupTable
          showFilter={true}
          label={`Corporation`}
          module={'corporations'}
          api={`/v1/authority_list/corporations/`}
          columns={columns}
          actions={['edit', 'delete']}
        />
      </Card>
    </AppLayout>
  )
}
