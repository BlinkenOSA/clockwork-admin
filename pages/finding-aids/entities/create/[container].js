import React, {useState} from 'react'
import AppLayout from "../../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {useData} from "../../../../utils/hooks/useData";
import {fillManyFields} from "../../../../utils/functions/fillManyFields";
import {FindingAidsForm} from "../../../../components/Forms/FindingAidsForm";

export default function FindingAidsCreate() {
  const router = useRouter();
  const { container } = router.query;

  const { data, error } = useData(container ? `/v1/finding_aids/pre_create/${container}/` : undefined);

  const [activeTabKey, setActiveTabKey] = useState('')

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
    {text: data ? `${data['archival_unit_title_full']}` : ''},
    {text: data ? `${data['container']}` : ''},
    {text: 'Folders - Items'},
    {text: 'Create'},
  ];

  const onActiveTabChange = (activeKey) => {
    setActiveTabKey(activeKey)
  }

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Create Finding Aids Records</title>
      </Head>
      <Breadcrumbs module={'finding-aids/form'} breadcrumbData={breadcrumbData} activeTabKey={activeTabKey} />
      {
        data ?
          <FindingAidsForm
            seriesID={data['archival_unit']}
            containerID={container}
            type={'create'}
            initialValues={data ? fillManyFields(data, manyFieldList) : undefined}
            onActiveTabChange={onActiveTabChange}
          /> : ''
      }
    </AppLayout>
  )
}
