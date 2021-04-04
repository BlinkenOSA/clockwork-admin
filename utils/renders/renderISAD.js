import React from 'react';

export const renderISAD = (data) => {
  return (
    <div style={{fontSize: '0.8em', color: '#999999'}}>
      {
        data.map((d, idx) => {
          return (
            <div key={idx}>{d}</div>
          )
        })
      }
    </div>
  )
};
