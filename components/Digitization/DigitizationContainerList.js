import React from 'react'
import PopupTable from "../../components/Tables/PopupTable";
import {renderDigitalVersion} from "../../utils/renders/renderDigitalVersion";
import {renderDigitalVersionResearchCloud} from "../../utils/renders/renderDigitalVersionResearchCloud";
import {renderLevel} from "../../utils/renders/renderLevel"
import style from "./DigitizationContainerList.module.scss"

export default function DigitizationContainerList() {
  const renderContainerNo = (data, record) => {
    return <a className={style.ContainerNo} href={'/finding-aids/containers/' + record['archival_unit_id']} target={'_blank'} rel="noreferrer">{data}</a>
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
      render: renderDigitalVersionResearchCloud
    }, {
      title: 'Online',
      dataIndex: 'available_online',
      key: 'available_online',
      width: 120,
      className: 'centerColumn',
      sorter: true,
      render: renderDigitalVersion
    }, {
      title: 'Creation Date (Digital)',
      dataIndex: 'creation_date',
      key: 'creation_date',
      className: 'centerColumn',
      width: 150,
      sorter: true
    }, {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      className: 'centerColumn',
      width: 80,
      render: renderLevel
    }, {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
      className: 'centerColumn',
    }, {
      title: 'Carrier Type',
      dataIndex: 'carrier_type',
      key: 'carrier_type',
      className: 'centerColumn',
      sorter: true
    },
  ];

  return (
    <PopupTable
      showFilter={true}
      footer={false}
      module={'digitization'}
      label={'Digitization Log'}
      api={`/v1/digitization/container/`}
      columns={columns}
      actions={['view']}
    />
  )
}
