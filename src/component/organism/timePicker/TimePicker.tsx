import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { Box, IconButton, Tooltip } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import { useCoreTheme, CoreTheme } from '../../../theme/core-theme';
import dayjs, { Dayjs } from 'dayjs';
import Popover from '@mui/material/Popover';

export interface TimePickerProps {
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  format?: '12h' | '24h';
  disabled?: boolean;
  minTime?: Date;
  maxTime?: Date;
  sx?: object;
  name?: string;
  tooltip?: string;
  popoverSx?: object;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  format = '12h',
  disabled = false,
  minTime,
  maxTime,
  sx,
  name,
  tooltip = 'Select time',
  popoverSx,
}) => {
  const theme = useCoreTheme() as CoreTheme;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // Convert Date to Dayjs
  const dayjsValue = value ? dayjs(value) : null;
  const dayjsMinTime = minTime ? dayjs(minTime) : undefined;
  const dayjsMaxTime = maxTime ? dayjs(maxTime) : undefined;

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'inline-flex', ...sx }}>
        <Tooltip title={tooltip}>
          <IconButton
            name={name}
            onClick={handleOpen}
            disabled={disabled}
            sx={{
              color: disabled ? theme.palette.grey[400] : theme.palette.info.main,
              '&:hover': {
                backgroundColor: disabled ? 'transparent' : 'rgba(0, 0, 0, 0.04)',
              },
              '&.Mui-disabled': {
                color: theme.palette.grey[400],
              },
              ...sx,
            }}
            aria-label="Select time"
          >
            <AccessTime />
          </IconButton>
        </Tooltip>

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
                mt: 3,
                borderRadius: theme.spacing(4),
                ...popoverSx,
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
      </Box>
    </LocalizationProvider>
  );
};

export default TimePicker;
