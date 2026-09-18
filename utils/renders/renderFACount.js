import React from "react";

export const renderFACount = (text, record, index) => {
  if (record['fa_subject_count'] === 0 || record['fa_subject_count'] === 0) {
    if (record['fa_subject_count'] === 0) {
      return (
        <div style={{fontSize: '12px'}}>
          <div>{record['fa_associated_count']} (as Associated)</div>
        </div>
      )
    } else {
      return (
        <div style={{fontSize: '12px'}}>
          <div>{record['fa_subject_count']} (as Subject)</div>
        </div>
      )
    }
  } else {
    return (
      <div style={{fontSize: '12px'}}>
        <div>{record['fa_subject_count'] > 0 && `${record['fa_subject_count']} (as Subject) |`} {record['fa_associated_count']} (as Associated)</div>
      </div>
    )
  }
};
