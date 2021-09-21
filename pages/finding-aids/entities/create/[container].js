import React from 'react'
import AppLayout from "../../../../components/Layout/Layout";
import Head from "next/dist/next-server/lib/head";
import Breadcrumbs from "../../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {useData} from "../../../../utils/hooks/useData";
import {fillManyFields} from "../../../../utils/functions/fillManyFields";
import {FindingAidsForm} from "../../../../components/Forms/FindingAidsForm";

export default function FindingAidsCreate() {
  const router = useRouter();
  const { container } = router.query;

  const { data, error } = useData(container ? `/v1/finding_aids/pre_create/${container}/` : undefined);

  const manyFieldList = [
    'dates',
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

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Create Finding Aids Records</title>
      </Head>
      <Breadcrumbs module={'finding-aids'} breadcrumbData={breadcrumbData} />
      {
        data ?
          <FindingAidsForm
            seriesID={data['archival_unit']}
            containerID={container}
            type={'create'}
            initialValues={data ? fillManyFields(data, manyFieldList) : undefined} /> : ''
      }
    </AppLayout>
  )
}
