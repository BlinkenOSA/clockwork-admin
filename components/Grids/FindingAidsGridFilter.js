import {Button, Col, Form, Input, Popconfirm, Row} from "antd";
import React, {useEffect, useState} from "react";
import style from './FindingAidsGrid.module.css';

const FindingAidsGridFilter = ({onFilter, onReplace}) => {
  const [form] = Form.useForm();

  const [findDisabled, setFindDisabled] = useState(true);
  const [replaceDisabled, setReplaceDisabled] = useState(true);

  const onFilterClick = () => {
    const findValue = form.getFieldValue('find');
    onFilter(findValue);
  };

  const onReplaceClick = () => {
    const findValue = form.getFieldValue('find');
    const replaceValue = form.getFieldValue('replace');
    onReplace(findValue, replaceValue);
  };

  const onValuesChange = (changedValues, allValues) => {
    setFindDisabled(allValues['find'] === "");
    setReplaceDisabled(allValues['find'] === "" || allValues['replace'] === "");
  };

  return (
    <Form form={form} name="findAndReplace" onValuesChange={onValuesChange}>
      <Row gutter={[10]}>
        <Col xs={6} style={{textAlign: 'left'}}>
          <Form.Item name="find" className={style.FormItem}>
            <Input placeholder={'Find...'} allowClear={true} />
          </Form.Item>
        </Col>
        <Col xs={2} style={{textAlign: 'left'}}>
          <Button key="find" style={{width: '100%'}} onClick={() => onFilterClick()} disabled={findDisabled}>
            Find
          </Button>
        </Col>
        <Col xs={6} style={{textAlign: 'left'}}>
          <Form.Item name="replace" className={style.FormItem}>
            <Input placeholder={'Replace...'} allowClear={true}/>
          </Form.Item>
        </Col>
        <Col xs={2} style={{textAlign: 'left'}}>
          <Popconfirm
            title="Are you sure you would like to find and replace all the occurrences?"
            onConfirm={() => onReplaceClick(true)}
            okText="Yes"
            cancelText="No"
          >
            <Button key="replace" style={{width: '100%'}} disabled={replaceDisabled}>
              Replace
            </Button>
          </Popconfirm>
        </Col>
      </Row>
    </Form>
  )
};

export default FindingAidsGridFilter;
