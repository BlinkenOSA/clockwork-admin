import React, {useState} from "react";
import {Radio, Card} from "antd";
import DigitizationContainerList from "./DigitizationContainerList";
import DigitizationFindingAidsList from "./DigitizationFindingAidsList";


const DigitazationLogView = () => {
  const [view, setView] = useState('container');

  const getTitle = () => {
    switch (view) {
      case 'container':
        return 'Digitized Containers';
      case 'finding_aids':
        return 'Digitized Finding Aids (Folders / Items)';
      default:
        break;
    }
  };

  const getView = () => {
    switch (view) {
      case 'container':
        return (<DigitizationContainerList />);
      case 'finding_aids':
        return (<DigitizationFindingAidsList/>);
      default:
        break;
    }
  };

  const onChange = (e) => {
    setView(e.target.value);
  };

  const viewChange = () => (
    <Radio.Group defaultValue="container" buttonStyle="solid" size={'small'} onChange={onChange}>
      <Radio.Button value="container">Containers</Radio.Button>
      <Radio.Button value="finding_aids">Finding Aids (Folders / Items)</Radio.Button>
    </Radio.Group>
  );

  return (
    <Card size="small" extra={viewChange()} title={getTitle()}>
      {getView()}
    </Card>
  )
};

export default DigitazationLogView;
