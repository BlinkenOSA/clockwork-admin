import { Button, Card, Col, Modal, notification, Row, Table } from "antd";
import React, {useEffect, useState} from "react";
import {
  LoadingOutlined,
  CaretUpOutlined, CaretRightOutlined,
} from "@ant-design/icons";
import style from './Table.module.scss';
import {useData} from "../../utils/hooks/useData";
import {useTable} from "../../utils/hooks/useTable";
import Collapse from "@kunukn/react-collapse";
import {ResearchersVisitsForm} from "../Forms/ResearchersVisitsForm";
import {put, remove} from "../../utils/api";
import {deleteAlert} from "./functions/deleteAlert";

const ResearchersTable = ({...props}) => {
  const { data, loading, refresh, tableState, handleDataChange, handleTableChange} = useTable('researcherVisits', `/v1/research/visits`);

  const [createFormOpen, setCreateFormOpen] = useState(true);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'researcher',
      key: 'researcher__last_name',
      width: 200,
      sorter: true,
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'researcher__email',
      width: 150,
      sorter: true,
    }, {
      title: 'Card No.',
      dataIndex: 'card_number',
      key: 'researcher__card_number',
      width: 100,
      sorter: true,
    }, {
      title: 'Check In',
      dataIndex: 'check_in',
      key: 'check_in',
      width: 120,
      sorter: true,
    }, {
      title: 'Check Out',
      key: 'check_out',
      width: 120,
      sorter: true,
      render: (record) => renderCheckOut(record)
    },
  ];

  useEffect(() => {
    if (data) {
      handleDataChange(data.count)
    }
  }, [data]);

  const onCheckOut = (data) => {
    const { confirm } = Modal;

    confirm({
      title: `Are you sure you would like to check out ${data['researcher']} for today?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        put(`/v1/research/visits/check-out/${data['id']}`).then(response => {
          refresh();
        }).catch((error) => {
          notification.error({
            duration: 3,
            message: 'Error!',
            description: 'There was an error trying to check out the researcher!',
          });
        })
      }
    });
  }

  const renderCheckOut = (record) => {
    const checkOut = record['check_out']
    if (checkOut) {
        return checkOut
    } else {
      return (
        <div onClick={(e) => onCheckOut(record)}>
          <Button type={'default'} size={'small'}>Check Out</Button>
        </div>
      )
    }
  }

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
        <Card size="small" style={{marginBottom: '10px'}} bodyStyle={{paddingBottom: 0}} title={'New Researcher Visit'}>
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
