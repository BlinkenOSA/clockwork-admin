import React from 'react';
import {Badge} from "antd";
import ResearchCloudLink from "../../components/Forms/fields/finding_aids/ResearchCloudLink";

export const renderDigitalVersionResearchCloud = (data) => {
  switch (data['available_research_cloud']) {
    case true:
      return (
        <ResearchCloudLink buttonText={'yes'} isBadge={true} path={data['research_cloud_path']}/>
      );
    case false:
      return (
        <Badge count={'no'} style={{ backgroundColor: '#fa8c16', borderRadius: '3px', fontSize: '0.8em' }} />
      );
    default:
      break;
  }
};
