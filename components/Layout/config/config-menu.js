import { DashboardOutlined, ApartmentOutlined, UserOutlined, ProfileOutlined, FileOutlined,
  UnorderedListOutlined, BankOutlined, FlagOutlined, DeploymentUnitOutlined, GlobalOutlined, TeamOutlined,
  EnvironmentOutlined, TagOutlined, TagsOutlined, RightCircleOutlined, IdcardOutlined
} from '@ant-design/icons';
import { IoSchoolOutline } from "react-icons/io5"
import { MdOutlineScanner } from "react-icons/md"
import { BsInboxes, BsBoxArrowInLeft } from "react-icons/bs"
import { FaExchangeAlt } from "react-icons/fa"
import { HiOutlineLibrary } from "react-icons/hi"
import { BiPieChartAlt2 } from "react-icons/bi"
import { ImCopy } from "react-icons/im"
import React from "react";

const configMenu = [
  {name: 'Dashboard', icon: <DashboardOutlined/>, link: '/dashboard', group: ['__ALL__']},
  {name: 'Accession', icon: <BsBoxArrowInLeft/>, module: 'acccession', group: ['Accessions'], submenu: [
      {name: 'Accession Records', group: ['Accessions'], link: '/accessions'},
      {name: 'Donors', group: ['Accessions'], link: '/donors'},
    ]},
  {name: 'Archival Unit', icon: <ApartmentOutlined/>, module: 'archival-unit', group: ['Archival Units'], link: '/archival-units'},
  {name: 'ISAAR-CPF', icon: <UserOutlined/>, module: 'isaar', group: ['ISAAR'], link: '/isaar'},
  {name: 'ISAD(G)', icon: <ProfileOutlined/>, module: 'isad', group: ['ISAD(G)'], link: '/isad'},
  {name: 'Finding Aids', icon: <FileOutlined/>, module: 'finding-aids', group: ['Finding Aids'], submenu: [
      {name: 'Folders / Items', group: ['Finding Aids'], link: '/finding-aids'},
    ]},
  {name: 'Lists', icon: <ImCopy/>, module: 'list', group: ['Authority Lists', 'Controlled Lists'], submenu: [
    {name: 'Authority List', icon: <TagsOutlined/>, module: '/list/authority-list', group: ['Authority Lists'], submenu: [
      {name: 'Corporations', icon: <BankOutlined/>, group: ['Authority Lists'], link: '/authority-list/corporations'},
      {name: 'Countries', icon: <FlagOutlined/>, group: ['Authority Lists'], link: '/authority-list/countries'},
      {name: 'Genres', icon: <DeploymentUnitOutlined/>, group: ['Authority Lists'], link: '/authority-list/genres'},
      {name: 'Languages', icon: <GlobalOutlined/>, group: ['Authority Lists'], link: '/authority-list/languages'},
      {name: 'People', icon: <TeamOutlined/>, group: ['Authority Lists'], link: '/authority-list/people'},
      {name: 'Places', icon: <EnvironmentOutlined/>, group: ['Authority Lists'], link: '/authority-list/places'},
      {name: 'Subjects', icon: <TagOutlined/>, group: ['Authority Lists'], link: '/authority-list/subjects'},
    ]},
    {name: 'Controlled List', icon: <UnorderedListOutlined/>, module: '/list/controlled-list', group: ['Controlled Lists'], submenu: [
      {name: 'Access Rights', icon: <RightCircleOutlined/>, group: ['Controlled Lists'], link: '/controlled-list/access-rights'},
      {name: 'Archival Unit Themes', icon: <RightCircleOutlined/>, group: ['Controlled Lists'], link: '/controlled-list/archival-unit-themes'},
      {name: 'Building', icon: <RightCircleOutlined/>, group: ['Controlled Lists'], link: '/controlled-list/buildings'},
      {name: 'Carrier Types', icon: <RightCircleOutlined/>, group: ['Controlled Lists'], link: '/controlled-list/carrier-types'},
      {name: 'Corporation Roles', icon: <RightCircleOutlined/>, group: ['Controlled Lists'], link: '/controlled-list/corporation-roles'},
      {name: 'Date Types', icon: <RightCircleOutlined/>, group: ['Controlled Lists'], link: '/controlled-list/date-types'},
      {name: 'Extent Units', icon: <RightCircleOutlined/>, group: ['Controlled Lists'], link: '/controlled-list/extent-units'},
      {name: 'Geo Roles', icon: <RightCircleOutlined/>, group: ['Controlled Lists'], link: '/controlled-list/geo-roles'},
      {name: 'Keyword', icon: <RightCircleOutlined/>, group: ['Controlled Lists'], link: '/controlled-list/keywords'},
      {name: 'Language Usages', icon: <RightCircleOutlined/>, group: ['Controlled Lists'], link: '/controlled-list/language-usages'},
      {name: 'Person Roles', icon: <RightCircleOutlined/>, group: ['Controlled Lists'], link: '/controlled-list/person-roles'},
      {name: 'Primary Types', icon: <RightCircleOutlined/>, group: ['Controlled Lists'], link: '/controlled-list/primary-types'},
      {name: 'Reproduction Rights', icon: <RightCircleOutlined/>, group: ['Controlled Lists'], link: '/controlled-list/reproduction-rights'},
      {name: 'Restriction Reasons', icon: <RightCircleOutlined/>, group: ['Controlled Lists'], link: '/controlled-list/restriction-reasons'},
    ]},
  ]},
  {name: 'MLR', icon: <BsInboxes/>, module: 'mlr', group: ['MLR'], link: '/mlr'},
  {name: 'Digitization Log', icon: <MdOutlineScanner/>, module: 'digitization', group: ['__ALL__'], link: '/digitization'},
  {name: 'Researchers Database', icon: <IoSchoolOutline/>, module: 'researcher', group: ['Research'], submenu: [
      {name: 'Researchers', icon: <IdcardOutlined />, group: ['Research'], link: '/researchers-db/researchers'},
      {name: 'Researcher Visits', icon: <HiOutlineLibrary />, group: ['Research'], link: '/researchers-db/visits'},
      {name: 'Researcher Statistics', icon: <BiPieChartAlt2 />, group: ['Research'], link: '/researchers-db/stats'},
      {name: 'Requests', icon: <FaExchangeAlt />, group: ['Research'], link: '/researchers-db/requests'},
    ]}
];

export default configMenu;
