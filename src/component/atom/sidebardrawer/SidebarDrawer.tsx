import React, { FC, ReactNode, useState } from "react";
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
} from "@mui/material";
import SxOverride from "../../../util/SxOverride";
import { CoreTheme, useCoreTheme } from "../../../theme/core-theme";

export interface SidebarItem {
  id: string;
  icon: ReactNode;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface SidebarDrawerProps
  extends Omit<MuiDrawerProps, "open" | "onClose"> {
  items?: SidebarItem[];
  collapsedWidth?: number;
  expandedWidth?: number;
  defaultExpanded?: boolean;
  paperSx?: MuiDrawerProps["sx"];
  onItemClick?: (item: SidebarItem) => void;
}

const SidebarDrawer: FC<SidebarDrawerProps> = ({
  items = [],
  anchor = "left",
  collapsedWidth = 64,
  expandedWidth = 200,
  defaultExpanded = false,
  paperSx,
  onItemClick,
  ...rest
}) => {
  const { palette } = useCoreTheme() as CoreTheme;
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [activeId, setActiveId] = useState<string | null>(null);
  const theme = useCoreTheme() as CoreTheme;

  const handleItemClick = (item: SidebarItem) => {
    if (item.id === activeId) {
      setExpanded(!expanded);
    } else {
      if (!expanded) {
        setExpanded(true);
      }
      setActiveId(item.id);
    }
    item.onClick?.();
    onItemClick?.(item);
  };

  const currentWidth = expanded ? expandedWidth : collapsedWidth;
  const defaultPaperSx = SxOverride(
    {
      width: anchor === "left" || anchor === "right" ? currentWidth : "auto",
      display: "flex",
      flexDirection: "column",
      backgroundColor: palette.background.paper,
      borderRight: `1px solid ${palette.divider}`,
      transition: "width 0.3s ease-in-out",
      overflow: "hidden",
      borderTopRightRadius: "24px",
      borderBottomRightRadius: "24px",
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
      <Box
        flexGrow={1}
        sx={{
          marginTop: theme.spacing(9),
          marginX: theme.spacing(3),
          padding: expanded ? "8px" : "0px",
        }}
      >
        <List sx={{ px: 0 }}>
          {" "}
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
                <Tooltip
                  title={expanded ? "" : item.text}
                  placement="right"
                  arrow
                >
                  <ListItemButton
                    onClick={() => handleItemClick(item)}
                    selected={isActive}
                    sx={{
                      minHeight: 48,
                      justifyContent: expanded?"left":"center",
                      padding: "8px 12px",
                      borderRadius: expanded ? "8px" : "50%",
                      transition: "all 0.3s",
                      flexDirection: expanded ? "row" : "column",
                      alignItems: "center",
                      gap: expanded ? "8px" : 0,
                      width: "100%",
                      maxWidth: "100%",
                      minWidth: "auto",
                      "&.Mui-selected": {
                        backgroundColor: theme.palette.primary.dark, // todo: update this to [900] when color issue
                        color: palette.primary.contrastText,
                        "& .MuiListItemIcon-root, & .MuiListItemText-root": {
                          color: palette.primary.contrastText,
                        },
                        "&:hover": {
                          backgroundColor: theme.palette.primary.dark, // todo: update this to [900] when color issue
                        },
                      },
                      "&:hover": {
                        backgroundColor: isActive
                          ? theme.palette.primary.dark // todo: update this to [900] when color issue
                          : palette.action.hover,
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        margin: 0,

                        justifyContent: "center",
                        color: isActive
                          ? palette.primary.contrastText
                          : palette.text.secondary,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {expanded && (
                      <ListItemText
                        primary={item.text}
                        sx={{
                          opacity: 1,
                          transition: "opacity 0.3s",
                          margin: 0,
                          flex: "none",
                          minWidth: 0,
                          "& .MuiTypography-root": {
                            textAlign: "left",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            display: "block",
                            width: "fit-content",
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
