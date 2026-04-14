import React, {useCallback, useMemo, useState} from "react";
import {Badge, Button, Col, Empty, Input, Row, Select, Tooltip} from "antd";
import SimpleTable from "../../Tables/SimpleTable";
import style from "./SearchPage.module.scss";
import {EditOutlined, EyeOutlined, GlobalOutlined} from "@ant-design/icons";
import Link from "next/link";

const {Search} = Input;
const FACET_FIELDS = ['description_level', 'series_reference_code'];

const getCellValue = (record, keys = []) => {
  for (const key of keys) {
    const value = record?.[key];

    if (value !== undefined && value !== null && value !== '') {
      return value;
    }
  }

  return '-';
};

const getHighlightedText = (record) => {
  const getField = (field) => {
    if (record.highlights.hasOwnProperty(field)) {
      return record.highlights[field];
    }
  }

  if (record.hasOwnProperty('highlights')) {
    return (
        <div className={style.HighlightedResult}>
          <div className={style.SearchTitle}
               dangerouslySetInnerHTML={{__html: getField('title')}}/>
          <div className={style.SearchContentsSummary}
               dangerouslySetInnerHTML={{__html: getField('contents_summary')}}/>
          {
            record.highlights.hasOwnProperty('title_original') &&
            <div className={style.SearchTitleOriginal}
                 dangerouslySetInnerHTML={{__html: getField('title_original')}}/>
          }
          {
              record.highlights.hasOwnProperty('contents_summary_original') &&
              <div className={style.SearchContentsSummaryOriginal}
                   dangerouslySetInnerHTML={{__html: getField('contents_summary_original')}}/>
          }
        </div>
    );
  }
}

const getReferenceCode = (record) => {
  return (
      <div className={style.SearchTitle}>{record['reference_code']}</div>
  )
}

const renderRecordType = (record, text) => {
  return (
      <div style={{textAlign: "center"}}>
        <Badge count={record['record_type']} style={{ backgroundColor: '#666', borderRadius: '3px', fontSize: '0.8em' }} />
      </div>
  )
}

const getActions = (record) => {
  const getURL = (identifier, action) => {
    if (identifier.indexOf('finding-aids-') !== -1) {
      const id = identifier.replace('finding-aids-', '');
      return `/finding-aids/entities/${action}/${id}`;
    }

    if (identifier.indexOf('isad-') !== -1) {
      const id = identifier.replace('isad-', '');
      return `/isad/${action}/${id}`;
    }
  }

  return (
      <Button.Group>
        {
          record['published'] === true &&
          <Link href={`https://catalog.archivum.org/catalog/${record['id']}`} target="_blank">
            <Tooltip key={'edit'} title={'Edit'}>
              <Button size="small" icon={<GlobalOutlined/>}/>
            </Tooltip>
          </Link>
        }
        <Link href={getURL(record['ams_id'], 'edit')}>
          <Tooltip key={'edit'} title={'Edit'}>
            <Button size="small" icon={<EditOutlined/>}/>
          </Tooltip>
        </Link>
      </Button.Group>
  )
}

const columns = [
  {
    title: 'Reference Code',
    key: 'reference_code',
    render: getReferenceCode,
    width: 180,
  }, {
    title: 'Result',
    key: 'result',
    render: getHighlightedText,
  }, {
    title: 'Type',
    width: 90,
    render: renderRecordType
  }, {
    title: 'Actions',
    key: 'actions',
    width: 100,
    className: style.ActionColumn,
    render: getActions
  }
];

const getFacetOptions = (facets, field) => {
  const values = facets?.[field] || {};

  return Object.entries(values)
      .map(([value, count]) => ({
        value,
        label: `${value} (${count})`,
        count
      }))
      .sort((a, b) => b.count - a.count)
      .map(({value, label}) => ({value, label}));
};

const filterFacetOption = (input, option) =>
    (option?.label || '').toLowerCase().includes(input.toLowerCase());

const SearchPage = () => {
  const initialFacetSelection = {
    description_level: undefined,
    record_type: undefined,
    series_reference_code: undefined
  };

  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [facets, setFacets] = useState({});
  const [selectedFacets, setSelectedFacets] = useState(initialFacetSelection);

  const externalFilters = useMemo(() => ({
    search: submittedQuery,
    ...Object.fromEntries(
        Object.entries(selectedFacets).filter(([, value]) => value !== undefined && value !== null && value !== '')
    )
  }), [submittedQuery, selectedFacets]);

  const resetSearchState = () => {
    setSubmittedQuery('');
    setHasSearched(false);
    setFacets({});
    setSelectedFacets(initialFacetSelection);
  };

  const onSearch = (value) => {
    const trimmedValue = value?.trim() || '';

    if (!trimmedValue) {
      resetSearchState();
      return;
    }

    setSubmittedQuery(trimmedValue);
    setHasSearched(true);
  };

  const handleFacetChange = (field, value) => {
    setSelectedFacets((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleDataLoaded = useCallback((responseData) => {
    setFacets(responseData?.facets || {});
  }, []);

  const getFacetPlaceholder = (field) => field.split('_').map(word => `${word[0].toUpperCase()}${word.slice(1)}`).join(' ');

  return (
    <div className={style.SearchPage}>
      <Row className={style.SearchRow} gutter={[12, 12]}>
        <Col md={12}>
          <Search
            value={query}
            placeholder="Search dashboard records"
            enterButton
            allowClear
            size="middle"
            onChange={(e) => {
              const nextValue = e.target.value;
              setQuery(nextValue);

              if (!nextValue?.trim()) {
                resetSearchState();
              }
            }}
            onSearch={onSearch}
          />
        </Col>
        {
          FACET_FIELDS.map((field) => (
              <Col md={6} key={field}>
                <Select
                  allowClear
                  showSearch
                  size="middle"
                  placeholder={getFacetPlaceholder(field)}
                  options={getFacetOptions(facets, field)}
                  value={selectedFacets[field]}
                  onChange={(value) => handleFacetChange(field, value)}
                  optionFilterProp="label"
                  filterOption={filterFacetOption}
                  disabled={!hasSearched}
                  style={{width: '100%'}}
                />
              </Col>
          ))
        }
      </Row>

      {
        hasSearched ? (
          <div className={style.TableWrap}>
            <SimpleTable
              api={'/v1/dashboard/search/'}
              module={'dashboard-search'}
              button={''}
              columns={columns}
              actions={[]}
              footer={false}
              showFilters={false}
              numberRows={true}
              externalFilters={externalFilters}
              onDataLoaded={handleDataLoaded}
              rowKey={(record) => `${record?.module || record?.type || 'result'}-${record?.id || record?.pk || record?.uuid || record?.title || record?.name}`}
            />
          </div>
        ) : (
          <div className={style.EmptyState}>
            <Empty description="Enter a search query to see results."/>
          </div>
        )
      }
    </div>
  )
}

export default SearchPage;
