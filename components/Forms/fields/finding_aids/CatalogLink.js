import {Badge, Button} from "antd";

const CatalogLink = ({catalogID, buttonText='Open', isBadge=false}) => {
	const getLink = () => {
		return encodeURI(`https://catalog.archivum.org/catalog/${catalogID}`);
	}

	if (isBadge) {
		return (
			<a href={getLink()} target={'_blank'}>
				<Badge count={buttonText} size={'small'} style={{ backgroundColor: '#376e18', borderRadius: '3px', fontSize: '0.8em' }} />
			</a>
		)
	} else {
		return (
			<a href={getLink()} target={'_blank'}>
				<Button size={'small'}>{buttonText}</Button>
			</a>
		)
	}

}

export default CatalogLink;