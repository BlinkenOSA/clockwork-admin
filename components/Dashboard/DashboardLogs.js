import React from "react";
import {Col, Tabs} from "antd";
import AccessionLog from "./logDisplays/AccessionLog";
import ArchivalUnitLog from "./logDisplays/ArchivalUnitLog";
import IsadLog from "./logDisplays/IsadLog";
import FindingAidsLog from "./logDisplays/FindingAidsLog";

const { TabPane } = Tabs;

const DashboardLogs = () => {
  return (
    <React.Fragment>
      <Col xs={24}>
        <Tabs defaultActiveKey="accessions" tabPosition={'right'}>
          <TabPane tab="Accessions" key="accessions">
            <AccessionLog />
          </TabPane>
          <TabPane tab="Archival Units" key="archival_units">
            <ArchivalUnitLog />
          </TabPane>
          <TabPane tab="ISAD(G) (Created)" key="isad-created">
            <IsadLog type={'create'} />
          </TabPane>
          <TabPane tab="ISAD(G) (Updated)" key="isad-updated">
            <IsadLog type={'update'} />
          </TabPane>
          <TabPane tab="Folders / Items (Created)" key="folder_items-created">
            <FindingAidsLog type={'create'} />
          </TabPane>
          <TabPane tab="Folders / Items (Updated)" key="folder_items-updated">
            <FindingAidsLog type={'update'} />
          </TabPane>
        </Tabs>
      </Col>
    </React.Fragment>
  )
};

export default DashboardLogs;
