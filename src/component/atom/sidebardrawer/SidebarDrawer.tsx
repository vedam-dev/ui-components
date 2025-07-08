import React, { FC, ReactNode, useState } from 'react';
import { 
  Drawer as MuiDrawer, 
  DrawerProps as MuiDrawerProps, 
  Box, 
  IconButton, 
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon
} from '@mui/icons-material';
import SxOverride from '../../../util/SxOverride';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export interface SidebarItem {
  id: string;
  icon: ReactNode;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface SidebarDrawerProps extends Omit<MuiDrawerProps, 'open' | 'onClose'> {
  items?: SidebarItem[];
  collapsedWidth?: number;
  expandedWidth?: number;
  defaultExpanded?: boolean;
  paperSx?: MuiDrawerProps['sx'];
  onItemClick?: (item: SidebarItem) => void;
}

const SidebarDrawer: FC<SidebarDrawerProps> = ({
  items = [],
  anchor = 'left',
  collapsedWidth = 64,
  expandedWidth = 240,
  defaultExpanded = false,
  paperSx,
  onItemClick,
  ...rest
}) => {
  const { palette } = useCoreTheme() as CoreTheme;
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleItemClick = (item: SidebarItem) => {
    if (item.onClick) {
      item.onClick();
    }
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const currentWidth = expanded ? expandedWidth : collapsedWidth;

  const defaultPaperSx = SxOverride(
    {
      width: anchor === 'left' || anchor === 'right' ? currentWidth : 'auto',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: palette.background.paper,
      borderRight: `1px solid ${palette.divider}`,
      transition: 'width 0.3s ease-in-out',
      overflow: 'hidden',
    },
    paperSx
  );

  return (
    <MuiDrawer
      variant="permanent"
      anchor={anchor}
      PaperProps={{ sx: defaultPaperSx }}
      {...rest}
    >
      {/* Header with toggle button */}
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent={expanded ? "space-between" : "center"} 
        p={1}
        minHeight={64}
      >
        {expanded && (
          <Typography variant="h6" sx={{ ml: 1 }}>
            Menu
          </Typography>
        )}
        <IconButton onClick={handleToggle} size="small">
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Navigation Items */}
      <Box flexGrow={1}>
        <List sx={{ px: 1 }}>
          {items.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <Tooltip 
                title={expanded ? "" : item.text} 
                placement="right"
                arrow
              >
                <ListItemButton
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  sx={{
                    minHeight: 48,
                    justifyContent: expanded ? 'initial' : 'center',
                    px: 2.5,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: palette.action.hover,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: expanded ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    sx={{ 
                      opacity: expanded ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out',
                    }} 
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>
    </MuiDrawer>
  );
};


export const ExampleSidebarUsage: FC = () => {
  const sidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      icon: <DashboardIcon />,
      text: 'Dashboard',
      onClick: () => console.log('Dashboard clicked'),
    },
    {
      id: 'users',
      icon: <PeopleIcon />,
      text: 'Users',
      onClick: () => console.log('Users clicked'),
    },
    {
      id: 'analytics',
      icon: <AnalyticsIcon />,
      text: 'Analytics',
      onClick: () => console.log('Analytics clicked'),
    },
    {
      id: 'notifications',
      icon: <NotificationsIcon />,
      text: 'Notifications',
      onClick: () => console.log('Notifications clicked'),
    },
    {
      id: 'settings',
      icon: <SettingsIcon />,
      text: 'Settings',
      onClick: () => console.log('Settings clicked'),
    },
    {
      id: 'help',
      icon: <HelpIcon />,
      text: 'Help',
      onClick: () => console.log('Help clicked'),
    },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <SidebarDrawer 
        items={sidebarItems}
        defaultExpanded={false}
        onItemClick={(item) => console.log(`Item clicked: ${item.text}`)}
      />
      
    </Box>
  );
};

export default SidebarDrawer;