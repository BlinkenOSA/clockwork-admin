import React, {useState} from 'react'
import AppLayout from "../../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {useData} from "../../../../utils/hooks/useData";
import {fillManyFields} from "../../../../utils/functions/fillManyFields";
import {FindingAidsForm} from "../../../../components/Forms/FindingAidsForm";

export default function FindingAidsEdit() {
  const router = useRouter();
  const { id } = router.query;

  const [activeTabKey, setActiveTabKey] = useState('')

  const { data, error } = useData(id ? `/v1/finding_aids/${id}/` : undefined);

  const manyFieldList = [
    'dates',
    'identifiers',
    'languages',
    'extents',
    'associated_people',
    'associated_corporations',
    'associated_places',
    'associated_countries'
  ];

  const breadcrumbData = [
    {text: data ? `${data.archival_unit_title}` : ''},
    {text: data ? `${data.container_title}` : ''},
    {text: 'Folders - Items'},
    {text: 'Edit'},
    {text: data ? `${data.archival_reference_code}` : ''},
    {text: data ? `${data.title}` : ''}
  ];

  const onActiveTabChange = (activeKey) => {
    setActiveTabKey(activeKey)
  }

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Edit Finding Aids Records</title>
      </Head>
      <Breadcrumbs module={'finding-aids/form'}  breadcrumbData={breadcrumbData} activeTabKey={activeTabKey} />
      {
        data ?
        <FindingAidsForm
          recordID={id}
          seriesID={data ? data.archival_unit : undefined}
          type={'edit'}
          initialValues={data ? fillManyFields(data, manyFieldList) : undefined}
          onActiveTabChange={onActiveTabChange}
        /> : ''
      }
    </AppLayout>
  )
}
