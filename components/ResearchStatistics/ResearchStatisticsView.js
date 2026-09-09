import {Card, Radio} from "antd";
import React, {useState} from "react";
import { DatePicker, Space } from 'antd';
import style from "./ResearchStatisticsView.module.scss";
import dynamic from "next/dynamic";

const { RangePicker } = DatePicker;

const ResearchersStatistics = dynamic(
	() => import('./parts/ResearchersStatistics'),
	{ ssr: false }
);

const ResearchersVisits = dynamic(
	() => import('./parts/ResearchersVisits'),
	{ ssr: false }
);

const ResearchersRequests = dynamic(
	() => import('./parts/ResearchersRequests'),
	{ ssr: false }
);

const PopularCollections = dynamic(
	() => import('./parts/PopularCollections'),
	{ ssr: false }
);

const ResearchStatisticsView = () => {
	const [view, setView] = useState('researchers');
	const [dateFilter, setDateFilter] = useState({start: null, end: null});

	const handleDateFilterChange = (date, dateString) => {
		setDateFilter({ start: dateString[0], end: dateString[1] });
	}

	const getTitle = () => {
		const getMainTitle = () => {
			switch (view) {
				case 'researchers':
					return 'Researchers'
				case 'visits':
					return 'Visits';
				case 'requests':
					return 'Requests';
				case 'popularity':
					return 'Popular collections';
				default:
					break;
			}
		}

		return (
			<div className={style.TitleText}>
				<span className={style.MainTitleText}>{getMainTitle()}</span>
				<RangePicker onChange={handleDateFilterChange} />
			</div>
		)
	};

	const getParams = () => {
		return {
			date_from: dateFilter.start,
			date_to: dateFilter.end
		}
	}

	const getView = () => {
		switch (view) {
			case 'researchers':
				return <ResearchersStatistics params={getParams()} />;
			case 'visits':
				return <ResearchersVisits params={getParams()} />;
			case 'requests':
				return <ResearchersRequests params={getParams()} />;
			case 'popularity':
				return <PopularCollections params={getParams()} />;
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
			<Radio.Button value="popularity">Popular collections</Radio.Button>
		</Radio.Group>
	);

	return (
		<Card size="small" extra={viewChange()} title={getTitle()}>
			{getView()}
		</Card>
	)
}

export default ResearchStatisticsView;