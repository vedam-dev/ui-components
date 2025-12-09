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
  Collapse,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import SxOverride from '../../../util/SxOverride';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export interface SidebarSubmenuItem {
  id: string;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
}

export interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
  submenu?: SidebarSubmenuItem[];
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
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

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

  const toggleAccordion = (itemId: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleItemClick = (item: SidebarItem) => {
    if (!isExpanded) {
      if (expanded === undefined) {
        setInternalExpanded(true);
      }
      onToggleExpand?.(true);
      if (item.submenu && item.submenu.length > 0) {
        toggleAccordion(item.id);
      }
      return;
    }

    if (item.submenu && item.submenu.length > 0) {
      toggleAccordion(item.id);
      return;
    }

    if (item.submenu && item.submenu.length > 0) {
      toggleAccordion(item.id);
      return;
    }

    setActiveId(item.id);
    item.onClick?.();
    onItemClick?.(item);
  };

  const handleSubmenuClick = (parentItem: SidebarItem, submenuItem: SidebarSubmenuItem) => {
    setActiveId(submenuItem.id);
    submenuItem.onClick?.();
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
        0 -4px 10px -2px rgba(0, 0, 0, 0.08),
        0 -4px 10px -2px rgba(0, 0, 0, 0.08),
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
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isMenuExpanded = expandedMenus[item.id];
            const hasActiveChild = hasSubmenu && item.submenu?.some((sub) => sub.id === activeId);
            const isActive = hasActiveChild || (!hasSubmenu && item.id === activeId);
            return (
              <React.Fragment key={item.id}>
                <ListItem
                  disablePadding
                  sx={{
                    mb: hasSubmenu && isMenuExpanded && isExpanded ? 0 : 1,
                  }}
                >
                  <Tooltip title={isExpanded ? '' : item.text} placement="right" arrow>
                    <ListItemButton
                      onClick={() => handleItemClick(item)}
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
                        backgroundColor: isActive ? theme.palette.primary.dark : 'transparent',
                        color: isActive ? palette.primary.contrastText : palette.text.primary,
                        '&:hover': {
                          backgroundColor: isActive
                            ? theme.palette.primary.dark
                            : palette.action.hover,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          minWidth: 0,
                          margin: 0,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: isActive ? palette.primary.contrastText : palette.text.secondary,
                          '& svg': {
                            display: 'block',
                            color: isActive ? palette.primary.contrastText : palette.text.secondary,
                          },
                        }}
                      >
                        {item.icon}
                      </Box>
                      {isExpanded && (
                        <>
                          <ListItemText
                            primary={item.text}
                            sx={{
                              opacity: 1,
                              transition: 'opacity 0.3s',
                              margin: 0,
                              flex: 1,
                              minWidth: 0,
                              color: isActive ? palette.primary.contrastText : palette.text.primary,
                              '& .MuiTypography-root': {
                                textAlign: 'left',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                display: 'block',
                                lineHeight: 1.5,
                              },
                            }}
                          />
                          {hasSubmenu && (
                            <ExpandMoreIcon
                              sx={{
                                transition: 'transform 0.3s',
                                transform: isMenuExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                color: isActive ? palette.primary.contrastText : 'inherit',
                              }}
                            />
                          )}
                        </>
                      )}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>

                {hasSubmenu && isExpanded && (
                  <Collapse in={isMenuExpanded} timeout="auto" unmountOnExit>
                    <List
                      sx={{
                        pl: theme.spacing(2),
                        borderRadius: theme.spacing(2),
                        mb: 1,
                        py: 0.5,
                      }}
                    >
                      {item.submenu?.map((submenuItem) => {
                        const isSubmenuActive = submenuItem.id === activeId;
                        return (
                          <ListItem key={submenuItem.id} disablePadding>
                            <ListItemButton
                              onClick={() => handleSubmenuClick(item, submenuItem)}
                              selected={isSubmenuActive}
                              sx={{
                                minHeight: 40,
                                pl: theme.spacing(4),
                                pr: theme.spacing(2),
                                py: theme.spacing(1),
                                borderRadius: theme.spacing(1.5),
                                '&.Mui-selected': {
                                  backgroundColor: 'transparent',
                                  color: palette.text.primary,
                                  fontWeight: 600,
                                  '&:hover': {
                                    backgroundColor: palette.action.selected,
                                  },
                                },
                                '&:hover': {
                                  backgroundColor: palette.action.selected,
                                },
                              }}
                            >
                              <ListItemText
                                primary={`– ${submenuItem.text}`}
                                sx={{
                                  margin: 0,
                                  '& .MuiTypography-root': {
                                    fontSize: '0.8125rem',
                                    fontWeight: isSubmenuActive ? 600 : 400,
                                    color: palette.text.secondary,
                                    ml: theme.spacing(4),
                                  },
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </MuiDrawer>
  );
};

export default SidebarDrawer;
