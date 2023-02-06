import React from 'react';
import {Badge} from "antd";

export const renderStatus = (data) => {
  switch (data) {
    case 'Published':
      return (
        <Badge count={'published'} style={{ backgroundColor: '#376e18', borderRadius: '3px', fontSize: '0.8em' }} />
      );
    case 'Draft':
      return (
        <Badge count={'draft'} style={{ backgroundColor: '#fa8c16', borderRadius: '3px', fontSize: '0.8em' }} />
      );
    case 'Final':
      return (
        <Badge count={'final'} style={{ backgroundColor: '#376e18', borderRadius: '3px', fontSize: '0.8em' }} />
      );
    case 'Not exists':
      return (
        <Badge count={'not exists'} style={{ backgroundColor: '#ba3300', borderRadius: '3px', fontSize: '0.8em' }} />
      );
    default:
      break;
  }
};
