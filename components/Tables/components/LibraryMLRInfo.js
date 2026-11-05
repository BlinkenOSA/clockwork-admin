import {useData} from "../../../utils/hooks/useData";

const LibraryMLRInfo = ({kohaID}) => {
	const { data, loading } = useData(kohaID ? `/v1/research/requests/library/mlr/${kohaID}` : undefined);

	return (
		data ? <div style={{fontSize: '12px'}}>{data}</div> : ''
	)
}

export default LibraryMLRInfo;