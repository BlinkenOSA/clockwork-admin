import { DashboardOutlined, SwapOutlined, ApartmentOutlined, UserOutlined, ProfileOutlined, FileOutlined,
  UnorderedListOutlined, BankOutlined, FlagOutlined, DeploymentUnitOutlined, GlobalOutlined, TeamOutlined,
  EnvironmentOutlined, TagOutlined, TagsOutlined, RightCircleOutlined, DesktopOutlined, InboxOutlined
} from '@ant-design/icons';

const configMenu = [
  {name: 'Dashboard', icon: <DashboardOutlined/>, link: '/dashboard'},
  {name: 'Accession', icon: <SwapOutlined/>, module: 'acccession', submenu: [
      {name: 'Accession Records', link: '/accessions'},
      {name: 'Donors', link: '/donors'},
    ]},
  {name: 'Archival Unit', icon: <ApartmentOutlined/>, module: 'archival-unit', link: '/archival-units'},
  {name: 'ISAAR-CPF', icon: <UserOutlined/>, module: 'isaar', link: '/isaar'},
  {name: 'ISAD(G)', icon: <ProfileOutlined/>, module: 'isad', link: '/isad'},
  {name: 'Finding Aids', icon: <FileOutlined/>, module: 'finding-aids', submenu: [
      {name: 'Folders / Items', link: '/finding-aids'},
      {name: 'Organizer', link: '#'},
    ]},
  {name: 'Authority List', icon: <TagsOutlined/>, module: 'authority-list', submenu: [
      {name: 'Corporations', icon: <BankOutlined/>, link: '/authority-list/corporations'},
      {name: 'Countries', icon: <FlagOutlined/>, link: '/authority-list/countries'},
      {name: 'Genres', icon: <DeploymentUnitOutlined/>, link: '/authority-list/genres'},
      {name: 'Languages', icon: <GlobalOutlined/>, link: '/authority-list/languages'},
      {name: 'People', icon: <TeamOutlined/>, link: '/authority-list/people'},
      {name: 'Places', icon: <EnvironmentOutlined/>, link: '/authority-list/places'},
      {name: 'Subjects', icon: <TagOutlined/>, link: '/authority-list/subjects'},
    ]},
  {name: 'Controlled List', icon: <UnorderedListOutlined/>, module: 'controlled-list', submenu: [
      {name: 'Access Rights', icon: <RightCircleOutlined/>, link: '/controlled-list/access-rights'},
      {name: 'Archival Unit Themes', icon: <RightCircleOutlined/>, link: '/controlled-list/archival-unit-themes'},
      {name: 'Building', icon: <RightCircleOutlined/>, link: '/controlled-list/buildings'},
      {name: 'Carrier Types', icon: <RightCircleOutlined/>, link: '/controlled-list/carrier-types'},
      {name: 'Corporation Roles', icon: <RightCircleOutlined/>, link: '/controlled-list/corporation-roles'},
      {name: 'Date Types', icon: <RightCircleOutlined/>, link: '/controlled-list/date-types'},
      {name: 'Extent Units', icon: <RightCircleOutlined/>, link: '/controlled-list/extent-units'},
      {name: 'Geo Roles', icon: <RightCircleOutlined/>, link: '/controlled-list/geo-roles'},
      {name: 'Keyword', icon: <RightCircleOutlined/>, link: '/controlled-list/keywords'},
      {name: 'Language Usages', icon: <RightCircleOutlined/>, link: '/controlled-list/language-usages'},
      {name: 'Person Roles', icon: <RightCircleOutlined/>, link: '/controlled-list/person-roles'},
      {name: 'Primary Types', icon: <RightCircleOutlined/>, link: '/controlled-list/primary-types'},
      {name: 'Reproduction Rights', icon: <RightCircleOutlined/>, link: '/controlled-list/reproduction-rights'},
      {name: 'Restriction Reasons', icon: <RightCircleOutlined/>, link: '/controlled-list/restriction-reasons'},
    ]},
  {name: 'MLR', icon: <InboxOutlined/>, module: 'mlr', link: '/mlr'},
  {name: 'Digitization', icon: <DesktopOutlined/>, module: 'digitization', submenu: [
      {name: 'Digitization Log', link: '/digitization/digitization-log'},
      {name: 'Digitization Plan', link: '/digitization/digitization-plan'}
    ]},
];

export default configMenu;
