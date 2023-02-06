import React from 'react'
import AppLayout from "../../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {useData} from "../../../../utils/hooks/useData";
import {fillManyFields} from "../../../../utils/functions/fillManyFields";
import {FindingAidsTemplateForm} from "../../../../components/Forms/FindingAidsTemplateForm";

export default function FindingAidsTemplateEdit() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useData(id ? `/v1/finding_aids/templates/${id}/` : undefined);

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
    {text: data ? `${data.archival_unit_title}` : ''},
    {text: data ? `${data.container_title}` : ''},
    {text: 'Finding Aids Templates'},
    {text: 'Edit'},
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Edit Finding Aids Records</title>
      </Head>
      <Breadcrumbs breadcrumbData={breadcrumbData} />
      {
        data ?
        <FindingAidsTemplateForm
          recordID={id}
          seriesID={data ? data.archival_unit : undefined}
          type={'edit'}
          initialValues={data ? fillManyFields(data, manyFieldList) : undefined} /> : ''
      }
    </AppLayout>
  )
}
