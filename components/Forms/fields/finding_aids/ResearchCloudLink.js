import {Badge, Button} from "antd";

const ResearchCloudLink = ({path, buttonText='Open', isBadge=false}) => {
  const getLink = () => {
    const getParentPath = () => {
      if (path) {
        return path.slice(0, path.lastIndexOf("/"))
      } else {
        return ''
      }
    }

    const basePath = 'sites/osa-researchcloud/Shared Documents'
    const url = `https://ceuedu.sharepoint.com/${basePath}/Forms/AllItems.aspx?id=/${basePath}/${path}&parent=${basePath}/${getParentPath()}`

    return encodeURI(url)
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

export default ResearchCloudLink;