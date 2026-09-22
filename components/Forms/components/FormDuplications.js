import React, {useEffect, useState} from "react";
import {get, post, remove} from "../../../utils/api";
import style from "./FormDuplications.module.scss";
import {LoadingOutlined, SaveOutlined, MergeOutlined } from "@ant-design/icons";
import {Button, Modal, notification, Table, Tooltip} from "antd";
import {renderURL} from "../../../utils/renders/renderURL";
import {renderWikidataURL} from "../../../utils/renders/renderWikidataURL";
import {renderSimilarity} from "../../../utils/renders/renderSimilarity";
import {deleteAlert} from "../../Tables/functions/deleteAlert";


const FormDuplications = ({api, selectedRecord, afterMergeFinish}) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const onMergeClick = (record) => {
		const keep_id = selectedRecord;
		const merge_id = record.id;

		const { confirm } = Modal;

		confirm({
			title: 'Are you sure you would merge the Person record into this one?',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				merge(keep_id, merge_id)
			}
		});
	}

	const onKeepClick = (record) => {
		const keep_id = record.id;
		const merge_id = selectedRecord;

		const { confirm } = Modal;

		confirm({
			title: 'Are you sure you would merge (and after that, delete) this record with the selected one?',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				merge(keep_id, merge_id)
				afterMergeFinish()
			}
		});
	}

	const merge = (keep_id, merge_id) => {
		post(`/v1/authority_list/people/merge/`, {
			keep_id: keep_id,
			merge_id: merge_id}
		).then(response => {
			getDuplicationData()
			notification.success({
				duration: 3,
				message: 'Success!',
				description: `Person records were merged, subject and contributor references were updated!`,
			});
		})
	}

	const renderActionButtons = (record) => {
		return (
			<Button.Group>
				<Tooltip key={'Merge'} title={'Merge'}>
					<Button size="small" icon={<MergeOutlined />} onClick={() => onMergeClick(record)}/>
				</Tooltip>
				<Tooltip key={'Keep This'} title={'Keep This'}>
					<Button size="small" icon={<SaveOutlined />} onClick={() => onKeepClick(record)}/>
				</Tooltip>
			</Button.Group>
		)
	};

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			sorter: false,
		}, {
			title: 'Similarity',
			width: 150,
			dataIndex: 'similarity_percent',
			key: 'similarity_percent',
			sorter: false,
			render: renderSimilarity
		}, {
			title: 'Authority URL',
			dataIndex: 'authority_url',
			key: 'authority_url',
			sorter: false,
			render: renderURL
		}, {
			title: 'Wikidata',
			dataIndex: 'wikidata_id',
			key: 'wikidata_id',
			sorter: false,
			render: renderWikidataURL
		}, {
			key: 'actions',
			title: 'Actions',
			width: 150,
			className: style.ActionColumn,
			render: (record) => renderActionButtons(record)
		},
	];

	const getDuplicationData = () => {
		get(api).then(response => {
			setLoading(false);
			setData(response.data)
		}).catch(error => {
			setData(undefined);
			setLoading(false);
		})
	}

	useEffect(() => {
		getDuplicationData()
	}, [])

	return (
		<Table
			bordered={true}
			className={style.Table}
			rowKey={record => record.id}
			dataSource={data ? data : []}
			columns={columns}
			size={'small'}
			loading={{
				spinning: loading,
				indicator: <LoadingOutlined/>,
			}}
		/>
	)
}

export default FormDuplications;