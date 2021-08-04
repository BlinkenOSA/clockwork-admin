import React from "react";
import {Badge} from "antd";

export const renderArchivalUnitDropdown = (data, showFolders=true) => {
  let containerText;
  let folderText;
  let renderBadge = true;

  switch (data.container_count) {
    case 0:
      containerText = '';
      renderBadge = false;
      break;
    case 1:
      containerText = `1 container`;
      renderBadge = true;
      break;
    default:
      containerText = `${data.container_count} containers`;
      renderBadge = true;
      break;
  }

  switch (data.folder_count) {
    case 0:
      folderText = '';
      renderBadge = false;
      break;
    case 1:
      folderText = '1 folder/item in';
      renderBadge = true;
      break;
    default:
      folderText = `${data.folder_count} folders/items in`;
      renderBadge = true;
      break;
  }

  const text = `${folderText} ${containerText}`;

  return (
    <span>
      {data.reference_code} {data.title}
      {renderBadge && showFolders && data.level === 'S' &&
      <Badge
        count={text}
        style={{ marginLeft: '10px', backgroundColor: '#fa8c16', borderRadius: '3px', fontSize: '0.8em' }}
      />
      }
    </span>
  )
};
