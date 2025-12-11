import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { Box, FormHelperText, Typography, TextField, Popover, IconButton } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import { useCoreTheme, CoreTheme } from '../../../theme/core-theme';
import dayjs, { Dayjs } from 'dayjs';

export interface TimePickerProps {
  label?: string;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  format?: '12h' | '24h';
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  minTime?: Date;
  maxTime?: Date;
  sx?: object;
  name?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  label,
  value,
  onChange,
  format = '12h',
  error = false,
  helperText,
  required = false,
  disabled = false,
  placeholder = 'Select time',
  minTime,
  maxTime,
  sx,
  name,
}) => {
  const theme = useCoreTheme() as CoreTheme;
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const timeFormat = format === '12h' ? 'hh:mm A' : 'HH:mm';

  // Convert Date to Dayjs
  const dayjsValue = value ? dayjs(value) : null;
  const dayjsMinTime = minTime ? dayjs(minTime) : undefined;
  const dayjsMaxTime = maxTime ? dayjs(maxTime) : undefined;

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccept = (newValue: Dayjs | null) => {
    if (onChange) {
      onChange(newValue ? newValue.toDate() : null);
    }
    handleClose();
  };

  const handleChange = (newValue: Dayjs | null) => {
    // Update value in real-time as user selects
    if (onChange) {
      onChange(newValue ? newValue.toDate() : null);
    }
  };

  const open = Boolean(anchorEl);
  const displayValue = dayjsValue ? dayjsValue.format(timeFormat) : '';

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: '100%', ...sx }}>
        {label && (
          <Typography
            variant="caption"
            sx={{
              color: error ? theme.palette.error.main : theme.palette.grey[500],
              fontSize: '14px',
              fontWeight: 500,
              mb: theme.spacing(1),
              display: 'block',
            }}
          >
            {label}
            {required && <span style={{ color: theme.palette.error.main }}> *</span>}
          </Typography>
        )}
        <TextField
          fullWidth
          name={name}
          value={displayValue}
          placeholder={placeholder}
          onClick={handleOpen}
          error={error}
          disabled={disabled}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <IconButton size="small" disabled={disabled}>
                <AccessTime />
              </IconButton>
            ),
          }}
          sx={{
            cursor: disabled ? 'default' : 'pointer',
            '& .MuiOutlinedInput-root': {
              borderRadius: theme.spacing(1),
              cursor: disabled ? 'default' : 'pointer',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: error ? theme.palette.error.main : theme.palette.info.main,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: error ? theme.palette.error.main : theme.palette.info.main,
                borderWidth: '2px',
              },
              '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.error.main,
              },
            },
            '& .MuiInputBase-input': {
              fontSize: '16px',
              fontWeight: 400,
              cursor: disabled ? 'default' : 'pointer',
            },
          }}
        />

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                boxShadow: theme.shadows[8],
                borderRadius: theme.spacing(1),
              },
            },
          }}
        >
          <StaticTimePicker
            value={dayjsValue}
            onChange={handleChange}
            onAccept={handleAccept}
            ampm={format === '12h'}
            disabled={disabled}
            minTime={dayjsMinTime}
            maxTime={dayjsMaxTime}
            slotProps={{
              actionBar: {
                actions: ['accept', 'cancel'],
              },
            }}
            sx={{
              '& .MuiPickersLayout-root': {
                backgroundColor: 'transparent',
              },
              '& .MuiTimeClock-root': {
                color: theme.palette.info.main,
              },
              '& .MuiClockNumber-root.Mui-selected': {
                backgroundColor: theme.palette.info.main,
              },
              '& .MuiClockNumber-root.Mui-disabled': {
                color: theme.palette.grey[300],
              },
              '& .MuiClock-pin': {
                backgroundColor: theme.palette.info.main,
              },
              '& .MuiClockPointer-root': {
                backgroundColor: theme.palette.info.main,
              },
              '& .MuiClockPointer-thumb': {
                backgroundColor: theme.palette.info.main,
                borderColor: theme.palette.info.main,
              },
            }}
          />
        </Popover>

        {helperText && (
          <FormHelperText
            error={error}
            sx={{
              ml: theme.spacing(1.5),
              mt: theme.spacing(0.5),
              fontSize: '12px',
            }}
          >
            {helperText}
          </FormHelperText>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default TimePicker;
