import {Button, Col, Row, Table, Tooltip} from "antd";
import React, {useEffect} from "react";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import style from './Table.module.scss';
import {useData} from "../../utils/hooks/useData";
import {useTable} from "../../utils/hooks/useTable";
import Link from "next/link";


const FindingAidsTemplateTable = ({seriesID}) => {
  const api = seriesID ? `/v1/finding_aids/templates/list/${seriesID}/` : undefined
  const { data, loading, refresh, tableState,
    handleDataChange, handleTableChange, handleDelete } = useTable(`finding-aids-template-table-${seriesID}`, api);

  useEffect(() => {
    if (data) {
      handleDataChange(data.count);
    }
  }, [data]);

  const renderActionButtons = (record) => {
    return (
      <React.Fragment>
        <Button.Group>
          <Link href={`/finding-aids/templates/edit/${record.id}`}>
            <Tooltip key={'edit'} title={'Edit'}>
              <Button size="small" icon={<EditOutlined/>} />
            </Tooltip>
          </Link>
          {
            record.is_removable &&
            <Tooltip key={'delete'} title={'Delete'}>
              <Button size="small" icon={<DeleteOutlined/>} onClick={() => onDelete(record.id)}/>
            </Tooltip>
          }
        </Button.Group>
      </React.Fragment>
    )
  };

  const columns = [
    {
      title: 'Template Name',
      dataIndex: 'template_name',
      key: 'template_name',
      sorter: false,
    }, {
      key: 'actions',
      title: 'Actions',
      width: 150,
      className: style.ActionColumn,
      render: (record) => renderActionButtons(record)
    }
  ];

  const getFooter = () => {
    return (
      <Row>
        <Col span={8}>
          <Link href={`/finding-aids/templates/create/${seriesID}`}>
            <Button type={'primary'}>
              New Template
            </Button>
          </Link>
        </Col>
      </Row>
    )
  };

  return (
    <React.Fragment>
      <Table
        bordered={true}
        rowKey={record => record.id}
        dataSource={data ? data.results : []}
        columns={columns}
        size={'small'}
        loading={{
          spinning: loading,
          indicator: <LoadingOutlined/>,
        }}
        footer={() => getFooter()}
        pagination={tableState['pagination']}
        onChange={handleTableChange}
      />
    </React.Fragment>
  )
};

export default FindingAidsTemplateTable;
