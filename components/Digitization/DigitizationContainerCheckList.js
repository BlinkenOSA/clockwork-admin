import React from 'react'
import style from "./DigitizationContainerList.module.scss"
import {Badge} from "antd";
import SimpleTable from "../Tables/SimpleTable";

export default function DigitizationContainerCheckList() {
  const renderContainerNo = (data, record) => {
    return <a className={style.ContainerNo} href={'/finding-aids/folders-items/containers/' + record['archival_unit_id']} target={'_blank'} rel="noreferrer">{data}</a>
  }

  const renderNo = (data) => {
    return (
        <Badge count={'no'} style={{ backgroundColor: '#fa8c16', borderRadius: '3px', fontSize: '0.8em' }} />
    );
  }

  const columns = [
    {
      title: 'Container No.',
      dataIndex: 'container_no',
      key: 'container_no',
      sorter: true,
      width: 200,
      render: renderContainerNo,
    }, {
      title: 'Barcode',
      dataIndex: 'barcode',
      key: 'barcode',
      width: 140,
      sorter: true
    }, {
      title: 'Research Cloud',
      key: 'available_research_cloud',
      width: 120,
      className: 'centerColumn',
      sorter: true,
      render: renderNo
    }, {
      title: 'Online',
      dataIndex: 'available_online',
      key: 'available_online',
      width: 120,
      className: 'centerColumn',
      sorter: true,
      render: renderNo
    }, {
      title: 'Carrier Type',
      dataIndex: 'carrier_type',
      key: 'carrier_type',
      className: 'centerColumn',
      sorter: true,
      width: 100
    },
  ];

  return (
    <SimpleTable
      showFilter={true}
      footer={false}
      module={'digitization-container-check'}
      label={'Digitization Log'}
      api={`/v1/digitization/container/checklist/`}
      columns={columns}
    />
  )
}
