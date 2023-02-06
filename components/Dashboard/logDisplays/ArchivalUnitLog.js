import React from "react";
import {useData} from "../../../utils/hooks/useData";
import {Space, Spin, Tag, Timeline} from "antd";
import { AiOutlineClockCircle } from 'react-icons/ai';
import style from './LogDisplays.module.css';
import dayjs from "dayjs";

const ArchivalUnitLog = () => {
  const { data, error } = useData(`/v1/dashboard/logs/archival_units/`);

  const renderItem = (item) => {
    const getLabel = () => {
      return (
        <React.Fragment>
        <div>{dayjs(item['date_created']).format('YYYY-MM-DD')}</div>
        <div style={{fontSize: '12px'}}>{dayjs(item['date_created']).format('HH:mm:ss')}</div>
        </React.Fragment>
      )
    };

    return (
      <Timeline.Item label={getLabel()} dot={<AiOutlineClockCircle/>} className={style.LogTimelineItem}>
        <div>{item['title_full']}</div>
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

export default ArchivalUnitLog;
