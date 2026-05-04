import React, { useState, useRef, useLayoutEffect } from 'react';
import { Menu, MenuItem, Box, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

interface IconDropdownProps {
  label: string;
  iconUrl?: string;
  options: string[];
  onSelect?: (option: string) => void;
  autoWidth?: boolean;
  minWidth?: number;
  disabled?: boolean;
}

const IconDropdown: React.FC<IconDropdownProps> = ({
  label,
  iconUrl,
  options,
  onSelect,
  autoWidth = false,
  minWidth = 120,
  disabled = false,
}) => {
  const theme = useCoreTheme() as CoreTheme;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<string>(label);
  const [dropdownWidth, setDropdownWidth] = useState<number>(180);
  const textRef = useRef<HTMLDivElement>(null);

  // Calculate width based on text content
  useLayoutEffect(() => {
    if (autoWidth && textRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        context.font = '500 16px Inter, Arial, sans-serif';

        const allTexts = [selected, ...options];
        const maxWidth = Math.max(...allTexts.map((text) => context.measureText(text).width));

        const iconSpace = iconUrl ? 20 + Number(theme.spacing(3)) : 0;
        const arrowSpace = 24;
        const horizontalPadding = Number(theme.spacing(4)) * 2;

        const calculatedWidth = Math.max(
          maxWidth + iconSpace + arrowSpace + horizontalPadding,
          minWidth
        );

        setDropdownWidth(calculatedWidth);
      }
    }
  }, [selected, options, autoWidth, iconUrl, minWidth, theme]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect?.(option);
    handleClose();
  };

  const boxWidth = autoWidth ? `${dropdownWidth}px` : '180px';

  return (
    <>
      <Box
        onClick={handleOpen}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => !disabled && e.key === 'Enter' && handleOpen(e as any)}
        sx={{
          display: 'inline-flex',
          padding: { md: '9px 12px', lg: '12px 16px' },
          alignItems: 'center',
          gap: theme.spacing(3),
          width: boxWidth,
          borderRadius: theme.spacing(3),
          border: disabled
            ? `1px solid ${theme.palette.grey[400]}`
            : `1px solid ${theme.vd.palette.borderDefault}`,
          background: disabled ? theme.palette.grey[100] : theme.palette.common.white,
          cursor: disabled ? 'not-allowed' : 'pointer',
          userSelect: 'none',
          color: disabled ? theme.vd.palette.textMuted : 'inherit',
        }}
      >
        {iconUrl && (
          <Box component="img" src={iconUrl} alt="dropdown icon" sx={{ width: 20, height: 20 }} />
        )}
        <Typography
          ref={textRef}
          fontSize="16px"
          fontWeight={500}
          sx={{
            whiteSpace: 'nowrap',
            flex: 1,
          }}
        >
          {selected}
        </Typography>
        <ArrowDropDownIcon fontSize="small" />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'dropdown-button',
        }}
        PaperProps={{
          sx: {
            width: boxWidth,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleSelect(option)}
            selected={option === selected}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default IconDropdown;
