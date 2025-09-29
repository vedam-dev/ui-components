import type { Meta, StoryObj } from '@storybook/react';
import NavigationMenu from '../../../../component/organism/navigation/default/NavigationMenu';
import WVRed80 from '../../../../component/atom/icon/lottery/wv/WVRed80';
import { NavigationMenuItems } from '../../../../component/organism/navigation/types';

const meta = {
  title: 'Organism/Navigation/Default',
  component: NavigationMenu,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const menuItems: NavigationMenuItems = [
  {
    uri: '/custom',
    accessibilityLabel: 'Account Details',
    label: 'Account Details',
    isExternal: false,
    subItems: [
      {
        uri: '/custom',
        accessibilityLabel: 'My Account',
        label: 'My Account',
        isExternal: false,
        selected: false,
        onClick: (): void => {},
      },
      {
        uri: '/custom',
        accessibilityLabel: 'PlayON History',
        label: 'PlayON History',
        isExternal: false,
        selected: false,
        onClick: (): void => {},
      },
    ],
    selected: false,
    key: 'account',
    hidden: true,
  },
  {
    uri: '/',
    accessibilityLabel: 'Home',
    label: 'Home',
    isExternal: false,
    selected: true,
  },
  {
    uri: '/games',
    accessibilityLabel: 'Games',
    label: 'Games',
    isExternal: false,
    selected: false,
    subItems: [
      {
        uri: '/games/digital-instants',
        accessibilityLabel: 'Digital Instant Games',
        label: 'Digital Instant Games',
        isExternal: false,
        selected: true,
      },
      {
        uri: '/games/draws',
        accessibilityLabel: 'Draw Games',
        label: 'Draw Games',
        isExternal: false,
        selected: true,
      },
      {
        uri: '/games/scratch-offs',
        accessibilityLabel: 'Scratch Offs',
        label: 'Scratch Offs',
        isExternal: false,
        selected: true,
      },
    ],
  },
  {
    uri: '/play-on',
    accessibilityLabel: 'PlayON',
    label: 'PlayON',
    isExternal: false,
    selected: false,
  },
  {
    uri: '/news-winning',
    accessibilityLabel: 'News & Winning',
    label: 'News & Winning',
    isExternal: false,
    selected: false,
    subItems: [
      {
        uri: '/news-winning/get-mobile-app',
        accessibilityLabel: 'Get the Mobile App',
        label: 'Get the Mobile App',
        isExternal: false,
        selected: true,
      },
      {
        uri: '/news-winning/news-events',
        accessibilityLabel: 'News and Events',
        label: 'News and Events',
        isExternal: false,
        selected: true,
      },
      {
        uri: '/news-winning/retail-offers',
        accessibilityLabel: 'Retail Offers',
        label: 'Retail Offers',
        isExternal: false,
        selected: true,
      },
      {
        uri: '/news-winning/iPlay-offers',
        accessibilityLabel: 'iPlay Offers',
        label: 'iPlay Offers',
        isExternal: false,
        selected: true,
      },
      {
        uri: '/news-winning/check-numbers',
        accessibilityLabel: 'Check Numbers',
        label: 'Check Numbers',
        isExternal: false,
        selected: true,
      },
      {
        uri: '/news-winning/recent-winners',
        accessibilityLabel: 'Recent Winners',
        label: 'Recent Winners',
        isExternal: false,
        selected: true,
      },
      {
        uri: '/news-winning/claim-prize',
        accessibilityLabel: 'Claim Prize',
        label: 'Claim Prize',
        isExternal: false,
        selected: true,
      },
      {
        uri: '/news-winning/nightly-draws',
        accessibilityLabel: 'Nightly Draws',
        label: 'Nightly Draws',
        isExternal: false,
        selected: true,
      },
    ],
  },
  {
    uri: '/about-us',
    accessibilityLabel: 'About Us',
    label: 'About Us',
    isExternal: false,
    selected: false,
  },
];

export const Main: Story = {
  args: {
    LogoIcon: <WVRed80 />,
    height: '70px',
    largeHeight: '70px',
    homePage: '/',
    showSkipContent: true,
    skipContentLabel: 'Skip to main content',
    onNavigationClick: () => {},
    appBarProps: {
      style: {
        width: '100%',
        backgroundColor: '#fff',
      },
      position: 'fixed',
    },
    primaryMenuProps: {
      ml: 0,
    },
    defaultIconSize: {
      width: 60,
      height: 60,
    },
    largeIconSize: {
      width: 112,
      height: 112,
    },
    navigationMenuItems: menuItems,
  },
};

export const FixedIconSize: Story = {
  args: {
    LogoIcon: <WVRed80 />,
    height: '70px',
    homePage: '/',
    onNavigationClick: () => {},
    appBarProps: {
      style: {
        width: '100%',
        backgroundColor: '#fff',
      },
    },
    defaultIconSize: {
      width: 60,
      height: 60,
    },
    navigationMenuItems: menuItems,
  },
};
