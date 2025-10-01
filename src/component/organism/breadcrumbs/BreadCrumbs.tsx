import React from 'react';
import { Breadcrumbs, Typography, Box, SxProps, Theme } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

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
  return (
    <Box sx={{ ...sx }}>
      <Breadcrumbs
        separator={separator}
        aria-label="breadcrumb"
        sx={{
          '& .MuiBreadcrumbs-separator': {
            mx: 0.5,
            color: '#6B7280',
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
                  color: '#8A18FF',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
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
                color: '#1E1E1E',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                textDecoration: 'none',
                cursor: item.href || item.onClick ? 'pointer' : 'default',
                '&:hover': {
                  textDecoration: item.href || item.onClick ? 'underline' : 'none',
                  color: item.href || item.onClick ? '#374151' : '#6B7280',
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
