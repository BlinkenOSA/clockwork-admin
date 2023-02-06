import {Button, Col, Dropdown, Menu, Tooltip} from "antd";
import {PrinterOutlined} from "@ant-design/icons";
import React from "react";
import {useData} from "../../utils/hooks/useData";
import {CheckCircleTwoTone, CloseCircleTwoTone} from "@ant-design/icons";
const API = process.env.NEXT_PUBLIC_CLOCKWORK_API;

const LabelTypeSelector = ({seriesID}) => {
  const { data, loading } = useData(seriesID ? `/v1/finding_aids/carriers/${seriesID}/` : null);

  const menu = () => {
    const getLabel = (d) => {
      if (d['templateExists']) {
        return (
          <a target="_blank" href={`${API}/v1/finding_aids/labels/${d['carrier_type_id']}/${seriesID}/`}>
            <CheckCircleTwoTone twoToneColor="#52c41a" /> {d['carrier_type']} ({d['total']})
          </a>
        )
      } else {
        return (
          <React.Fragment>
            <CloseCircleTwoTone twoToneColor="#eb2f96" /> {d['carrier_type']} ({d['total']})
          </React.Fragment>
        )
      }
    }

    return data && data.map((d, idx) => {
      return {
        key: `menu_${idx}`,
        label: getLabel(d)
      }
    })
  }

  return (
    <Tooltip key={'label_print'} title={'Label Print'}>
      <Dropdown menu={{items: menu()}} placement="bottom">
        <Button type={'default'} style={{marginLeft: '10px'}}>
          <PrinterOutlined/> Label Print
        </Button>
      </Dropdown>
    </Tooltip>

  )
};

export default LabelTypeSelector;
