import React from "react";
import {useData} from "../../../utils/hooks/useData";
import {Spin, Tag, Timeline} from "antd";
import { AiOutlineClockCircle } from 'react-icons/ai';
import style from './LogDisplays.module.css';
import dayjs from "dayjs";

const FindingAidsLog = ({type}) => {
  const { data, error } = useData(`/v1/dashboard/logs/finding-aids-${type}/`);

  const renderItem = (item) => {
    const getLabel = () => {
      return (
        <React.Fragment>
        <div>{dayjs(item[`date_${type}d`]).format('YYYY-MM-DD')}</div>
        <div style={{fontSize: '12px'}}>{dayjs(item[`date_${type}d`]).format('HH:mm:ss')}</div>
        </React.Fragment>
      )
    };

    return (
      <Timeline.Item label={getLabel()} dot={<AiOutlineClockCircle/>} className={style.LogTimelineItem}>
        <div>{item['archival_reference_code']}</div>
        <div>{item['title']}</div>
        <Tag>{item[`user_${type}d`]}</Tag>
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

export default FindingAidsLog;
