import React, {useState} from "react";
import {Radio, Card} from "antd";
import DashboardContentStats from "./DashboardContentStats.js";
import DashboardLogs from "./DashboardLogs";
import dynamic from "next/dist/next-server/lib/dynamic";

const Activity = dynamic(
  () => import('./analyticsDisplays/Activity'),
  { ssr: false }
);

const Totals = dynamic(
  () => import('./analyticsDisplays/Totals'),
  { ssr: false }
);

const DashbboardView = () => {
    const [view, setView] = useState('stats');

    const getTitle = () => {
        switch (view) {
            case 'stats':
                return 'Statistics';
            case 'logs':
                return 'Activity Logs';
            case 'analytics-activity':
                return 'Analytics Activity (Last 3 years)';
            case 'analytics-totals':
                return 'Analytics Totals (Last 3 years)';
            default:
                break;
        }
    };

    const getView = () => {
        switch (view) {
            case 'stats':
                return (<DashboardContentStats />);
            case 'logs':
                return (<DashboardLogs/>);
            case 'analytics-activity':
                return (<Activity/>);
            case 'analytics-totals':
                return (<Totals/>);
            default:
                break;
        }
    };

    const onChange = (e) => {
        setView(e.target.value);
    };

    const viewChange = () => (
      <Radio.Group defaultValue="stats" buttonStyle="solid" size={'small'} onChange={onChange}>
        <Radio.Button value="stats">Statistics</Radio.Button>
        <Radio.Button value="logs">Logs</Radio.Button>
        <Radio.Button value="analytics-activity">Analytics (Activity)</Radio.Button>
        <Radio.Button value="analytics-totals">Analytics (Totals)</Radio.Button>
      </Radio.Group>
    );

    return (
      <Card size="small" extra={viewChange()} title={getTitle()}>
        {getView()}
      </Card>
    )
};

export default DashbboardView;
