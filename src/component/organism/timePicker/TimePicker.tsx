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
  const [tempValue, setTempValue] = useState<Dayjs | null>(null);

  // Convert Date to Dayjs
  const dayjsValue = value ? dayjs(value) : null;
  const dayjsMinTime = minTime ? dayjs(minTime) : undefined;
  const dayjsMaxTime = maxTime ? dayjs(maxTime) : undefined;

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      setTempValue(dayjsValue); // Store current value as temporary value
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (newValue: Dayjs | Date | null) => {
    // Convert Date to Dayjs if needed
    const dayjsValue = newValue ? (newValue instanceof Date ? dayjs(newValue) : newValue) : null;
    setTempValue(dayjsValue);
  };

  const handleAccept = () => {
    if (onChange && tempValue) {
      onChange(tempValue.toDate());
    }
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
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
          onClose={handleCancel}
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
                overflow: 'hidden',
                ...popoverSx,
              },
            },
          }}
        >
          <Box>
            <StaticTimePicker
              value={tempValue}
              onChange={handleChange}
              onAccept={handleAccept}
              onClose={handleCancel}
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
          </Box>
        </Popover>
      </Box>
    </LocalizationProvider>
  );
};

export default TimePicker;
