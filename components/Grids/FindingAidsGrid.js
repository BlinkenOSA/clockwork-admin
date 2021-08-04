import {message, Col, Row, Spin, Input, Button, Form} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {useData} from "../../utils/hooks/useData";
import 'handsontable/dist/handsontable.full.css';
import style from "./FindingAidsGrid.module.css";
import { LoadingOutlined } from '@ant-design/icons';

import { HotTable } from '@handsontable/react';
import {get, patch} from "../../utils/api";
import FindingAidsGridFilter from "./FindingAidsGridFilter";

const FindingAidsGrid = ({seriesID}) => {
  const { data, loading, refresh } = useData(seriesID ? `/v1/finding_aids/grid/list/${seriesID}/` : undefined, {});
  const localeData = useData(`/v1/controlled_list/select/locales/`);

  const hot = useRef(undefined);
  const filterText = useRef("");
  const total = useRef(0);
  const querySet = useRef([]);

  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const colHeaders = [
    'Archival Reference Code',
    'Title', 'Title (Original)',
    'Locale',
    'Contents Summary', 'Contents Summary (Original)',
    'Date (From)', 'Date (To)',
    'Start Time', 'End Time',
    'Note', 'Note (Original)'
  ];

  const getLocales = (query, process) => {
    get(`/v1/controlled_list/select/locales`, query ? {search: query} : undefined)
      .then(response => response.data.map(ld => {return ld['id']}))
      .then(data => process(data));
  };

  const columns = [
    {data: 'archival_reference_code', readOnly: true, width: 200},
    {data: 'title', width: 300},
    {data: 'title_original', width: 300},
    {data: 'original_locale', width: 100, type: 'autocomplete', source: getLocales},
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
    const getNewValue = (prop, newValue) => {
      // Locale setting
      if (prop === 'original_locale') {
        const filteredData = localeData['data'].filter(x => x.id === newValue)[0];
        if (filteredData.hasOwnProperty("id")) {
          return filteredData["id"]
        } else {
          return newValue
        }
      }

      return newValue
    };

    if (source === 'loadData') {
      return;
    }

    const [row, prop, oldValue, newValue] = change[0];
    const value = getNewValue(prop, newValue);

    if (!oldValue && value === "") {
      return;
    }

    if (oldValue !== value) {
      const id = (data[row]['id']);
      const col = columns.findIndex(d => d.data === prop);

      patch(`/v1/finding_aids/${id}/`, {[prop]: value}).then(response => {
        hot.current.hotInstance.setCellMeta(row, col, 'className', 'success');
        hot.current.hotInstance.render();
        message.success('Record successfully updated!', 1);
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

  const goToFoundRecord = (results) => {
    const firstQueryResult = results.shift();
    querySet.current = results;
    hot.current.hotInstance.scrollViewportTo(firstQueryResult['row'], firstQueryResult['col']);
    hot.current.hotInstance.selectCell(firstQueryResult['row'], firstQueryResult['col']);
    hot.current.hotInstance.render();
  };

  const searchAndGoToRecord = (findValue, repeat=false) => {
    const search = hot.current.hotInstance.getPlugin('search');
    const results = search.query(findValue);
    total.current = results.length;
    if (results.length > 0) {
      goToFoundRecord(results);
    }
    if (repeat) {
      message.info("Starting from the beginning...")
    } else {
      message.info(`Found data in ${total.current} cell.`)
    }
  };

  const onFilter = (findValue) => {
    if (findValue !== filterText.current) {
      filterText.current = findValue;
      searchAndGoToRecord(findValue)
    } else {
      if (querySet.current.length > 0) {
        goToFoundRecord(querySet.current)
      } else {
        searchAndGoToRecord(findValue, true)
      }
    }
  };

  const onReplace = (find, replace) => {
    const search = hot.current.hotInstance.getPlugin('search');
    const results = search.query(find);
    results.forEach(result => {
      const data = hot.current.hotInstance.getDataAtCell(result['row'], result['col']);
      const findRegEx = new RegExp(find, "ig");
      hot.current.hotInstance.setDataAtCell(result['row'], result['col'], data.replace(findRegEx, replace));
    });
    message.info(`${results.length} occurences of '${find}' was changed to '${replace}'.`)
  };

  const gridSettings = {
    data: data,
    columns: columns,
    rowHeaders: false,
    colHeaders: colHeaders,
    dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
    contextMenu: false,
    filters: true,
    licenseKey: 'non-commercial-and-evaluation',
    minHeight: 500,
    fixedRowsTop: [0, 1],
    fixedColumnsLeft: 1,
    search: true,
    selectionMode: 'single',
    manualColumnResize: true,
    manualRowResize: true,
    afterChange: afterChange
  };

  return (
    <React.Fragment>
      <FindingAidsGridFilter onFilter={onFilter} onReplace={onReplace}/>
      <div className={style.TableWrapper}>
        <Row>
          <Col span={24}>
            {
              loading ?
              <div className={style.Spin}>
                <Spin size="large" indicator={loadingIcon} />
              </div> :
              <HotTable ref={hot} settings={gridSettings} />
            }
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
};

export default FindingAidsGrid;
