import {Button, Col, Form, Input, Tooltip, Row, Table} from "antd";
import React, {useEffect, useState} from "react";
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

const getWikipediaLanguageLabel = (wikiKey) => {
  const languageCode = wikiKey.replace(/wiki$/i, '');
  const normalizedLanguageCode = languageCode.replace(/_/g, '-');
  const candidateCodes = [
    normalizedLanguageCode,
    normalizedLanguageCode.split('-')[0],
    normalizedLanguageCode.slice(0, 3),
    normalizedLanguageCode.slice(0, 2)
  ].filter((code, index, array) => code && array.indexOf(code) === index);

  if (typeof Intl !== 'undefined' && typeof Intl.DisplayNames === 'function') {
    try {
      const displayNames = new Intl.DisplayNames(['en'], {type: 'language'});

      for (const candidateCode of candidateCodes) {
        const languageName = displayNames.of(candidateCode);

        if (languageName && languageName.toLowerCase() !== candidateCode.toLowerCase()) {
          return languageName;
        }
      }
    } catch (error) {
      // Fall back to a readable code label for Wikimedia-specific variants.
    }
  }

  return normalizedLanguageCode.replace(/-/g, ' ');
};

const getDisplayUrl = (url) => {
  try {
    return decodeURI(url);
  } catch (error) {
    return url;
  }
};

const getPropertyLabel = (propertyKey) => {
  return propertyKey
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const getAuthorityCacheSummary = (authorityCache) => {
  const parsedCache = parseAuthorityCache(authorityCache);

  if (!parsedCache || typeof parsedCache !== 'object') {
    return null;
  }

  const wikipediaPagesSource = parsedCache.wikipediaPages || parsedCache.wikipedia_pages;
  const wikipediaPages = Array.isArray(wikipediaPagesSource)
    ? wikipediaPagesSource.filter((entry) => Array.isArray(entry) && entry.length >= 2 && typeof entry[1] === 'string' && entry[1] !== '')
    : wikipediaPagesSource && typeof wikipediaPagesSource === 'object'
      ? Object.entries(wikipediaPagesSource).filter(([, value]) => typeof value === 'string' && value !== '')
      : [];
  const propertiesSource = parsedCache.properties;
  const properties = Array.isArray(propertiesSource)
    ? propertiesSource.filter((entry) => Array.isArray(entry) && entry.length >= 2 && entry[1] !== null && entry[1] !== undefined && entry[1] !== '')
    : propertiesSource && typeof propertiesSource === 'object'
      ? Object.entries(propertiesSource).filter(([, value]) => value !== null && value !== undefined && value !== '')
      : [];
  const imageProperty = properties.find(([key, value]) => key === 'image' && typeof value === 'string' && value !== '');
  const image = imageProperty ? imageProperty[1] : null;
  const visibleProperties = properties.filter(([key]) => key !== 'image');

  return {
    title: parsedCache.title,
    description: parsedCache.description,
    viaf: parsedCache.viaf,
    wikipedia: parsedCache.wikipedia,
    wikipediaPages,
    image,
    properties: visibleProperties
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
  const [showAllWikipediaPages, setShowAllWikipediaPages] = useState(false);

  const {data, loading} = useData(
    searchValue === '' ? undefined : api,
    {query: searchValue, type: isWikidata ? undefined : type}
  );

  const wikidataCache = getAuthorityCacheSummary(form.getFieldValue('wikidata_cache'));
  const wikidataId = form.getFieldValue(field);
  const wikidataUrl = wikidataId ? `https://www.wikidata.org/wiki/${wikidataId}` : null;
  const visibleWikipediaPages = showAllWikipediaPages
    ? wikidataCache?.wikipediaPages || []
    : (wikidataCache?.wikipediaPages || []).slice(0, 5);

  useEffect(() => {
    setShowAllWikipediaPages(false);
  }, [wikidataId]);

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
              {
                wikidataCache.image &&
                <div className={style.CacheSummaryImageWrapper}>
                  <img className={style.CacheSummaryImage} src={wikidataCache.image} alt={wikidataCache.title || 'Authority image'} />
                </div>
              }
              <ul className={style.CacheSummaryList}>
                {
                  wikidataUrl &&
                  <li>
                    Wikidata: <a className={style.CacheSummaryLink} href={wikidataUrl} target={'_blank'} rel="noopener noreferrer">{getDisplayUrl(wikidataUrl)}</a>
                  </li>
                }
                {
                  wikidataCache.viaf &&
                  <li>
                    VIAF: <a className={style.CacheSummaryLink} href={`https://viaf.org/viaf/${wikidataCache.viaf}`} target={'_blank'} rel="noopener noreferrer">{wikidataCache.viaf}</a>
                  </li>
                }
                {
                  wikidataCache.wikipedia &&
                  <li>
                    Wikipedia (main): <a className={style.CacheSummaryLink} href={wikidataCache.wikipedia} target={'_blank'} rel="noopener noreferrer">{getDisplayUrl(wikidataCache.wikipedia)}</a>
                  </li>
                }
                {
                  wikidataCache.wikipediaPages.length > 0 &&
                  <li>
                    Wikipedia Pages:
                    <ul className={style.CacheNestedList}>
                      {visibleWikipediaPages.map(([key, value]) => (
                        <li key={key}>
                          {getWikipediaLanguageLabel(key)}: <a className={style.CacheSummaryLink} href={value} target={'_blank'} rel="noopener noreferrer">{getDisplayUrl(value)}</a>
                        </li>
                      ))}
                    </ul>
                    {
                      wikidataCache.wikipediaPages.length > 5 &&
                      <button
                        type="button"
                        className={style.CacheSummaryToggle}
                        onClick={() => setShowAllWikipediaPages(!showAllWikipediaPages)}
                      >
                        {showAllWikipediaPages ? 'Show Less' : 'Show More'}
                      </button>
                    }
                  </li>
                }
                {
                  wikidataCache.properties.length > 0 &&
                  <li style={{paddingTop: '10px'}}>
                    Properties:
                    <ul className={style.CacheNestedList}>
                      {wikidataCache.properties.map(([key, value]) => (
                        <li key={key}>
                          {getPropertyLabel(key)}: {Array.isArray(value) ? value.join(', ') : value}
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
