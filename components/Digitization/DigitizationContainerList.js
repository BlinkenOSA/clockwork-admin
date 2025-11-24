import React from 'react'
import PopupTable from "../../components/Tables/PopupTable";
import {renderDigitalVersion} from "../../utils/renders/renderDigitalVersion";
import {renderDigitalVersionResearchCloud} from "../../utils/renders/renderDigitalVersionResearchCloud";
import moment from "moment/moment";
import style from "./DigitizationContainerList.module.scss"

export default function DigitizationContainerList() {
  const renderDate = (data) => {
    return (moment(data).format('YYYY-MM-DD'))
  }

  const renderContainerNo = (data, record) => {
    return <a className={style.ContainerNo} href={'/finding-aids/containers/' + record['archival_unit_id']} target={'_blank'} rel="noreferrer">{data}</a>
  }

  const columns = [
    {
      title: 'Container No.',
      dataIndex: 'container_no',
      key: 'container_no',
      sorter: true,
      render: renderContainerNo,
      width: 200
    }, {
      title: 'Barcode',
      dataIndex: 'barcode',
      key: 'barcode',
      width: 150,
      sorter: true
    }, {
      title: 'Date Updated',
      dataIndex: 'date_updated',
      key: 'date_updated',
      width: 120,
      className: 'centerColumn',
      render: renderDate,
      sorter: true
    }, {
      title: 'Digital Version',
      dataIndex: 'digital_version_exists',
      key: 'digital_version_exists',
      width: 120,
      className: 'centerColumn',
      sorter: true,
      render: renderDigitalVersion
    }, {
      title: 'Research Cloud',
      key: 'digital_version_research_cloud',
      width: 120,
      className: 'centerColumn',
      sorter: true,
      render: renderDigitalVersionResearchCloud
    }, {
      title: 'Online',
      dataIndex: 'digital_version_online',
      key: 'digital_version_online',
      width: 120,
      className: 'centerColumn',
      sorter: true,
      render: renderDigitalVersion
    }, {
      title: 'Creation Date (Digital)',
      dataIndex: 'digital_version_creation_date',
      key: 'digital_version_creation_date',
      className: 'centerColumn',
      width: 150,
      sorter: true
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
