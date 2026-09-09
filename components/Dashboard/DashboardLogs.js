import React from "react";
import {Col, Tabs} from "antd";
import AccessionLog from "./logDisplays/AccessionLog";
import ArchivalUnitLog from "./logDisplays/ArchivalUnitLog";
import IsadLog from "./logDisplays/IsadLog";
import FindingAidsLog from "./logDisplays/FindingAidsLog";

const DashboardLogs = () => {
  const items = [
    {
      key: 'accessions',
      label: 'Accessions',
      children: <AccessionLog />
      ,
    },
    {
      key: 'archival_units',
      label: 'Archival Units',
      children: <ArchivalUnitLog />
    },
    {
      key: 'isad-created',
      label: 'ISAD(G) (Created)',
      children: <IsadLog type={'create'} />,
    },
    {
      key: 'isad-updated',
      label: 'ISAD(G) (Updated)',
      children: <IsadLog type={'update'} />
    },
    {
      key: 'folder_items-created',
      label: 'Folders / Items (Created)',
      children: <FindingAidsLog type={'create'} />
    },
    {
      key: 'folder_items-updated',
      label: 'Folders / Items (Updated)',
      children: <FindingAidsLog type={'update'} />
    },
  ];

  return (
    <React.Fragment>
      <Col xs={24}>
        <Tabs
            items={items}
            defaultActiveKey="accessions"
            tabPosition={'right'}>
        </Tabs>
      </Col>
    </React.Fragment>
  )
};

export default DashboardLogs;
