'use client';

import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useCoreTheme, CoreTheme } from '../../../theme/core-theme';

interface ClassSession {
  date: string;
  time: string;
  subject: string;
  iconUrl: string;
  status: 'completed' | 'ongoing' | 'upcoming';
}

interface CalendarTimelineItemProps {
  event: ClassSession;
  index: number;
  isLast: boolean;
  lectureNumber: number;
}

const CalendarTimelineItem: React.FC<CalendarTimelineItemProps> = ({
  event,
  isLast,
  lectureNumber,
}) => {
  const theme = useCoreTheme() as CoreTheme;

  const formatTimeToAMPM = (timeRange: string) => {
    const [startTime, endTime] = timeRange.split(' - ');

    const convertTo12Hour = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      const period = hours >= 12 ? 'pm' : 'am';
      const hour12 = hours % 12 || 12;
      return `${hour12}:${minutes.toString().padStart(2, '0')}${period}`;
    };

    return `${convertTo12Hour(startTime)} - ${convertTo12Hour(endTime)}`;
  };

  const renderStatusIcon = () => {
    if (event.status === 'completed') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
        >
          <circle cx="10.5" cy="10.5" r="10" fill="#E6FFE8" stroke="#48742C" />
          <path
            d="M7 10.5L9.5 13L14 8.5"
            stroke="#48742C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    } else if (event.status === 'ongoing') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
        >
          <circle cx="10.5" cy="10.5" r="10" fill="white" stroke="#F97D03" />
          <circle cx="10.5" cy="10.5" r="6" fill="#F97D03" stroke="#F97D03" />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
        >
          <circle cx="10.5" cy="10.5" r="10" fill="white" stroke="#F97D03" />
          <circle cx="10.5" cy="10.5" r="6" fill="transparent" stroke="#F97D03" />
        </svg>
      );
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        minWidth: theme.spacing(32),
        flexShrink: 0,
      }}
    >
      {/* Lecture Number */}
      <Box
        sx={{
          width: theme.spacing(20),
          fontSize: '18px',
          textAlign: 'right',
        }}
      >
        <Typography
          sx={{
            fontSize: theme.spacing(4.5),
            fontWeight: 500,
            color: theme.palette.text.secondary,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',
          }}
        >
          Lecture {lectureNumber}
        </Typography>
      </Box>

      {/* Status Icon with connector */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: theme.spacing(10),
          flexShrink: 0,
        }}
      >
        {renderStatusIcon()}

        {!isLast && (
          <Box
            sx={{
              position: 'absolute',
              top: '21px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: theme.spacing(18),
              backgroundImage: `repeating-linear-gradient(to bottom, #F97D03, #F97D03 10px, transparent 10px, transparent 14px)`,
            }}
          />
        )}
      </Box>

      {/* Subject card */}
      <Box sx={{ flex: 1, ml: theme.spacing(6.5), my: theme.spacing(2.5) }}>
        <Card
          sx={{
            height: theme.spacing(18.5),
            borderRadius: theme.spacing(5),
            border: '1px solid #E8D1FF',
            boxShadow: 'none',
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing(7),
              height: '100%',
              px: theme.spacing(2),
              '&:last-child': { pb: theme.spacing(4) },
            }}
          >
            <Box
              component="img"
              src={event.iconUrl}
              sx={{
                width: theme.spacing(10),
                height: theme.spacing(10),
                ml: theme.spacing(4),
                objectFit: 'contain',
              }}
              alt="subject icon"
            />
            <Box>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: theme.spacing(4),
                  color: 'text.primary',
                }}
              >
                {event.subject}
              </Typography>
              <Typography
                sx={{
                  fontSize: theme.spacing(3.5),
                  fontWeight: 500,
                  color: 'text.secondary',
                }}
              >
                {formatTimeToAMPM(event.time)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CalendarTimelineItem;
