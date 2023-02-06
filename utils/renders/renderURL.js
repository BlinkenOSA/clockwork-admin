import React from "react";

export const renderURL = (text, record, index) => {
  return <a href={text} target={'_new'}>{text}</a>
};
