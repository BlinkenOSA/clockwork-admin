import React from 'react';
import {Badge} from "antd";

export const renderDigitalVersion = (data) => {
  switch (data) {
    case true:
      return (
        <Badge count={'yes'} style={{ backgroundColor: '#376e18', borderRadius: '3px', fontSize: '0.8em' }} />
      );
    case false:
      return (
        <Badge count={'no'} style={{ backgroundColor: '#fa8c16', borderRadius: '3px', fontSize: '0.8em' }} />
      );
    default:
      break;
  }
};
