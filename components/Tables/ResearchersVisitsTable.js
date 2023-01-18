import {Badge, Button, Card, Col, Modal, Row, Table, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LoadingOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  CaretUpOutlined, CaretRightOutlined, CaretDownOutlined, TableOutlined, CloseOutlined
} from "@ant-design/icons";
import TableFilters from "./TableFilters";
import style from './Table.module.scss';
import {useData} from "../../utils/hooks/useData";
import {useTable} from "../../utils/hooks/useTable";
import Collapse from "@kunukn/react-collapse";
import {ContainerCreateForm} from "../Forms/ContainerCreateForm";
import LabelTypeSelector from "../LabelTypeSelector/LabelTypeSelector";
import Link from "next/link";
import {ResearchersVisitsForm} from "../Forms/ResearchersVisitsForm";

const ResearchersTable = ({...props}) => {
  const { params, tableState, handleTableChange, handleFilterChange } = useTable('isad');
  const { data, loading, refresh} = useData(`/v1/research/visits`, params);

  const [createFormOpen, setCreateFormOpen] = useState(true);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'researcher',
      key: 'researcher__last_name',
      width: 200,
      sorter: true,
    }, {
      title: 'Check In',
      dataIndex: 'check_in',
      key: 'check_in',
      width: 120,
      sorter: true,
    }, {
      title: 'Check Out',
      dataIndex: 'check_out',
      key: 'check_out',
      width: 120,
      sorter: true,
    },
  ];

  const getFooter = () => {
    return (
      <Row gutter={[12]}>
        <Col span={16}>
          <Button type={'default'} onClick={() => setCreateFormOpen(!createFormOpen)}>
            {
              createFormOpen ?
                <div><CaretUpOutlined/><span style={{marginLeft: '5px'}}>New Visit Form</span></div> :
                <div><CaretRightOutlined/><span style={{marginLeft: '5px'}}>New Visit Form</span></div>
            }
          </Button>
        </Col>
      </Row>
    )
  };

  return (
    <React.Fragment>
      <Collapse isOpen={createFormOpen}>
        <Card size="small" style={{marginBottom: '10px'}} title={'New Researcher Visit'}>
          <ResearchersVisitsForm refresh={refresh}/>
        </Card>
      </Collapse>
      <Card size="small" style={{marginBottom: '10px'}}>
        <Table
          bordered={true}
          className={style.Table}
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
      </Card>
    </React.Fragment>

  )
};

export default ResearchersTable;
