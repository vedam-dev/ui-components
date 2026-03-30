import React from 'react';
import { Breadcrumbs, Typography, Box, SxProps, Theme } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface DynamicBreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const DynamicBreadcrumbs: React.FC<DynamicBreadcrumbsProps> = ({
  items,
  separator = <NavigateNext fontSize="small" />,
  sx,
}) => {
  
  const theme = useCoreTheme() as CoreTheme;
  return (
    <Box sx={{ ...sx }}>
      <Breadcrumbs
        separator={separator}
        aria-label="breadcrumb"
        sx={{
          '& .MuiBreadcrumbs-separator': {
            mx: 0.5,
            color: theme.palette.text.secondary,
          },
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          if (isLast) {
            return (
              <Typography
                key={index}
                sx={{
                  color: theme.vd.palette.accentPrimary,
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'solid',
                  textUnderlineOffset: '2px',
                }}
              >
                {item.label}
              </Typography>
            );
          }

          return (
            <Typography
              key={index}
              component={item.href || item.onClick ? 'a' : 'span'}
              href={item.href}
              onClick={item.onClick}
              sx={{
                color: theme.vd.palette.textStrong,
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                textDecoration: 'none',
                cursor: item.href || item.onClick ? 'pointer' : 'default',
                '&:hover': {
                  textDecoration: item.href || item.onClick ? 'underline' : 'none',
                  color: item.href || item.onClick ? theme.palette.text.primary : theme.palette.text.secondary,
                },
              }}
            >
              {item.label}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default DynamicBreadcrumbs;
