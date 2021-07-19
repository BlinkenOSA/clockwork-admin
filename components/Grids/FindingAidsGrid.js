import {message, Col, Row, Spin} from "antd";
import React, {useRef} from "react";
import {useData} from "../../utils/hooks/useData";
import 'handsontable/dist/handsontable.full.css';
import style from "./FindingAidsGrid.module.css";

import { HotTable } from '@handsontable/react';
import {patch} from "../../utils/api";

const FindingAidsGrid = ({seriesID}) => {
  const { data, loading, refresh } = useData(seriesID ? `/v1/finding_aids/grid/list/${seriesID}/` : undefined, {});
  const { localeData, localeDataLoading } = useData(`/v1/controlled_list/select/locales`);
  const hot = useRef(null);

  const colHeaders = [
    'Archival Reference Code',
    'Title', 'Title (Original)',
    'Locale',
    'Contents Summary', 'Contents Summary (Original)',
    'Date (From)', 'Date (To)',
    'Start Time', 'End Time',
    'Note', 'Note (Original)'
  ];

  const getLocales = () => {
    console.log(localeData && localeData.map(ld => {return ld['locale_name']}));
    return localeData && localeData.map(ld => {return ld['locale_name']})
  };

  const columns = [
    {data: 'archival_reference_code', readOnly: true, width: 200},
    {data: 'title', width: 300},
    {data: 'title_original', width: 300},
    {data: 'original_locale', width: 100, type: 'dropdown', source: getLocales()},
    {data: 'contents_summary', width: 300},
    {data: 'contents_summary_original', width: 300},
    {data: 'date_from', width: 100},
    {data: 'date_to', width: 100},
    {data: 'time_start', width: 100},
    {data: 'time_end', width: 100},
    {data: 'notes', width: 200},
    {data: 'notes_original', width: 200},
  ];

  const afterChange = (change, source) => {
    if (source === 'loadData') {
      return;
    }

    const [row, prop, oldValue, newValue] = change[0];

    if (!oldValue && newValue === "") {
      return;
    }

    if (oldValue !== newValue) {
      const id = (data[row]['id']);
      const col = columns.findIndex(d => d.data === prop);

      patch(`/v1/finding_aids/${id}/`, {[prop]: newValue}).then(response => {
        hot.current.hotInstance.setCellMeta(row, col, 'className', 'success');
        hot.current.hotInstance.render();
        message.success('Record successfully updated!', 3);
      }).catch(error => {
        hot.current.hotInstance.setCellMeta(row, col, 'className', 'error');
        hot.current.hotInstance.render();
        switch (error.response.status) {
          case 400:
            const errorData = error.response.data;
            if (errorData.hasOwnProperty(prop)) {
              message.error(errorData[prop]);
            } else {
              message.error('Record update failed! (Wrong data format)', 3);
            }
            break;
          case 500:
            message.error('Record update failed! (Server error)', 3);
            break;
          default:
            message.error('Record update failed!', 3);
            break;
        }
      })
    }
  };

  const gridSettings = {
    data: data,
    columns: columns,
    rowHeaders: false,
    colHeaders: colHeaders,
    dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
    contextMenu: true,
    filters: true,
    licenseKey: 'non-commercial-and-evaluation',
    minHeight: 500,
    fixedRowsTop: [0, 1],
    fixedColumnsLeft: 1,
    search: true,
    selectionMode: 'single',
    afterChange: afterChange
  };

  return (
    <div className={style.TableWrapper}>
      <Row>
        <Col span={24}>
          {
            loading ?
            <div className={style.Spin}>
              <Spin size="large" />
            </div> :
            <HotTable ref={hot} settings={gridSettings} />
          }
        </Col>
      </Row>
    </div>
  )
};

export default FindingAidsGrid;
