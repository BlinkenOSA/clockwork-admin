import React from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {Card} from "antd";
import PopupTable from "../../../components/Tables/PopupTable";
import {renderWikidataURL} from "../../../utils/renders/renderWikidataURL";

export default function PersonList() {
  const breadcrumbData = [
    {text: 'Authority List'},
    {text: 'People'}
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    }, {
      title: 'Wikidata',
      dataIndex: 'wikidata_id',
      key: 'wikidata_id',
      sorter: false,
      render: renderWikidataURL
    }, {
      title: 'Appears in Finding Aids',
      key: 'fa_total_count',
      dataIndex: 'fa_total_count',
      sorter: true,
      width: 200
    },
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - People</title>
      </Head>
      <Breadcrumbs module={'people'} breadcrumbData={breadcrumbData} />
      <Card size="small" style={{marginBottom: '10px'}}>
        <PopupTable
          showFilter={true}
          label={`Person`}
          module={'people'}
          api={`/v1/authority_list/people/`}
          columns={columns}
          actions={['edit', 'delete']}
        />
      </Card>
    </AppLayout>
  )
}
