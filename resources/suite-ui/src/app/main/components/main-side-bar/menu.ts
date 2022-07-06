export interface SidenavMenuItem {
  activeClassName: string;
  url?: string;
  textTranslationKey: string;
  icon: string;
  hasChildren?: boolean;
  expanded?: boolean;
  children?: SidenavMenuItem[];
  hidden?: boolean;
  permissions?: string[];
}

export const APP_MENU: SidenavMenuItem[] = [
  {
    activeClassName: 'active',
    url: '/',
    icon: 'fe fe-map',
    textTranslationKey: 'main-navigation.utt.section',
    hasChildren: true,
    expanded: false,
    permissions: ['CONTRACT_CENTER'],
    children: [
      {
        activeClassName: 'active',
        url: '/farms',
        icon: 'fe fe-briefcase',
        textTranslationKey: 'main-navigation.utt.files',
        permissions: ['CONTRACT_CENTER']
      }
    ]
  },
  {
    activeClassName: 'active',
    url: '/',
    icon: 'fe fe-briefcase',
    textTranslationKey: 'main-navigation.contract.section',
    hasChildren: true,
    expanded: false,
    permissions: ['CONTRACT_CENTER'],
    children: [
      {
        activeClassName: 'active',
        url: '/contracts/contracts-dashboard',
        icon: 'fe fe-clock',
        textTranslationKey: 'main-navigation.contract.dashboard',
        permissions: ['CONTRACT_CENTER']
      },
      {
        activeClassName: 'active',
        url: '/contracts',
        icon: 'fe fe-briefcase',
        textTranslationKey: 'main-navigation.contract.contracts',
        permissions: ['CONTRACT_CENTER']
      }
    ]
  },
  {
    activeClassName: 'active',
    url: '/farmers',
    icon: 'fe fe-user-check',
    textTranslationKey: 'main-navigation.farmers',
    permissions: ['CONTRACT_CENTER']
  },
  {
    activeClassName: 'active',
    url: '/products',
    icon: 'fe fe-box',
    textTranslationKey: 'main-navigation.products',
    permissions: ['CONTRACT_CENTER']
  }
];
