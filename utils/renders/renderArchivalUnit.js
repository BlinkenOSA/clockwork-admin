import React from 'react';

export const renderArchivalUnit = (text, record) => {
  return(
    <React.Fragment>
      <strong style={{marginLeft: '10px'}}>{record.reference_code}</strong>
      <span style={{marginLeft: '20px'}}>{record.title}</span>
    </React.Fragment>
  )
};
