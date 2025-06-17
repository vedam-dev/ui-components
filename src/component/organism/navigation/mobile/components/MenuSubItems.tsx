import MonotoneChevronDown from '../../../../../component/atom/icon/MonotoneChevronDown';
import MonotoneChevronUp from '../../../../../component/atom/icon/MonotoneChevronUp';
import { Typography, Theme, Box, Button } from '@mui/material';
import { SxProps } from '@mui/system';
import React, { SyntheticEvent } from 'react';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { useCoreTheme } from '../../../../../theme/core-theme';
import { INavigationItemMultiple } from '../../types';

const MenuSubItems: React.FC<{
  onNavigationClick: (e: SyntheticEvent, item: INavigationItemMultiple) => void;
  item: INavigationItemMultiple;
  isMenuOpen: boolean;
  mobileAccountSection: React.ReactNode;
  sx?: SxProps;
  isSelected: boolean;
  index: number;
  itemsCount: number;
}> = ({
  onNavigationClick,
  item: subItem,
  isMenuOpen,
  mobileAccountSection,
  isSelected,
  sx = {},
  index,
  itemsCount
}) => {
  const theme = useCoreTheme();
  const handleToggle = (e: SyntheticEvent): void => {
    onNavigationClick(e, subItem);
  };

  return (
    <>
      <Button
        onClick={handleToggle}
        tabIndex={0}
        aria-label={`${subItem.label}, item ${index + 1} of ${mobileAccountSection ? itemsCount + 1 : itemsCount}`}
        role="button"
        sx={{
          ...sx,
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          '&:focus-visible': {
            border: `1px solid ${theme.palette.primary.main}`,
            outline: `1px solid ${theme.palette.primary.main}`
          }
        }}
      >
        <Typography
          aria-hidden={true}
          className={isSelected ? 'active' : ''}
          variant="body1"
          sx={{ color: theme.palette.grey[900], fontWeight: 'bold' }}
        >
          {subItem.label}
        </Typography>
        {isMenuOpen ? (
          <MonotoneChevronUp aria-hidden={true} sx={iconStyle} />
        ) : (
          <MonotoneChevronDown sx={iconStyle} />
        )}
      </Button>

      {isMenuOpen ? (
        <>
          {mobileAccountSection && subItem?.key === 'account' && (
            <Box
              key={`accountText-subMenu`}
              sx={{
                ...sx,
                display: 'block'
              }}
            >
              {mobileAccountSection}
            </Box>
          )}
          {subItem!.subItems.map((item, index) => {
            return (
              <Button
                key={`${index}-subMenu`}
                onClick={(e: SyntheticEvent) => {
                  onNavigationClick(e, { ...item, subItems: [] });
                }}
                tabIndex={0}
                aria-label={`${item.label}, item ${index + 1} of ${subItem!.subItems?.length}`}
                role="link"
                sx={{
                  ...sx,
                  display: 'block',
                  paddingX: theme.spacing(9),
                  textDecoration: 'none',
                  width: '100%',
                  textAlign: 'left',
                  '&:focus-visible': {
                    border: `1px solid ${theme.palette.primary.main}`,
                    outline: `1px solid ${theme.palette.primary.main}`
                  }
                }}
              >
                <Typography variant="body1">{item.label}</Typography>
              </Button>
            );
          })}
        </>
      ) : null}
    </>
  );
};

export default MenuSubItems;

const iconStyle: (theme: Theme) => SystemStyleObject<Theme> = theme => {
  return {
    height: `16px`,
    width: `16px`,
    color: theme.palette.grey[500]
  };
};
