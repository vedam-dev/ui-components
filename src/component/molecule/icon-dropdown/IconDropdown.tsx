import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import { Box } from '../../atom/box';
import { Typography } from '../../atom/typography';

export type IconDropdownOption =
  | string
  | {
      value: string;
      label: string;
      title?: string;
      subtitle?: string | null;
    };

interface IconDropdownProps {
  label: string;
  value?: string;
  iconUrl?: string;
  options: IconDropdownOption[];
  onSelect?: (option: string) => void;
  autoWidth?: boolean;
  minWidth?: number;
  disabled?: boolean;
  maxVisibleItems?: number;
}

const MENU_ITEM_HEIGHT = 56;

function getOptionValue(option: IconDropdownOption): string {
  return typeof option === 'string' ? option : option.value;
}

function getOptionLabel(option: IconDropdownOption): string {
  return typeof option === 'string' ? option : option.label;
}

function getOptionTitle(option: IconDropdownOption): string {
  if (typeof option === 'string') return option;
  return option.title || option.label;
}

function getOptionSubtitle(option: IconDropdownOption): string | null {
  if (typeof option === 'string') return null;
  return option.subtitle ?? null;
}

function isRichOption(option: IconDropdownOption): boolean {
  return typeof option !== 'string';
}

const IconDropdown: React.FC<IconDropdownProps> = ({
  label,
  value,
  iconUrl,
  options,
  onSelect,
  autoWidth = false,
  minWidth = 120,
  disabled = false,
  maxVisibleItems,
}) => {
  const theme = useCoreTheme() as CoreTheme;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>(label);
  const [selectedValue, setSelectedValue] = useState<string>(value ?? label);
  const [dropdownWidth, setDropdownWidth] = useState<number>(180);
  const textRef = useRef<HTMLDivElement>(null);
  const hasRichOptions = options.some(isRichOption);

  useEffect(() => {
    setSelectedLabel(label);
  }, [label]);

  useEffect(() => {
    if (value != null) {
      setSelectedValue(value);
      return;
    }
    setSelectedValue(label);
  }, [value, label]);

  useLayoutEffect(() => {
    if (autoWidth && textRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        context.font = '500 16px Inter, Arial, sans-serif';

        const allTexts = [selectedLabel, ...options.map((option) => getOptionTitle(option))];
        const maxWidth = Math.max(
          ...allTexts.map((text) => context.measureText(String(text)).width)
        );

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
  }, [selectedLabel, options, autoWidth, iconUrl, minWidth, theme]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option: IconDropdownOption) => {
    const nextValue = getOptionValue(option);
    const nextLabel = getOptionLabel(option);
    setSelectedValue(nextValue);
    setSelectedLabel(nextLabel);
    onSelect?.(nextValue);
    handleClose();
  };

  const boxWidth = autoWidth ? `${dropdownWidth}px` : '180px';
  const menuMaxHeight =
    maxVisibleItems != null
      ? MENU_ITEM_HEIGHT * maxVisibleItems
      : hasRichOptions
        ? MENU_ITEM_HEIGHT * 5
        : undefined;

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
        {iconUrl && <img src={iconUrl} alt="dropdown icon" style={{ width: 20, height: 20 }} />}
        <Typography
          ref={textRef}
          fontSize="16px"
          fontWeight={500}
          sx={{
            whiteSpace: 'nowrap',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {selectedLabel}
        </Typography>
        <ArrowDropDownIcon fontSize="small" />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'dropdown-button',
          sx: { py: hasRichOptions ? 0 : undefined },
        }}
        PaperProps={{
          sx: {
            width: Math.max(dropdownWidth, minWidth),
            maxHeight: menuMaxHeight,
            overflowY: 'auto',
            borderRadius: '12px',
            boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
          },
        }}
      >
        {options.map((option, index) => {
          const optionValue = getOptionValue(option);
          const title = getOptionTitle(option);
          const subtitle = getOptionSubtitle(option);
          const rich = isRichOption(option);
          const isSelected = optionValue === selectedValue;

          return (
            <MenuItem
              key={optionValue}
              onClick={() => handleSelect(option)}
              selected={isSelected}
              sx={
                rich
                  ? {
                      height: MENU_ITEM_HEIGHT,
                      minHeight: MENU_ITEM_HEIGHT,
                      py: 0,
                      px: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      gap: '2px',
                      borderBottom:
                        index === options.length - 1
                          ? 'none'
                          : `1px solid ${theme.palette.grey[200]}`,
                    }
                  : undefined
              }
            >
              {rich ? (
                <>
                  <Typography
                    sx={{
                      fontSize: '16px',
                      lineHeight: '20px',
                      fontWeight: 400,
                      color: theme.palette.text.primary,
                      fontFamily: 'Outfit, sans-serif',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      width: '100%',
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      lineHeight: '18px',
                      minHeight: '18px',
                      fontWeight: 400,
                      color: theme.palette.text.secondary,
                      fontFamily: 'Outfit, sans-serif',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      width: '100%',
                    }}
                  >
                    {subtitle || '\u00A0'}
                  </Typography>
                </>
              ) : (
                (option as string)
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default IconDropdown;
