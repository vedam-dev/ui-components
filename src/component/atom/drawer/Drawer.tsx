import React, { FC, ReactNode } from 'react';
import { Drawer as MuiDrawer, DrawerProps as MuiDrawerProps, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SxOverride from '../../../util/SxOverride';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export interface DrawerProps extends Omit<MuiDrawerProps, 'open' | 'onClose'> {
  /** Whether the drawer is open */
  open: boolean;
  /** Callback fired when the drawer should close */
  onClose: () => void;
  /** Drawer title shown in header */
  title?: string;
  /** Content to render inside drawer */
  children?: ReactNode;
  /** Width of the drawer (only for left/right anchors) */
  width?: number | string;
  /** Custom sx overrides for drawer paper */
  paperSx?: MuiDrawerProps['sx'];
}

const Drawer: FC<DrawerProps> = ({
  open,
  onClose,
  anchor = 'left',
  title,
  children,
  width = 300,
  paperSx,
  ...rest
}) => {
  const { palette } = useCoreTheme() as CoreTheme;

  const defaultPaperSx = SxOverride(
    {
      width: anchor === 'left' || anchor === 'right' ? width : 'auto',
      padding: 2,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: palette.background.paper,
    },
    paperSx
  );

  return (
    <MuiDrawer
      open={open}
      onClose={onClose}
      anchor={anchor}
      PaperProps={{ sx: defaultPaperSx }}
      {...rest}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        {title && <Typography variant="h6">{title}</Typography>}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box flexGrow={1} overflow="auto">
        {children}
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;