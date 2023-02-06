import {Button, Card, Col, Row} from "antd";
import style from "./Forms.module.css";
import React, {useState} from "react";
import {useRouter} from "next/router";
import Collapse from "@kunukn/react-collapse";

export const SimpleFormFooter = ({form, type, loading, module}) => {
  const router = useRouter();
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <React.Fragment>
      <Card size={'small'} className={style.Footer}>
        <Row gutter={10} type="flex">
          <Col xs={4}>
            {
              type !== 'view' &&
              <Button
                loading={loading}
                type={'primary'}
                htmlType={'submit'}
              >
                Submit
              </Button>
            }
          </Col>
          <Col span={8} offset={12} className={style.RightButtons}>
            <Button onClick={() => router.push(`/${module}`)}>Close</Button>
            {
              type !== 'create' &&
              <Button
                className={style.InfoButton}
                onClick={() => setInfoOpen(!infoOpen)}
                type={'default'}
              >
                {infoOpen ? 'Hide Info' : 'Show Info'}
              </Button>
            }
          </Col>
        </Row>
      </Card>
      <Collapse isOpen={infoOpen}>
        <Card size={'small'} className={style.FooterInfo}>
          <Row gutter={10} type="flex">
            <Col>
              <p>
                <strong>Record created: </strong>
                {form.getFieldValue('date_created')}
                {form.getFieldValue('user_created') ? ` by '${form.getFieldValue('user_created')}'` : ''}
              </p>
              <p>
                <strong>Record updated: </strong>
                {form.getFieldValue('date_updated')}
                {form.getFieldValue('user_updated') ? ` by '${form.getFieldValue('user_updated')}'` : ''}
              </p>
            </Col>
          </Row>
        </Card>
      </Collapse>
    </React.Fragment>
  )
};
