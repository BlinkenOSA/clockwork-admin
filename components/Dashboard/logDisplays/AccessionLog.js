import React from "react";
import {useData} from "../../../utils/hooks/useData";
import {Space, Spin, Tag, Timeline} from "antd";
import { ClockCircleOutlined } from '@ant-design/icons';
import style from './LogDisplays.module.css';

const AccessionLog = () => {
  const { data, loading } = useData(`/v1/dashboard/logs/accessions/`);

  const renderItem = (item) => {
    const renderArchivalUnit = () => {
      if (item['archival_unit_legacy_name'] === null) {
        return <div>{item['archival_unit']['title_full']}</div>
      } else {
        return <div>{item['archival_unit_legacy_numbber']} {item['archival_unit_legacy_name']}</div>
      }
    };

    return (
      <Timeline.Item label={item['transfer_date']} dot={<ClockCircleOutlined/>} className={style.LogTimelineItem}>
        <div style={{fontStyle: 'italic'}}>{item['seq']}</div>
        {renderArchivalUnit()}
        <Tag>{item['user_created']}</Tag>
      </Timeline.Item>
    );
  };

  return (
    data ?
    <Timeline mode={'left'} className={style.LogTimeline}>
      {data.map(d => (renderItem(d)))}
    </Timeline> :
    <div className={style.Spin}>
      <Spin size="large" />
    </div>
  )
};

export default AccessionLog;
