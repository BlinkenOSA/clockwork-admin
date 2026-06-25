import {Button, Col, Form, Input, Tooltip, Row, Table} from "antd";
import React, {useState} from "react";
import { SelectOutlined } from '@ant-design/icons';
import style from "./FormAuthoritySelect.module.scss";
import {useData} from "../../../utils/hooks/useData";
import ReactHtmlParser from 'react-html-parser';

const parseAuthorityCache = (authorityCache) => {
  if (!authorityCache) {
    return null;
  }

  if (typeof authorityCache === 'string') {
    try {
      return JSON.parse(authorityCache);
    } catch (error) {
      return null;
    }
  }

  return authorityCache;
};

const getAuthorityCacheSummary = (authorityCache) => {
  const parsedCache = parseAuthorityCache(authorityCache);

  if (!parsedCache || typeof parsedCache !== 'object') {
    return null;
  }

  const wikipediaPages = parsedCache.wikipedia_pages && typeof parsedCache.wikipedia_pages === 'object'
    ? Object.entries(parsedCache.wikipedia_pages).filter(([, value]) => typeof value === 'string' && value !== '')
    : [];
  const properties = parsedCache.properties && typeof parsedCache.properties === 'object'
    ? Object.entries(parsedCache.properties).filter(([, value]) => value !== null && value !== undefined && value !== '')
    : [];

  return {
    title: parsedCache.title,
    description: parsedCache.description,
    viaf: parsedCache.viaf,
    wikipedia: parsedCache.wikipedia,
    wikipediaPages,
    properties
  };
};

const AuthoritySelectTable = ({tableColumnTitle, tableColumnField, urlField, dataSource, ...props}) => {
  const renderSelectButton = (data) => {
    return(
      <Tooltip title={'Select entry'}>
        <Button size="small" onClick={() => props.onSelect(data[tableColumnField])}>
          <SelectOutlined/>
        </Button>
      </Tooltip>
    )
  };

  const renderTitle = (data) => {
    return(
      <a href={urlField ? data[urlField] : data[tableColumnField]} target={'_blank'} rel="noopener noreferrer">
        {data[tableColumnField]}
      </a>
    )
  };

  const renderName = (data) => {
    return (ReactHtmlParser(data))
  }

  const columns = [
    {
      title: tableColumnTitle,
      key: tableColumnField,
      width: 150,
      sorter: false,
      render: renderTitle
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: false,
      render: renderName
    }, {
      title: 'Actions',
      width: 150,
      className: style.ActionColumn,
      render: renderSelectButton
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={tableColumnField}
      size={'middle'}
      bordered={true}
      style={{marginBottom: '20px'}}
    />
  )
};

export const FormAuthoritySelect = ({api, type, nameField='name', field, form, columnTitle, columnField,
                                      isWikidata=false, urlField}) => {
  const [searchValue, setSearchValue] = useState('');

  const {data, loading} = useData(
    searchValue === '' ? undefined : api,
    {query: searchValue, type: isWikidata ? undefined : type}
  );
  const wikidataCache = form.getFieldValue('wikidata_cache');
  console.log(wikidataCache)

  const onSearch = () => {
    const search = form.getFieldValue(nameField);

    if (search !== '') {
      setSearchValue(search);
    }
  };

  return (
    <React.Fragment>
      <Row gutter={10}>
        <Col span={4}>
          <Button
            className={style.SearchButton}
            onClick={() => onSearch()}
            loading={loading}
          >
            Search
          </Button>
        </Col>
        <Col span={20}>
          <Form.Item name={field} label="Selected Identifier">
            <Input disabled={true} />
          </Form.Item>
        </Col>
      </Row>
      {
        wikidataCache &&
        <Row>
          <Col span={24}>
            <div className={style.CacheSummary}>
              {
                wikidataCache.title &&
                <div className={style.CacheSummaryTitle}>{wikidataCache.title}</div>
              }
              {
                wikidataCache.description &&
                <div className={style.CacheSummaryDescription}>{wikidataCache.description}</div>
              }
              <ul className={style.CacheSummaryList}>
                {
                  wikidataCache.viaf &&
                  <li>
                    VIAF: <a href={`https://viaf.org/viaf/${wikidataCache.viaf}`} target={'_blank'} rel="noopener noreferrer">{wikidataCache.viaf}</a>
                  </li>
                }
                {
                  wikidataCache.wikipedia &&
                  <li>
                    Wikipedia: <a href={authorityCacheSummary.wikipedia} target={'_blank'} rel="noopener noreferrer">{authorityCacheSummary.wikipedia}</a>
                  </li>
                }
                {
                  wikidataCache.wikipediaPages.length > 0 &&
                  <li>
                    Wikipedia Pages:
                    <ul className={style.CacheNestedList}>
                      {wikidataCache.wikipediaPages.map(([key, value]) => (
                        <li key={key}>
                          {key}: <a href={value} target={'_blank'} rel="noopener noreferrer">{value}</a>
                        </li>
                      ))}
                    </ul>
                  </li>
                }
                {
                  wikidataCache.properties.length > 0 &&
                  <li>
                    Properties:
                    <ul className={style.CacheNestedList}>
                      {wikidataCache.properties.map(([key, value]) => (
                        <li key={key}>
                          {key}: {Array.isArray(value) ? value.join(', ') : value}
                        </li>
                      ))}
                    </ul>
                  </li>
                }
              </ul>
            </div>
          </Col>
        </Row>
      }
      {
        data && data.length > 0 &&
        <Row>
          <Col span={24} className={style.AuthorityTable}>
            <AuthoritySelectTable
              dataSource={data}
              onSelect={(val) => form.setFieldsValue({[field]: val})}
              tableColumnTitle={columnTitle}
              tableColumnField={columnField}
              urlField={urlField}
            />
          </Col>
        </Row>
      }
    </React.Fragment>
  )
};
