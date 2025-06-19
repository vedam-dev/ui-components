import { Box, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import MonoToneToken from '../../../../component/atom/icon/MonoToneToken';
import MonoToneWallet from '../../../../component/atom/icon/MonoToneWallet';
import React from 'react';
import { useCoreTheme } from '../../../../theme/core-theme';
import WVRed80 from '../../../../component/atom/icon/lottery/wv/WVRed80';
import NavigationMenu from '../../../../component/organism/navigation/mobile/NavigationMenu';
import { NavigationMenuItems } from '../../../../component/organism/navigation/types';

const meta = {
  title: 'Organism/Navigation/Mobile',
  component: NavigationMenu,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const MobileAccountSection: React.FC = () => {
  const theme = useCoreTheme();
  return (
    <Box
      sx={{
        padding: '0px 16px 0px 16px',
        border: `2px solid ${theme.palette.grey[100]}`,
        borderRadius: `${theme.spacing(2)}`,
        margin: 0,
        cursor: 'default',
        width: '100%',
        '&:hover': { backgroundColor: theme.palette.common.white }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
          width: '100%',
          padding: '8px 0'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start'
          }}
        >
          <MonoToneWallet />
          <Typography
            variant="body1"
            sx={{
              pl: theme.spacing(2)
            }}
          >
            $1,000.00
          </Typography>
        </Box>
        <Typography variant="body1" color={theme.palette.grey[500]}>
          Wallet Balance
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
          width: '100%',
          padding: '8px 0'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start'
          }}
        >
          <MonoToneToken />
          <Typography
            variant="body1"
            sx={{
              pl: theme.spacing(2)
            }}
          >
            200,000
          </Typography>
        </Box>
        <Typography variant="body1" color={theme.palette.grey[500]}>
          Points Balance
        </Typography>
      </Box>
    </Box>
  );
};

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
        onClick: (): void => {}
      },
      {
        uri: '/custom',
        accessibilityLabel: 'PlayON History',
        label: 'PlayON History',
        isExternal: false,
        selected: false,
        onClick: (): void => {}
      }
    ],
    selected: false,
    key: 'account'
  },
  {
    uri: '/',
    accessibilityLabel: 'Home',
    label: 'Home',
    isExternal: false,
    selected: true
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
        selected: true
      },
      {
        uri: '/games/draws',
        accessibilityLabel: 'Draw Games',
        label: 'Draw Games',
        isExternal: false,
        selected: true
      },
      {
        uri: '/games/scratch-offs',
        accessibilityLabel: 'Scratch Offs',
        label: 'Scratch Offs',
        isExternal: false,
        selected: true
      }
    ]
  },
  {
    uri: '/play-on',
    accessibilityLabel: 'PlayON',
    label: 'PlayON',
    isExternal: false,
    selected: false
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
        selected: true
      },
      {
        uri: '/news-winning/news-events',
        accessibilityLabel: 'News and Events',
        label: 'News and Events',
        isExternal: false,
        selected: true
      },
      {
        uri: '/news-winning/retail-offers',
        accessibilityLabel: 'Retail Offers',
        label: 'Retail Offers',
        isExternal: false,
        selected: true
      },
      {
        uri: '/news-winning/iPlay-offers',
        accessibilityLabel: 'iPlay Offers',
        label: 'iPlay Offers',
        isExternal: false,
        selected: true
      },
      {
        uri: '/news-winning/check-numbers',
        accessibilityLabel: 'Check Numbers',
        label: 'Check Numbers',
        isExternal: false,
        selected: true
      },
      {
        uri: '/news-winning/recent-winners',
        accessibilityLabel: 'Recent Winners',
        label: 'Recent Winners',
        isExternal: false,
        selected: true
      },
      {
        uri: '/news-winning/claim-prize',
        accessibilityLabel: 'Claim Prize',
        label: 'Claim Prize',
        isExternal: false,
        selected: true
      },
      {
        uri: '/news-winning/nightly-draws',
        accessibilityLabel: 'Nightly Draws',
        label: 'Nightly Draws',
        isExternal: false,
        selected: true
      }
    ]
  },
  {
    uri: '/about-us',
    accessibilityLabel: 'About Us',
    label: 'About Us',
    isExternal: false,
    selected: false
  }
];

export const Main: Story = {
  args: {
    LogoIcon: <WVRed80 />,
    height: '60px',
    homePage: '/',
    onNavigationClick: () => {},
    appBarProps: {
      style: {
        width: '100%',
        backgroundColor: '#fff'
      }
    },
    defaultIconSize: {
      width: 80,
      height: 80
    },
    largeIconSize: {
      width: 80,
      height: 80
    },
    navigationMenuItems: menuItems,
    isLoggedIn: true,
    mobileNonLoginSection: null,
    mobileAccountSection: <MobileAccountSection />,
    mobileSignOutItem: null,
    showSkipContent: true,
    ariaLabels: {
      hamburgerButton: {
        open: 'Open navigation menu',
        close: 'Close navigation menu'
      }
    },
    skipContentLabel: 'Skip to main content'
  }
};
