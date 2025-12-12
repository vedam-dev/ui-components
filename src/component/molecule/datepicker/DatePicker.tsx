import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';

export interface CustomDatePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  onAccept?: (date: Date | null) => void;
  onCancel?: () => void;
  minDate?: Date;
  maxDate?: Date;

  autoWidth?: boolean;
  fullWidth?: boolean;
  width?: string | number;
  minWidth?: string | number;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label = 'Select date',
  value,
  onChange,
  onAccept,
  onCancel,
  minDate,
  maxDate,
  autoWidth = true,
  fullWidth = false,
  width,
  minWidth = 0,
}) => {
  const [tempValue, setTempValue] = useState<Date | null>(value);

  const handleClear = () => {
    setTempValue(null);
    onChange(null);
  };

  const handleCancel = () => {
    setTempValue(value);
    if (onCancel) onCancel();
  };

  const handleOk = () => {
    onChange(tempValue);
    if (onAccept) onAccept(tempValue);
  };
  const theme = useCoreTheme() as CoreTheme;

  // compute root width style
  const computedWidth: string | number | undefined = fullWidth
    ? '100%'
    : width !== undefined
      ? width
      : autoWidth
        ? 'fit-content'
        : undefined;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: fullWidth ? 'block' : 'inline-block',
          width: computedWidth,
          minWidth: minWidth,
          maxWidth: fullWidth ? '100%' : 'none',

          backgroundColor: '#f5f5f5',
          borderRadius: theme.spacing(7),
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#ffffff',
            padding: '16px 24px',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: '#666666',
                marginBottom: '4px',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </Typography>
            <Typography
              sx={{
                fontSize: '1.75rem',
                fontWeight: 400,
                color: '#000000',
                letterSpacing: '-0.5px',
              }}
            >
              {tempValue ? format(tempValue, 'EEE, MMM d') : 'No date selected'}
            </Typography>
          </Box>
          <IconButton
            sx={{
              color: '#000000',
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>

        <Box sx={{ backgroundColor: theme.palette.background.paper, padding: theme.spacing(4) }}>
          <DateCalendar
            value={tempValue}
            onChange={(newValue) => setTempValue(newValue as Date | null)}
            minDate={minDate}
            maxDate={maxDate}
            sx={{
              width: '100%',
              maxWidth: '100%',
              height: 'auto',

              '& .MuiDateCalendar-root': {
                width: '100%',
                maxWidth: '100%',
                height: 'auto',
              },
              '& .MuiPickersCalendarHeader-root': {
                marginTop: 0,
                marginBottom: '8px',
                paddingLeft: 0,
                paddingRight: 0,
              },

              '& .MuiPickersCalendarHeader-label': {
                fontSize: '1rem',
                fontWeight: 500,
              },

              '& .MuiDayCalendar-weekDayLabel': {
                width: '40px',
                height: '40px',
                margin: 0,
                color: '#666666',
                fontWeight: 500,
                fontSize: '0.875rem',
              },
              '& .MuiDayCalendar-header': {
                display: 'flex',
                justifyContent: 'space-between',
                paddingLeft: 0,
                paddingRight: 0,
              },

              '& .MuiDayCalendar-weekContainer': {
                margin: 0,
                justifyContent: 'space-between',
              },

              '& .MuiPickersDay-root': {
                width: '40px',
                height: '40px',
                margin: 0,
                color: '#000000',
                fontWeight: 400,
                fontSize: '0.875rem',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
                '&.Mui-selected': {
                  backgroundColor: '#1976d2',
                  color: '#ffffff',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                  '&:focus': {
                    backgroundColor: '#1976d2',
                  },
                },
                '&.Mui-disabled': {
                  color: '#cccccc',
                },
              },
              // Today's date styling
              '& .MuiPickersDay-today': {
                border: '1px solid #1976d2',

                '&:not(.Mui-selected)': {
                  backgroundColor: 'transparent',
                },
              },
              '& .MuiPickersDay-dayOutsideMonth': {
                color: '#cccccc',
              },
            }}
          />
        </Box>

        <Box
          sx={{
            backgroundColor: '#ffffff',
            padding: theme.spacing(3),
            paddingBottom: theme.spacing(2),
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            onClick={handleClear}
            sx={{
              color: '#000000',
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)',
              },
            }}
          >
            Clear
          </Button>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Button
              onClick={handleCancel}
              sx={{
                color: '#000000',
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.04)',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleOk}
              sx={{
                color: '#000000',
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.04)',
                },
              }}
            >
              OK
            </Button>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
