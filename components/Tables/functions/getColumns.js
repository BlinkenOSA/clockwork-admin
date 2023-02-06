import React from 'react';
import style from '../Table.module.scss'
import {Button, Tooltip} from "antd";
import {EyeOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import Link from "next/link";

const renderActionButtons = (record, actions, module, onDelete) => {
  const getButtons = () => {
    return actions.map((action) => {
      switch (action) {
        case 'view':
          return (
            <Link href={`/${module}/view/${record.id}`}>
              <Tooltip key={'view'} title={'View'}>
                <Button size="small" icon={<EyeOutlined/>}/>
              </Tooltip>
            </Link>
          );
        case 'edit':
          return (
            <Link href={`/${module}/edit/${record.id}`}>
              <Tooltip key={'edit'} title={'Edit'}>
                <Button size="small" icon={<EditOutlined/>}/>
              </Tooltip>
            </Link>
          );
        case 'delete':
          return (
            record.is_removable &&
            <Tooltip key={'delete'} title={'Delete'}>
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
