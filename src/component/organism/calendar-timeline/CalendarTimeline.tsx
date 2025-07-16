"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
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
}

const CalendarTimeline: React.FC<CalendarTimelineProps> = ({
  events,
}) => {
  const theme = useCoreTheme() as CoreTheme;
  const [displayEvents, setDisplayEvents] = useState<ClassSession[]>([]);

  // Parse date and time to check if class has passed
  const parseDateTime = (dateStr: string, timeStr: string): Date => {
    const currentYear = new Date().getFullYear();
    const [day, month] = dateStr.split(' ');
    const monthMap: { [key: string]: number } = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    
    // Get end time from the time range (e.g., "10:30 - 12:30" -> "12:30")
    const endTime = timeStr.split(' - ')[1];
    const [hours, minutes] = endTime.split(':').map(Number);
    
    return new Date(currentYear, monthMap[month], parseInt(day), hours, minutes);
  };

  // Filter and update display events
  const updateDisplayEvents = () => {
    const currentTime = new Date();
    const upcomingEvents = events.filter(event => {
      const classEndTime = parseDateTime(event.date, event.time);
      return classEndTime > currentTime;
    });

    // Always show exactly 4 items
    setDisplayEvents(upcomingEvents.slice(0, 4));
  };

  // Update component every minute to check for passed classes
  useEffect(() => {
    updateDisplayEvents();
    
    const interval = setInterval(() => {
      console.log('Checking for passed classes at:', new Date().toLocaleTimeString());
      updateDisplayEvents();
    }, 60000); 

    return () => clearInterval(interval);
  }, [events]);

  return (
    <Box
      sx={{
        maxWidth: '549px',
        borderRadius: theme.spacing(9),
        p: theme.spacing(3),
        boxShadow: theme.pbl.shadows.y12,

      }}
    >
      <Typography
        sx={{
          fontSize: theme.spacing(6),
          fontWeight: 500,
          fontFamily: "Outfit",
          mb: theme.spacing(3),
          ml: theme.spacing(9),
          color: theme.palette.text.primary
        }}
      >
        Calendar
      </Typography>

      <Box sx={{ position: "relative" }}>
        {displayEvents.map((event, index) => (
          <CalendarTimelineItem
            key={index}
            event={event}
            index={index}
            isLast={index === displayEvents.length - 1}
            isFirst={index === 0}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CalendarTimeline;