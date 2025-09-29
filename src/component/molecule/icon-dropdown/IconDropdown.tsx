import React, { useState, useRef, useLayoutEffect } from 'react';
import { Menu, MenuItem, Box, Typography } from '@mui/material';
import { useCoreTheme } from '../../../theme/core-theme';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface IconDropdownProps {
  label: string;
  iconUrl?: string;
  options: string[];
  onSelect?: (option: string) => void;
  autoWidth?: boolean;
  minWidth?: number;
}

const IconDropdown: React.FC<IconDropdownProps> = ({
  label,
  iconUrl,
  options,
  onSelect,
  autoWidth = false,
  minWidth = 120,
}) => {
  const theme = useCoreTheme();
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
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleOpen(e as any)}
        sx={{
          display: 'inline-flex',
          padding: theme.spacing(3, 4),
          alignItems: 'center',
          gap: theme.spacing(3),
          width: boxWidth,
          borderRadius: theme.spacing(3),
          border: '1px solid #E7E7E7',
          background: '#FFF',
          cursor: 'pointer',
          userSelect: 'none',
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
