import {Button} from "antd";

const ResearchCloudLink = ({path, buttonText='Open'}) => {
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

  return (
    <a href={getLink()} target={'_blank'}>
      <Button style={{marginTop: '24px', width: '100%'}}>{buttonText}</Button>
    </a>
  )
}

export default ResearchCloudLink;