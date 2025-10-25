import React, { FC, useEffect, useState } from 'react';
import {
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import SxOverride from '../../../util/SxOverride';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  disabled?: boolean;

  selected?: boolean;
}

export interface SidebarDrawerProps extends Omit<MuiDrawerProps, 'open' | 'onClose'> {
  items?: SidebarItem[];
  collapsedWidth?: number;
  expandedWidth?: number;
  expanded?: boolean;
  defaultExpanded?: boolean;
  paperSx?: MuiDrawerProps['sx'];
  onItemClick?: (item: SidebarItem) => void;
  onToggleExpand?: (expanded: boolean) => void;
}

const SidebarDrawer: FC<SidebarDrawerProps> = ({
  items = [],
  anchor = 'left',
  collapsedWidth = 64,
  expandedWidth = 200,
  expanded,
  defaultExpanded = false,
  paperSx,
  onItemClick,
  onToggleExpand,
  ...rest
}) => {
  const { palette } = useCoreTheme() as CoreTheme;
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const initialActiveId = (() => {
    const selected = items.find((it) => it.selected);
    if (selected) return selected.id;
    return items[0]?.id ?? null;
  })();

  const [activeId, setActiveId] = useState<string | null>(initialActiveId);
  const theme = useCoreTheme() as CoreTheme;

  useEffect(() => {
    const selected = items.find((it) => it.selected);
    if (selected) {
      setActiveId(selected.id);
    } else {
      setActiveId(items[0]?.id ?? null);
    }
  }, [items]);

  const isExpanded = expanded !== undefined ? expanded : internalExpanded;

  const handleItemClick = (item: SidebarItem) => {
    if (!isExpanded) {
      if (expanded === undefined) {
        setInternalExpanded(true);
      }
      onToggleExpand?.(true);
    }

    setActiveId(item.id);

    item.onClick?.();
    onItemClick?.(item);
  };

  const currentWidth = isExpanded ? expandedWidth : collapsedWidth;
  const defaultPaperSx = SxOverride(
    {
      width: anchor === 'left' || anchor === 'right' ? currentWidth : 'auto',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: palette.background.paper,
      borderRight: `1px solid ${palette.divider}`,
      transition: 'width 0.3s ease-in-out',
      overflow: 'hidden',
      boxShadow: isExpanded
        ? `
        0 -4px 10px -2px rgba(0, 0, 0, 0.08),  // Top shadow
        0 4px 10px -2px rgba(0, 0, 0, 0.08)   
      `
        : 'none',
      borderTopRightRadius: isExpanded ? theme.spacing(6) : '0px',
      borderBottomRightRadius: isExpanded ? theme.spacing(6) : '0px',
    },
    paperSx
  );

  return (
    <MuiDrawer variant="permanent" anchor={anchor} PaperProps={{ sx: defaultPaperSx }} {...rest}>
      <Box
        flexGrow={1}
        sx={{
          marginTop: theme.spacing(9),
          marginX: theme.spacing(3),
        }}
      >
        <List sx={{ px: 0 }}>
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
                <Tooltip title={isExpanded ? '' : item.text} placement="right" arrow>
                  <ListItemButton
                    onClick={() => handleItemClick(item)}
                    selected={isActive}
                    sx={{
                      minHeight: 48,
                      justifyContent: isExpanded ? 'left' : 'center',
                      padding: theme.spacing(2),
                      borderRadius: isExpanded ? theme.spacing(2) : '50%',
                      transition: 'all 0.3s',
                      flexDirection: isExpanded ? 'row' : 'column',
                      alignItems: 'center',
                      gap: isExpanded ? theme.spacing(2) : 0,
                      width: '100%',
                      maxWidth: isExpanded ? 'auto' : 48,
                      minWidth: 'auto',
                      '&.Mui-selected': {
                        backgroundColor: theme.palette.primary.dark,
                        color: palette.primary.contrastText,
                        '& .MuiListItemIcon-root, & .MuiListItemText-root': {
                          color: palette.primary.contrastText,
                        },
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      },
                      '&:hover': {
                        backgroundColor: isActive
                          ? theme.palette.primary.dark
                          : palette.action.hover,
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        margin: 0,
                        justifyContent: 'center',
                        color: isActive ? palette.primary.contrastText : palette.text.secondary,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {isExpanded && (
                      <ListItemText
                        primary={item.text}
                        sx={{
                          opacity: 1,
                          transition: 'opacity 0.3s',
                          margin: 0,
                          flex: 'none',
                          minWidth: 0,
                          '& .MuiTypography-root': {
                            textAlign: 'left',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            display: 'block',
                            width: 'fit-content',
                            lineHeight: 1.5,
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </MuiDrawer>
  );
};

export default SidebarDrawer;
