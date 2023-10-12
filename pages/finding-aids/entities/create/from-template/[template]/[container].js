import React, {useState} from 'react'
import AppLayout from "../../../../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../../../../components/Layout/Breadcrumbs";
import {useRouter} from "next/router";
import {useData} from "../../../../../../utils/hooks/useData";
import {fillManyFields} from "../../../../../../utils/functions/fillManyFields";
import {FindingAidsForm} from "../../../../../../components/Forms/FindingAidsForm";
import {removeIDFromManyFields} from "../../../../../../utils/functions/removeIDFromManyFields";

export default function FindingAidsCreateFromTemplate() {
  const router = useRouter();
  const { container, template } = router.query;

  const { data, error } = useData(container ? `/v1/finding_aids/pre_create/${container}/` : undefined);
  const templateData = useData(container ? `/v1/finding_aids/templates/${template}/` : undefined);

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
    {text: templateData && templateData['data'] ? `Create from Template: ${templateData['data']['template_name']}`: ''},
  ];

  const generateInitialData = () => {
    templateData['data']['description_level'] = data['description_level'];
    templateData['data']['level'] = data['level'];
    templateData['data']['container_id'] = data['container_id'];
    templateData['data']['folder_no'] = data['folder_no'];
    templateData['data']['uuid'] = data['uuid'];
    templateData['data']['archival_reference_code'] = data['archival_reference_code'];
    const tData = removeIDFromManyFields(templateData['data'], manyFieldList)
    return fillManyFields(tData, manyFieldList);
  };

  const onActiveTabChange = (activeKey) => {
    setActiveTabKey(activeKey)
  }

  return (
    <AppLayout>
      <Head>
        <title>AMS - Archival Management System - Create Finding Aids Records from Template</title>
      </Head>
      <Breadcrumbs module={'finding-aids/form'} breadcrumbData={breadcrumbData} activeTabKey={activeTabKey} />
      {
        data && templateData['data'] ?
          <FindingAidsForm
            seriesID={data['archival_unit']}
            containerID={container}
            type={'create'}
            initialValues={data && templateData['data'] ? generateInitialData() : undefined}
            onActiveTabChange={onActiveTabChange}
          /> : ''
      }
    </AppLayout>
  )
}
