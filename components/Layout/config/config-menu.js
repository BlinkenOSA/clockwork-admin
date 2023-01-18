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
import { CgLoadbarAlt } from "react-icons/cg"
import { ImCopy } from "react-icons/im"
import React from "react";

const configMenu = [
  {name: 'Dashboard', icon: <DashboardOutlined/>, link: '/dashboard'},
  {name: 'Accession', icon: <BsBoxArrowInLeft/>, module: 'acccession', submenu: [
      {name: 'Accession Records', link: '/accessions'},
      {name: 'Donors', link: '/donors'},
    ]},
  {name: 'Archival Unit', icon: <ApartmentOutlined/>, module: 'archival-unit', link: '/archival-units'},
  {name: 'ISAAR-CPF', icon: <UserOutlined/>, module: 'isaar', link: '/isaar'},
  {name: 'ISAD(G)', icon: <ProfileOutlined/>, module: 'isad', link: '/isad'},
  {name: 'Finding Aids', icon: <FileOutlined/>, module: 'finding-aids', submenu: [
      {name: 'Folders / Items', link: '/finding-aids'},
      {name: 'Organizer', link: '/finding-aids/organizer'},
    ]},
  {name: 'Lists', icon: <ImCopy/>, module: 'list', submenu: [
    {name: 'Authority List', icon: <TagsOutlined/>, module: '/list/authority-list', submenu: [
      {name: 'Corporations', icon: <BankOutlined/>, link: '/authority-list/corporations'},
      {name: 'Countries', icon: <FlagOutlined/>, link: '/authority-list/countries'},
      {name: 'Genres', icon: <DeploymentUnitOutlined/>, link: '/authority-list/genres'},
      {name: 'Languages', icon: <GlobalOutlined/>, link: '/authority-list/languages'},
      {name: 'People', icon: <TeamOutlined/>, link: '/authority-list/people'},
      {name: 'Places', icon: <EnvironmentOutlined/>, link: '/authority-list/places'},
      {name: 'Subjects', icon: <TagOutlined/>, link: '/authority-list/subjects'},
    ]},
    {name: 'Controlled List', icon: <UnorderedListOutlined/>, module: '/list/controlled-list', submenu: [
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
  ]},
  {name: 'MLR', icon: <BsInboxes/>, module: 'mlr', link: '/mlr'},
  {name: 'Digitization Log', icon: <MdOutlineScanner/>, module: 'digitization', link: '/digitization'},
  {name: 'Researchers Database', icon: <IoSchoolOutline/>, module: 'researcher', submenu: [
      {name: 'Researchers', icon: <IdcardOutlined />, link: '/researchers-db/researchers'},
      {name: 'Researcher Visits', icon: <HiOutlineLibrary />, link: '/researchers-db/visits'},
      {name: 'Researcher Statistics', icon: <BiPieChartAlt2 />, link: '/researchers-db/stats'},
      {name: 'Requests', icon: <FaExchangeAlt />, link: '/researchers-db/requests'},
      {name: 'Request Progress', icon: <CgLoadbarAlt />, link: '/researchers-db/requests'},
    ]}
];

export default configMenu;
