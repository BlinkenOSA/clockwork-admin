import React from "react";

export const renderLabelFlag = (locale, label) => {
  return (
    locale ?
    <span>{label}<img
      alt={locale}
      style={{width: '20px', marginLeft: '5px', border: '1px solid #d9d9d9'}}
      src={`/images/flag_${locale}.png` }
    /></span> : label
  )
};
