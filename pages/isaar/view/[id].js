import React, {useState} from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {SimpleForm} from "../../../components/Forms/SimpleForm";
import {useData} from "../../../utils/hooks/useData";
import {fillManyFields} from "../../../utils/functions/fillManyFields";

export default function IsaarView() {
  const router = useRouter();
  const { id } = router.query;

  const [activeTabKey, setActiveTabKey] = useState('')

  const { data, error } = useData(id ? `/v1/isaar/${id}/` : undefined);

  const manyFieldList = [
    'parallel_names',
    'other_names',
    'standardized_names',
    'corporate_body_identifiers',
    'places'
  ];

  const breadcrumbData = [
    {text: 'ISAAR-CPF Records'},
    {text: 'View'},
    {text: data ? `${data.name}` : ''}
  ];

  const onActiveTabChange = (activeKey) => {
    setActiveTabKey(activeKey)
  }

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - View ISAAR-CPF Records</title>
      </Head>
      <Breadcrumbs module={'isaar/form'} breadcrumbData={breadcrumbData} activeTabKey={activeTabKey}/>
      {
        data ?
        <SimpleForm
          module={'isaar'}
          type={'view'}
          initialValues={data ? fillManyFields(data, manyFieldList) : undefined}
          onActiveTabChange={onActiveTabChange} /> : ''
      }
    </AppLayout>
  )
}
