'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useCoreTheme, CoreTheme } from '../../../theme/core-theme';
import CalendarTimelineItem from './CalendarTimelineItem';

interface ClassSession {
  date: string;
  time: string;
  subject: string;
  iconUrl: string;
}

interface CalendarTimelineProps {
  events: ClassSession[];
  onViewFullCalendar?: () => void;
}

const CalendarTimeline: React.FC<CalendarTimelineProps> = ({ events, onViewFullCalendar }) => {
  const theme = useCoreTheme() as CoreTheme;
  const [eventsWithStatus, setEventsWithStatus] = useState<
    (ClassSession & { status: 'completed' | 'ongoing' | 'upcoming' })[]
  >([]);

  const parseDateTime = (dateStr: string, timeStr: string, isEndTime: boolean = false): Date => {
    const currentYear = new Date().getFullYear();
    let day: number, month: number, year: number;

    if (dateStr.includes('-') && dateStr.split('-').length === 3) {
      const [yearStr, monthStr, dayStr] = dateStr.split('-');
      year = parseInt(yearStr);
      month = parseInt(monthStr) - 1;
      day = parseInt(dayStr);
    } else {
      const [dayStr, monthStr] = dateStr.split(' ');
      day = parseInt(dayStr);

      const monthMap: { [key: string]: number } = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
      };
      month = monthMap[monthStr];
      year = currentYear;
    }

    const timeToUse = isEndTime ? timeStr.split(' - ')[1] : timeStr.split(' - ')[0];
    const [hours, minutes] = timeToUse.split(':').map(Number);

    return new Date(year, month, day, hours, minutes);
  };

  const determineStatus = (event: ClassSession): 'completed' | 'ongoing' | 'upcoming' => {
    const currentTime = new Date();
    const startTime = parseDateTime(event.date, event.time, false);
    const endTime = parseDateTime(event.date, event.time, true);

    if (currentTime > endTime) {
      return 'completed';
    } else if (currentTime >= startTime && currentTime <= endTime) {
      return 'ongoing';
    } else {
      return 'upcoming';
    }
  };

  const updateStatuses = () => {
    const currentTime = new Date();

    const withStatus = events.map((event) => ({
      ...event,
      status: determineStatus(event),
    }));

    const filtered = withStatus.filter(
      (event) => event.status === 'ongoing' || event.status === 'upcoming'
    );

    // Sort by date and time
    const sorted = filtered.sort((a, b) => {
      const dateA = parseDateTime(a.date, a.time, false);
      const dateB = parseDateTime(b.date, b.time, false);
      return dateA.getTime() - dateB.getTime();
    });

    const topFour = sorted.slice(0, 4);

    setEventsWithStatus(topFour);
  };

  useEffect(() => {
    updateStatuses();

    const interval = setInterval(() => {
      updateStatuses();
    }, 60000);

    return () => clearInterval(interval);
  }, [events]);

  return (
    <Box
      sx={{
        maxWidth: '549px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: theme.spacing(3),
        }}
      >
        <Typography
          sx={{
            fontSize: theme.spacing(6),
            fontWeight: 500,
            color: theme.palette.text.primary,
          }}
        >
          Calendar
        </Typography>

        <Button
          onClick={onViewFullCalendar}
          sx={{
            backgroundColor: 'transparent',
            color: '#8A18FF',
            fontSize: '16px',
            fontWeight: 400,
            textTransform: 'none',
            fontFamily: 'Outfit, sans-serif',
            textDecoration: 'underline',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline',
            },
          }}
        >
          View Full Calendar
        </Button>
      </Box>

      <Box sx={{ position: 'relative' }}>
        {eventsWithStatus.map((event, index) => (
          <CalendarTimelineItem
            key={index}
            event={event}
            index={index}
            isLast={index === eventsWithStatus.length - 1}
            lectureNumber={index + 1}
            eventDate={event.date}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CalendarTimeline;
