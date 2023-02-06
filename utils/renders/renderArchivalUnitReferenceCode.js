import React from "react";
import { FolderOpenOutlined, FileOutlined } from "@ant-design/icons";

export const renderArchivalUnitReferenceCode = (text, record) => {
  if (record.level === 'F') {
    return (
      <span>
        <FolderOpenOutlined style={{marginLeft: '10px', marginRight: '15px'}}/> {text}
      </span>
    )
  } else {
    return (
      <span><FileOutlined style={{marginLeft: '10px', marginRight: '15px'}}/> {text}</span>
    )
  }
};
