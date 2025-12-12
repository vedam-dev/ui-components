import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface CustomPaginationProps {
  label?: string;
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  disabled?: boolean;
  siblingCount?: number;
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  label,
  page,
  totalPages,
  onChange,
  disabled = false,
  siblingCount = 1,
}) => {
  const theme = useCoreTheme() as CoreTheme;

  const generatePaginationRange = () => {
    const range: (number | string)[] = [];
    
    range.push(1);
    
    const leftSibling = Math.max(2, page - siblingCount);
    const rightSibling = Math.min(totalPages - 1, page + siblingCount);
    
    if (leftSibling > 2) {
      range.push('...');
    }
    
    for (let i = leftSibling; i <= rightSibling; i++) {
      range.push(i);
    }
    
    if (rightSibling < totalPages - 1) {
      range.push('...');
    }
    
    if (totalPages > 1) {
      range.push(totalPages);
    }
    
    return range;
  };

  const paginationRange = generatePaginationRange();

  const handlePageClick = (pageNumber: number) => {
    if (!disabled && pageNumber !== page && pageNumber >= 1 && pageNumber <= totalPages) {
      onChange(pageNumber);
    }
  };

  const handlePrevious = () => {
    if (!disabled && page > 1) {
      onChange(page - 1);
    }
  };

  const handleNext = () => {
    if (!disabled && page < totalPages) {
      onChange(page + 1);
    }
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: theme.spacing(3),
      }}
    >
      {label && (
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 500,
            color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
          }}
        >
          {label}
        </Typography>
      )}
      
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing(2),
        }}
      >
        <IconButton
          onClick={handlePrevious}
          disabled={disabled || page === 1}
          sx={{
            width: '40px',
            height: '40px',
            color: disabled || page === 1 ? theme.palette.text.disabled : theme.palette.text.primary,
            '&:hover': {
              backgroundColor: disabled || page === 1 ? 'transparent' : 'rgba(0, 0, 0, 0.04)',
            },
            '&.Mui-disabled': {
              color: theme.palette.text.disabled,
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === '...') {
            return (
              <Typography
                key={`ellipsis-${index}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 400,
                  color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
                  userSelect: 'none',
                }}
              >
                ...
              </Typography>
            );
          }

          const isSelected = pageNumber === page;

          return (
            <Box
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber as number)}
              sx={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                fontSize: '16px',
                fontWeight: isSelected ? 600 : 500,
                color: disabled 
                  ? theme.palette.text.disabled 
                  : isSelected 
                    ? theme.palette.primary.main 
                    : theme.palette.text.primary,
                backgroundColor: isSelected 
                    ? '#F3E8FF' 
                    : 'transparent',
                border: isSelected ? `1px solid ${disabled ? theme.palette.text.disabled : theme.palette.primary.main}` : 'none',
                cursor: disabled ? 'default' : 'pointer',
                userSelect: 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: disabled ? 'transparent' : 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              {pageNumber}
            </Box>
          );
        })}

        <IconButton
          onClick={handleNext}
          disabled={disabled || page === totalPages}
          sx={{
            width: '40px',
            height: '40px',
            color: disabled || page === totalPages ? theme.palette.text.disabled : theme.palette.text.primary,
            '&:hover': {
              backgroundColor: disabled || page === totalPages ? 'transparent' : 'rgba(0, 0, 0, 0.04)',
            },
            '&.Mui-disabled': {
              color: theme.palette.text.disabled,
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};