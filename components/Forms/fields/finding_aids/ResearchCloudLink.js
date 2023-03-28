import {Button} from "antd";

const ResearchCloudLink = ({referenceCode, identifier}) => {
  const url = 'https://ceuedu.sharepoint.com/sites/osa-researchcloud/Shared Documents/Forms/AllItems.aspx?' +
    'id=/sites/osa-researchcloud/Shared Documents/'

  console.log(referenceCode)

  return (
    <a href={encodeURI(url)} target={'_blank'}>
      <Button style={{marginTop: '22px'}}>Open in Research Cloud</Button>
    </a>
  )
}

export default ResearchCloudLink;