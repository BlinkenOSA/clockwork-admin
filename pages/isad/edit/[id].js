import React, {useState} from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {SimpleForm} from "../../../components/Forms/SimpleForm";
import {useData} from "../../../utils/hooks/useData";
import {fillManyFields} from "../../../utils/functions/fillManyFields";

export default function IsadEdit() {
  const router = useRouter();
  const { id } = router.query;

  const [activeTabKey, setActiveTabKey] = useState('')

  const { data, error } = useData(id ? `/v1/isad/${id}/` : undefined);

  const manyFieldList = [
    'creators',
    'extents',
    'related_finding_aids',
    'location_of_originals',
    'location_of_copies'
  ];

  const breadcrumbData = [
    {text: 'ISAD(G) Records'},
    {text: 'Edit'},
    {text: data ? `${data.title_full}` : ''}
  ];

  const onActiveTabChange = (activeKey) => {
    setActiveTabKey(activeKey)
  }

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Edit ISAD(G) Records</title>
      </Head>
      <Breadcrumbs module={'isad/form'} breadcrumbData={breadcrumbData} activeTabKey={activeTabKey}/>
      {
        data ?
        <SimpleForm
          api={`/v1/isad/${id}/`}
          module={'isad'}
          type={'edit'}
          onActiveTabChange={onActiveTabChange}
          initialValues={data ? fillManyFields(data, manyFieldList) : undefined} /> : ''
      }
    </AppLayout>
  )
}
