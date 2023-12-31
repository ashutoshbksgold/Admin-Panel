// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
  stop: getIcon('icons8-stop'),
  search: getIcon('search-sort'),
  contacts: getIcon('contacts'),
  projects: getIcon('web-page-icon'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [{ title: 'Dashboard', path: PATH_DASHBOARD.root, icon: ICONS.dashboard }],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      { title: 'User Management', path: PATH_DASHBOARD.userManagement, icon: ICONS.user },

      // {
      //   title: 'Industries',
      //   path: PATH_DASHBOARD.industries.root,
      //   icon: ICONS.calendar,
      //   children: [
      //     { title: 'list', path: PATH_DASHBOARD.industries.list },
      //     { title: 'create', path: PATH_DASHBOARD.industries.create },
      //   ],
      // },
    ],
  },

  // Main contents ends here

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      { title: 'Reports', path: PATH_DASHBOARD.reports, icon: ICONS.invoice },
      {
        title: 'Settings',
        path: PATH_DASHBOARD.settings,
        icon: ICONS.chat,
      },
    ],
  },
];

export default navConfig;
