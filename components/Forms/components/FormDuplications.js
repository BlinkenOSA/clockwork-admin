import React, {useEffect, useState} from "react";
import {get} from "../../../utils/api";
import style from "./FormDuplications.module.scss";
import {LoadingOutlined} from "@ant-design/icons";
import {Table} from "antd";
import {renderURL} from "../../../utils/renders/renderURL";
import {renderWikidataURL} from "../../../utils/renders/renderWikidataURL";
import {renderSimilarity} from "../../../utils/renders/renderSimilarity";


const FormDuplications = ({api}) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

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
			title: 'Wikidata',
			dataIndex: 'wikidata_id',
			key: 'wikidata_id',
			sorter: false,
			render: renderWikidataURL
		},
	];

	useEffect(() => {
		get(api).then(response => {
			setLoading(false);
			setData(response.data)
		}).catch(error => {
			setData(undefined);
			setLoading(false);
		})
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