import React from 'react';
import style from '../Table.module.css'
import {Button, Tooltip} from "antd";
import {EyeOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import Link from "next/link";

const renderActionButtons = (record, actions, module, onDelete) => {
  const getButtons = () => {
    return actions.map((action) => {
      switch (action) {
        case 'view':
          return (
            <Tooltip key={'view'} title={'View'}>
              <Link href={`/${module}/view/${record.id}`}>
                <Button size="small" icon={<EyeOutlined/>}/>
              </Link>
            </Tooltip>
          );
        case 'edit':
          return (
            <Tooltip key={'edit'} title={'Edit'}>
              <Link href={`/${module}/edit/${record.id}`}>
                <Button size="small" icon={<EditOutlined/>}/>
              </Link>
            </Tooltip>
          );
        case 'delete':
          return (
            record.is_removable && <Tooltip key={'delete'} title={'Delete'}>
              <Button size="small" icon={<DeleteOutlined/>} onClick={() => onDelete(record.id)}/>
            </Tooltip>
          );
        default:
          break;
      }
    })
  };

  return (
    <Button.Group>
      {getButtons()}
    </Button.Group>
  )

};

export const getColumns = (columns, actions, module, onDelete) => {
  const c = [...columns];
  if (actions.length > 0) {
    c.push(
      {
        key: 'actions',
        title: 'Actions',
        width: 150,
        className: style.ActionColumn,
        render: (record) => renderActionButtons(record, actions, module, onDelete)
      }
    )
  }
  return c;
};
