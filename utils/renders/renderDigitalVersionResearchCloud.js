import React from 'react';
import {Badge} from "antd";
import ResearchCloudLink from "../../components/Forms/fields/finding_aids/ResearchCloudLink";

export const renderDigitalVersionResearchCloud = (data) => {
  console.log(data)
  switch (data['digital_version_research_cloud']) {
    case true:
      return (
        <ResearchCloudLink buttonText={'yes'} isBadge={true} path={data['digital_version_research_cloud_path']}/>
      );
    case false:
      return (
        <Badge count={'no'} style={{ backgroundColor: '#fa8c16', borderRadius: '3px', fontSize: '0.8em' }} />
      );
    default:
      break;
  }
};
