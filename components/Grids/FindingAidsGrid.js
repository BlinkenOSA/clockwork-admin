import {message, Col, Row, Spin, Input, Button, Form} from "antd";
import React, {useRef} from "react";
import {useData} from "../../utils/hooks/useData";
import 'handsontable/dist/handsontable.full.min.css';
import style from "./FindingAidsGrid.module.css";
import { LoadingOutlined } from '@ant-design/icons';

import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';

import {get, patch} from "../../utils/api";
import FindingAidsGridFilter from "./FindingAidsGridFilter";
import FindingAidsHideColumns from "./FindingAidsHideColumns";

registerAllModules();

const FindingAidsGrid = ({seriesID}) => {
  const { data, loading, refresh } = useData(seriesID ? `/v1/finding_aids/grid/list/${seriesID}/` : undefined, {});
  const localeData = useData(`/v1/controlled_list/select/locales/`);

  const hot = useRef(undefined);
  const filterText = useRef("");
  const total = useRef(0);
  const currentFind = useRef({});
  const querySet = useRef([]);

  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const ACCESS_RIGHTS = [
    {value: '1', label: 'Not Restricted'},
    {value: '3', label: 'Restricted'}
  ]

  const getLocales = (query, process) => {
    get(`/v1/controlled_list/select/locales`, query ? {search: query} : undefined)
      .then(response => response.data.map(ld => {return ld['id']}))
      .then(data => process(data));
  };

  const getAccessRights = (query, process) => {
    return process(ACCESS_RIGHTS.map(ar => ar['label']))
  }

  const columns = [
    {data: 'archival_reference_code', label: 'Archival Reference Code', readOnly: true, width: 200},
    {data: 'legacy_id', label: 'Legacy ID', width: 150},
    {data: 'title', label: 'Title', width: 300},
    {data: 'title_original', label: 'Title (Original)', width: 300},
    {data: 'original_locale', label: 'Locale', width: 100, type: 'dropdown', source: getLocales},
    {data: 'contents_summary', label: 'Contents Summary', width: 300},
    {data: 'contents_summary_original', label: 'Contents Summary (Original)', width: 300},
    {data: 'date_from', label: 'Date (From)', width: 100},
    {data: 'date_to', label: 'Date (To)', width: 100},
    {data: 'access_rights', label: 'Access Rights', width: 100, type: 'dropdown', source: getAccessRights},
    {data: 'access_rights_restriction_date', label: 'Restriction Date', width: 100, type: 'date'},
    {data: 'time_start', label: 'Start Time', width: 100},
    {data: 'time_end', label: 'End Time', width: 100},
    {data: 'note', label: 'Note', width: 200},
    {data: 'note_original', label: 'Note (Original)', width: 200},
  ];

  const afterChange = (changes, source) => {
    const getNewValue = (prop, newValue) => {
      // Locale setting
      if (prop === 'original_locale') {
        if (newValue) {
          const filteredData = localeData['data'].filter(x => x.id === newValue)[0];
          if (filteredData.hasOwnProperty("id")) {
            return filteredData["id"]
          } else {
            return newValue
          }
        } else {
          return newValue
        }
      }

      return newValue
    };

    if (source === 'loadData' || changes == null) {
      return;
    }

    changes.forEach(change => {
      const [row, prop, oldValue, newValue] = change;
      let value = getNewValue(prop, newValue);

      if (!oldValue && value === "") {
        return;
      }

      if (oldValue !== value) {
        const id = data[row]['id'];
        const col = columns.findIndex(d => d.data === prop);

        // access_rights
        if (prop === 'access_rights') {
          const filtered = ACCESS_RIGHTS.filter(ar => ar['label'] === value)
          if (filtered.length > 0) {
            value = filtered[0]['value']
          }
        }

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
    })
  };

  const goToFoundRecord = (results) => {
    currentFind.current = results.shift();
    querySet.current = results;
    hot.current.hotInstance.scrollViewportTo(currentFind['row'], 0);
    hot.current.hotInstance.selectCell(currentFind.current['row'], currentFind.current['col']);
    hot.current.hotInstance.render();
    message.info(`Result ${total.current - results.length} of ${total.current}`, 0.5)
  };

  const searchAndGoToRecord = (findValue, repeat=false) => {
    const search = hot.current.hotInstance.getPlugin('search');
    const results = search.query(findValue);
    total.current = results.length;
    if (results.length > 0) {
      goToFoundRecord(results);
    } else {
      message.info("No records can be found!", 1)
    }
  };

  const onFilter = (findValue) => {
    if (findValue !== filterText.current) {
      filterText.current = findValue;
      searchAndGoToRecord(findValue);
    } else {
      if (querySet.current.length > 0) {
        goToFoundRecord(querySet.current)
      } else {
        searchAndGoToRecord(findValue, true)
      }
    }
  };

  const onReplace = (find, replace) => {
    // Van currentFind
    if (Object.keys(currentFind.current).length > 0) {
      const data = hot.current.hotInstance.getDataAtCell(currentFind.current['row'], currentFind.current['col']);
      const findRegEx = new RegExp(find, "ig");
      hot.current.hotInstance.setDataAtCell(currentFind.current['row'], currentFind.current['col'], data.replace(findRegEx, replace));
    }
  };

  const onReplaceAll = (find, replace) => {
    const search = hot.current.hotInstance.getPlugin('search');
    const results = search.query(find);
    results.forEach(result => {
      const data = hot.current.hotInstance.getDataAtCell(result['row'], result['col']);
      const findRegEx = new RegExp(find, "ig");
      hot.current.hotInstance.setDataAtCell(result['row'], result['col'], data.replace(findRegEx, replace));
    });
    message.info(`${results.length} occurences of '${find}' was changed to '${replace}'.`)
  };

  return (
    <React.Fragment>
      <FindingAidsGridFilter onFilter={onFilter} onReplace={onReplace} onReplaceAll={onReplaceAll} seriesID={seriesID}/>
      <div className={style.TableWrapper}>
        <Row>
          <Col span={24}>
            {
              loading ?
              <div className={style.Spin}>
                <Spin size="large" indicator={loadingIcon} />
              </div> :
              <HotTable
                ref={hot}
                data={data}
                columns={columns}
                rowHeaders={false}
                colHeaders={(index) => columns[index]['label']}
                manualColumnMove={true}
                dropdownMenu={['filter_by_condition', 'filter_by_value', 'filter_action_bar']}
                filters={true}
                licenseKey={'non-commercial-and-evaluation'}
                minHeight={500}
                fixedRowsTop={0}
                search={true}
                selectionMode={'single'}
                manualColumnResize={true}
                manualRowResize={true}
                afterChange={afterChange}
              />
            }
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
};

export default FindingAidsGrid;
