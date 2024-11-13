import KeyboardCommandKeyOutlinedIcon from '@mui/icons-material/KeyboardCommandKeyOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import ThreePOutlinedIcon from '@mui/icons-material/ThreePOutlined';
import NoAccountsOutlinedIcon from '@mui/icons-material/NoAccountsOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AdUnitsOutlinedIcon from '@mui/icons-material/AdUnitsOutlined';
import ArtTrackOutlinedIcon from '@mui/icons-material/ArtTrackOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';

import AddModeratorIcon from '@mui/icons-material/AddModerator';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import AttractionsOutlinedIcon from '@mui/icons-material/AttractionsOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import ContactEmergencyOutlinedIcon from '@mui/icons-material/ContactEmergencyOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import ChecklistRtlOutlinedIcon from '@mui/icons-material/ChecklistRtlOutlined';


export const adminPortalData = [
  {
    type: 2,
    icon: KeyboardCommandKeyOutlinedIcon,
    title: "Categories Management",
    value: "CM",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "Manage Divisions, Ranks etc.",
    },
    // custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Portal/Categories',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: SupervisedUserCircleOutlinedIcon,
    title: "User Account Management",
    value: "UAM",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "Manage User Accounts, etc.",
    },
    // custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Portal/Users',
    customTop: 15,
    customLeft: 38,
  },
  // {
  //   icon: RecentActorsOutlinedIcon,
  //   title: "Payroll Variables (Monthly)",
  //   value: "PVM",
  //   footer: {
  //     color: "text-green-500",
  //     value: "<",
  //     label: "Tax, Pagibig, ",
  //   },
  //   // custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
  //   // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
  //   custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
  //   link: '/home/Dashboards/Admin-Portal/Payroll-Variables-Monthly',
  //   customTop: 15,
  //   customLeft: 38,
  // },
  // {
  //   icon: ThreePOutlinedIcon,
  //   title: "Payroll End Of Year",
  //   value: "EOY",
  //   footer: {
  //     color: "text-green-500",
  //     value: "<",
  //     label: "13th Month, Bonus, Tax, etc.",
  //   },
  //   // custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
  //   // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
  //   custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
  //   link: '/home/Dashboards/Admin-Portal/Payroll-EOY',
  //   customTop: 15,
  //   customLeft: 38,
  // },
  {
    icon: NoAccountsOutlinedIcon,
    title: "Assets & Announcements",
    value: "AA",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "Announcements, and Assets Mgt., etc.",
    },
    // custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Portal/Assets-And-Announcement',
    customTop: 15,
    customLeft: 38,
  },
  // {
  //   icon: AssessmentOutlinedIcon,
  //   title: "Employee & Applicant Variables",
  //   value: "EAV",
  //   footer: {
  //     color: "text-green-500",
  //     value: "<",
  //     label: "KPI, Onboarding, Offboarding etc.",
  //   },
  //   // custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
  //   // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
  //   custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
  //   link: '/home/Dashboards/Admin-Portal/Employee-And-Applicants',
  //   customTop: 15,
  //   customLeft: 38,
  // },
];

export const categoriesManagementData = [
  {
    // color: "red",
    type: 2,
    icon: AccountTreeOutlinedIcon,
    title: "Manage Branch List",
    value: "Branch",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "View Branch List, Details etc.",
    },
    custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    // custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Portal/Categories/Branch',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: AdUnitsOutlinedIcon,
    title: "Manage Department List",
    value: "Department",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Dept. List, Details etc.",
    },
    custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    // custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Portal/Categories/Department',
    customTop: 15,
    customLeft: 38,
  },
  // {
  //   icon: ArtTrackOutlinedIcon,
  //   title: "Manage Division List",
  //   value: "Division",
  //   footer: {
  //     color: "text-green-500",
  //     value: "<",
  //     label: "View Division List, Details etc.",
  //   },
  //   custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
  //   // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
  //   // custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
  //   link: '/home/Dashboards/Admin-Portal/Categories/Division',
  //   customTop: 15,
  //   customLeft: 38,
  // },
  {
    icon: CurrencyExchangeOutlinedIcon,
    title: "Manage Payrollgroup List",
    value: "Payrollgroup",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Payrollgroup List, Details etc.",
    },
    custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    // custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Portal/Categories/Payrollgroup',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: Diversity3OutlinedIcon,
    title: "Manage Position List",
    value: "Position",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Position List, Details etc.",
    },
    custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    // custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Portal/Categories/Position',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: Diversity2OutlinedIcon,
    title: "Manage Rank List",
    value: "Rank",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Rank List, Details etc.",
    },
    custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    // custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Portal/Categories/Rank',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: BusinessOutlinedIcon,
    title: "Employment Status Type List",
    value: "Employment Status Type",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Employment Status Type, details etc.",
    },
    // custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // link: 'development',
    link: '/home/Dashboards/Admin-Portal/Categories/Employment-Status-Type',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: Diversity2OutlinedIcon,
    title: "Violation Type List",
    value: "Violation Type",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Violation Types, Description etc.",
    },
    custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    // custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Portal/Categories/Violation-Type',
    customTop: 15,
    customLeft: 38,
  },
];




export const payrollVariablesMonthlyData = [
  // {
  //   // color: "red",
  //   type: 2,
  //   icon: AddModeratorIcon,
  //   title: "Employee Tax Entries",
  //   value: "TAX",
  //   footer: {
  //   color: "text-green-500",
  //   value: "<",
  //   label: "View List of Tax IDs, details etc.",
  //   },
  //   custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
  //   link: '/home/Dashboards/Admin-Portal/Payroll-Variables-Monthly/Tax',
  //   customTop: 15,
  //   customLeft: 38,
  // },
  // {
  //   icon: AssuredWorkloadOutlinedIcon,
  //   title: "Employee PAGIBIG Entries",
  //   value: "PHDMF",
  //   footer: {
  //     color: "text-green-500",
  //     value: "<",
  //     label: "View PHDMF IDs, details etc.",
  //   },
  //   custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
  //   link: '/home/Dashboards/Admin-Portal/Payroll-Variables-Monthly/Pagibig',
  //   customTop: 15,
  //   customLeft: 38,
  // },
  // {
  //   icon: AttractionsOutlinedIcon,
  //   title: "Employee SSS Entries",
  //   value: "SSS",
  //   footer: {
  //     color: "text-green-500",
  //     value: "<",
  //     label: "View Social Security IDs, details etc.",
  //   },
  //   custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
  //   link: '/home/Dashboards/Admin-Portal/Payroll-Variables-Monthly/SSS',
  //   customTop: 15,
  //   customLeft: 38,
  // },
  // {
  //   icon: BusinessOutlinedIcon,
  //   title: "Employee Philhealth Entries",
  //   value: "PHILHEALTH",
  //   footer: {
  //     color: "text-green-500",
  //     value: "<",
  //     label: "View Philhealth IDs, details etc.",
  //   },
  //   custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
  //   // link: 'development',
  //   link: '/home/Dashboards/Admin-Portal/Payroll-Variables-Monthly/Philhealth',
  //   customTop: 15,
  //   customLeft: 38,
  // },
  // {
  //   icon: ContactEmergencyOutlinedIcon,
  //   title: "Employee Cash Advance List",
  //   value: "CA",
  //   footer: {
  //     color: "text-green-500",
  //     value: "<",
  //     label: "View Cash Advance List, details etc.",
  //   },
  //   custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
  //   // link: 'development',
  //   link: '/home/Dashboards/Admin-Portal/Payroll-Variables-Monthly/Cash-Advance',
  //   customTop: 15,
  //   customLeft: 38,
  // },
  // {
  //   icon: ContentPasteSearchOutlinedIcon,
  //   title: "Allowance Types",
  //   value: "AT",
  //   footer: {
  //     color: "text-green-500",
  //     value: "<",
  //     label: "View Allowance Types, Details etc.",
  //   },
  //   custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
  //   // link: 'development',
  //   link: '/home/Dashboards/Admin-Portal/Payroll-Variables-Monthly/Allowance-Type',
  //   customTop: 15,
  //   customLeft: 38,
  // },
  // {
  //   icon: ContactPageOutlinedIcon,
  //   title: "Employee Allowance Entries",
  //   value: "AE",
  //   footer: {
  //     color: "text-green-500",
  //     value: "<",
  //     label: "View Allowance Entries, Details etc.",
  //   },
  //   custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
  //   // link: 'development',
  //   link: '/home/Dashboards/Admin-Portal/Payroll-Variables-Monthly/Allowance-Entry',
  //   customTop: 15,
  //   customLeft: 38,
  // },
  
];



export const payrollEOYData = [
  {
    // color: "red",
    type: 2,
    icon: AddModeratorIcon,
    title: "Tax Collected",
    value: "TC",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "View List of Tax Collected, details etc.",
    },
    custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    link: '/home/Dashboards/Admin-Portal/Payroll-EOY/Tax-Collected',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: AssuredWorkloadOutlinedIcon,
    title: "13th Month Pay",
    value: "P13",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Employee 13th Month Pay, details etc.",
    },
    custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    link: '/home/Dashboards/Admin-Portal/Payroll-EOY/13th-Month-Pay',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: AttractionsOutlinedIcon,
    title: "Bonus Types List",
    value: "BTL",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Bonus Types List, details etc.",
    },
    custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    link: '/home/Dashboards/Admin-Portal/Payroll-EOY/Bonus-List',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: BusinessOutlinedIcon,
    title: "Bonus Entries",
    value: "BE",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Bonus Amount Entries, details etc.",
    },
    custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    // link: 'development',
    link: '/home/Dashboards/Admin-Portal/Payroll-EOY/Bonus-Entries',
    customTop: 15,
    customLeft: 38,
  },
];

import AgricultureIcon from '@mui/icons-material/Agriculture';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';

export const AssetAndAnnouncementData = [
  // {
  //   // color: "red",
  //   type: 2,
  //   icon: AgricultureIcon,
  //   title: "Asset List (Type)",
  //   value: "AL",
  //   footer: {
  //   color: "text-green-500",
  //   value: "<",
  //   label: "View List of Asset Types, details etc.",
  //   },
  //   custom: "linear-gradient(22deg, rgba(9,9,121,1) 15%, rgba(70,191,4,1) 47%, rgba(2,0,36,1) 100%, rgba(0,212,255,1) 100%)",
  //   link: '/home/Dashboards/Admin-Portal/Assets-And-Announcement/Asset-List',
  //   customTop: 15,
  //   customLeft: 38,
  // },
  // {
  //   // color: "red",
  //   type: 2,
  //   icon: AddShoppingCartOutlinedIcon,
  //   title: "Asset Account",
  //   value: "AC",
  //   footer: {
  //   color: "text-green-500",
  //   value: "<",
  //   label: "View List Asset Accounts, details etc.",
  //   },
  //   custom: "linear-gradient(22deg, rgba(9,9,121,1) 15%, rgba(70,191,4,1) 47%, rgba(2,0,36,1) 100%, rgba(0,212,255,1) 100%)",
  //   link: '/home/Dashboards/Admin-Portal/Assets-And-Announcement/Asset-Account',
  //   customTop: 15,
  //   customLeft: 38,
  // },
  {
    icon: CoPresentOutlinedIcon,
    title: "Announcement Configurations",
    value: "AC",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Announcement lists, details etc.",
    },
    custom: "linear-gradient(22deg, rgba(9,9,121,1) 15%, rgba(70,191,4,1) 47%, rgba(2,0,36,1) 100%, rgba(0,212,255,1) 100%)",
    // custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    link: '/home/Dashboards/Admin-Portal/Assets-And-Announcement/Announcement-Configurations',
    customTop: 15,
    customLeft: 38,
  },
];


import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import PlaylistAddCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCircleOutlined';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';


export const EmployeeAndApplicantsData = [
  {
    // color: "red",
    type: 2,
    icon: LibraryAddCheckOutlinedIcon,
    title: "KPI Evaluation",
    value: "KPI",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "Initialize KPI Documents for all/selected #.",
    },
    custom: "linear-gradient(22deg, rgba(9,9,121,1) 15%, rgba(191,4,14,1) 47%, rgba(2,0,36,1) 100%, rgba(0,212,255,1) 100%)",
    link: '/home/Dashboards/Admin-Portal/Employee-And-Applicants/KPI-Evaluation',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: PlaylistAddCircleOutlinedIcon,
    title: "Initialize Onboarding",
    value: "I-ONB",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "Start Onboarding Req., details etc.",
    },
    custom: "linear-gradient(22deg, rgba(9,9,121,1) 15%, rgba(191,4,14,1) 47%, rgba(2,0,36,1) 100%, rgba(0,212,255,1) 100%)",
    link: '/home/Dashboards/Admin-Portal/Employee-And-Applicants/Initialize-Onboarding',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: RemoveShoppingCartOutlinedIcon,
    title: "Initialize Offboarding",
    value: "I-OFFB",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "Start Offboarding Req., details etc.",
    },
    custom: "linear-gradient(22deg, rgba(9,9,121,1) 15%, rgba(191,4,14,1) 47%, rgba(2,0,36,1) 100%, rgba(0,212,255,1) 100%)",
    // custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    link: '/home/Dashboards/Admin-Portal/Employee-And-Applicants/Initialize-Offboarding',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: ReceiptLongOutlinedIcon,
    title: "KPI Questions",
    value: "KQS",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "List of KPI Questions, etc.",
    },
    custom: "linear-gradient(22deg, rgba(9,9,121,1) 15%, rgba(191,4,14,1) 47%, rgba(2,0,36,1) 100%, rgba(0,212,255,1) 100%)",
    link: '/home/Dashboards/Admin-Portal/Employee-And-Applicants/KPI-Questions',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: VerifiedOutlinedIcon,
    title: "Core Competencies",
    value: "CCS",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "List of Core Competencies, etc.",
    },
    custom: "linear-gradient(22deg, rgba(9,9,121,1) 15%, rgba(191,4,14,1) 47%, rgba(2,0,36,1) 100%, rgba(0,212,255,1) 100%)",
    link: '/home/Dashboards/Admin-Portal/Employee-And-Applicants/Core-Competencies',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: PlaylistAddCircleOutlinedIcon,
    title: "Onboarding Requirements",
    value: "R-ONB",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "List of Onboarding Req., details etc.",
    },
    custom: "linear-gradient(22deg, rgba(9,9,121,1) 15%, rgba(191,4,14,1) 47%, rgba(2,0,36,1) 100%, rgba(0,212,255,1) 100%)",
    link: '/home/Dashboards/Admin-Portal/Employee-And-Applicants/Onboarding-Requirements',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: RemoveShoppingCartOutlinedIcon,
    title: "Offboarding Requirements",
    value: "R-OFFB",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "List of Offboarding Req., details etc.",
    },
    custom: "linear-gradient(22deg, rgba(9,9,121,1) 15%, rgba(191,4,14,1) 47%, rgba(2,0,36,1) 100%, rgba(0,212,255,1) 100%)",
    // custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    link: '/home/Dashboards/Admin-Portal/Employee-And-Applicants/Offboarding-Requirements',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: FactCheckOutlinedIcon,
    title: "Applicants List",
    value: "APL",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "List of Applicants, Status Req., details etc.",
    },
    custom: "linear-gradient(22deg, rgba(9,9,121,1) 15%, rgba(191,4,14,1) 47%, rgba(2,0,36,1) 100%, rgba(0,212,255,1) 100%)",
    // custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    link: '/home/Dashboards/Admin-Portal/Employee-And-Applicants/Applicants',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: ChecklistRtlOutlinedIcon,
    title: "Job Postings",
    value: "JOBPT",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "List of Jobs Req., details etc.",
    },
    custom: "linear-gradient(22deg, rgba(9,9,121,1) 15%, rgba(191,4,14,1) 47%, rgba(2,0,36,1) 100%, rgba(0,212,255,1) 100%)",
    // custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    link: '/home/Dashboards/Admin-Portal/Employee-And-Applicants/Job-Posting',
    customTop: 15,
    customLeft: 38,
  },
];
  // export default {adminPortalData};
