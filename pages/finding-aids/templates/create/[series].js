import React from 'react'
import AppLayout from "../../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {useData} from "../../../../utils/hooks/useData";
import {fillManyFields} from "../../../../utils/functions/fillManyFields";
import {FindingAidsTemplateForm} from "../../../../components/Forms/FindingAidsTemplateForm";

export default function FindingAidsTemplateCreate() {
  const router = useRouter();
  const { series } = router.query;

  const { data, error } = useData(series ? `/v1/finding_aids/templates/pre_create/${series}/` : undefined);

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
    {text: 'Finding Aids Templates'},
    {text: 'Create'},
  ];

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Create Finding Aids Template</title>
      </Head>
      <Breadcrumbs breadcrumbData={breadcrumbData} />
      {
        data ?
          <FindingAidsTemplateForm
            seriesID={series}
            type={'create'}
            initialValues={data ? fillManyFields(data, manyFieldList) : undefined} /> : ''
      }
    </AppLayout>
  )
}
