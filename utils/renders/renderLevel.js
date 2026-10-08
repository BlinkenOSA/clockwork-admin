import React from 'react';
import {Badge} from "antd";
import ResearchCloudLink from "../../components/Forms/fields/finding_aids/ResearchCloudLink";

export const renderLevel = (data) => {
  switch (data) {
    case 'A':
      return (
        <Badge count={'Access'} style={{ backgroundColor: '#666', borderRadius: '3px', fontSize: '0.8em' }} />
      );
    case 'M':
      return (
        <Badge count={'Master'} style={{ backgroundColor: '#333', borderRadius: '3px', fontSize: '0.8em' }} />
      );
    default:
      break;
  }
};
