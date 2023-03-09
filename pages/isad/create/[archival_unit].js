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
  const { archival_unit } = router.query;

  const [activeTabKey, setActiveTabKey] = useState('')

  const { data, error } = useData(archival_unit ? `/v1/isad/create/${archival_unit}/` : undefined);

  const manyFieldList = [
    'creators',
    'extents',
    'related_finding_aids',
    'location_of_originals',
    'location_of_copies'
  ];

  const breadcrumbData = [
    {text: 'ISAD(G) Records'},
    {text: 'Create'},
  ];

  const onActiveTabChange = (activeKey) => {
    setActiveTabKey(activeKey)
  }

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Create ISAD(G) Record</title>
      </Head>
      <Breadcrumbs module={'isad/form'} breadcrumbData={breadcrumbData} activeTabKey={activeTabKey} />
      {
        data ?
        <SimpleForm
          api={`/v1/isad/`}
          module={'isad'}
          type={'edit'}
          initialValues={data ? fillManyFields(data, manyFieldList) : undefined}
          onActiveTabChange={onActiveTabChange} /> : ''
      }
    </AppLayout>
  )
}
