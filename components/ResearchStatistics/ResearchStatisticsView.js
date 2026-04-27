import {Card, Radio} from "antd";
import React, {useState} from "react";
import SearchPage from "../Dashboard/search/SearchPage";
import DashboardContentStats from "../Dashboard/DashboardContentStats";
import DashboardLogs from "../Dashboard/DashboardLogs";

const ResearchStatisticsView = () => {
	const [view, setView] = useState('search');

	const getTitle = () => {
		switch (view) {
			case 'researchers':
				return 'Researchers'
			case 'visits':
				return 'Visits';
			case 'requests':
				return 'Requests';
			default:
				break;
		}
	};

	const getView = () => {
		switch (view) {
			case 'researchers':
				return ''
			case 'visits':
				return '';
			case 'requests':
				return '';
			default:
				break;
		}
	};

	const onChange = (e) => {
		setView(e.target.value);
	};

	const viewChange = () => (
		<Radio.Group defaultValue="researchers" buttonStyle="solid" size={'small'} onChange={onChange}>
			<Radio.Button value="researchers">Researchers</Radio.Button>
			<Radio.Button value="visits">Visits</Radio.Button>
			<Radio.Button value="requests">Requests</Radio.Button>
		</Radio.Group>
	);

	return (
		<Card size="small" extra={viewChange()} title={getTitle()}>
			{getView()}
		</Card>
	)
}

export default ResearchStatisticsView;