import {Button, Col, Row} from "antd";

const FindingAidsHideColumns = ({columns}) => {
  const renderButtons = () => (
    columns.map(col => (
        <Button style={{marginRight: '10px'}} type={'primary'}>{col['label']}</Button>
    )))

  return (
    <Row gutter={[10]}>
      <Col xs={24} style={{marginBottom: '12px'}}>
        {renderButtons()}
      </Col>
    </Row>
  )
}

export default FindingAidsHideColumns;