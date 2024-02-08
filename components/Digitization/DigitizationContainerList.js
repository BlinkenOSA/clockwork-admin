import React from 'react'
import {Card} from "antd";
import PopupTable from "../../components/Tables/PopupTable";
import {renderDigitalVersion} from "../../utils/renders/renderDigitalVersion";
import {renderDigitalVersionResearchCloud} from "../../utils/renders/renderDigitalVersionResearchCloud";

export default function DigitizationContainerList() {
  const columns = [
    {
      title: 'Container No.',
      dataIndex: 'container_no',
      key: 'container_no',
      sorter: true,
      width: 200
    }, {
      title: 'Barcode',
      dataIndex: 'barcode',
      key: 'barcode',
      width: 150,
      sorter: true
    }, {
      title: 'Digital Version',
      dataIndex: 'digital_version_exists',
      key: 'digital_version_exists',
      width: 150,
      className: 'centerColumn',
      sorter: true,
      render: renderDigitalVersion
    }, {
      title: 'Research Cloud',
      key: 'digital_version_research_cloud',
      width: 150,
      className: 'centerColumn',
      sorter: true,
      render: renderDigitalVersionResearchCloud
    }, {
      title: 'Online',
      dataIndex: 'digital_version_online',
      key: 'digital_version_online',
      width: 150,
      className: 'centerColumn',
      sorter: true,
      render: renderDigitalVersion
    }, {
      title: 'Creation Date',
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
