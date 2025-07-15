"use client";

import React, { useEffect } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

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

  // Filter out classes that have already passed
  const currentTime = new Date();
  const upcomingEvents = events.filter(event => {
    const classEndTime = parseDateTime(event.date, event.time);
    return classEndTime > currentTime;
  });

  // Always show exactly 4 items
  const displayEvents = upcomingEvents.slice(0, 4);

  // Update component every minute to check for passed classes
  useEffect(() => {
    const interval = setInterval(() => {
      // Force re-render to update the filtered events
      const now = new Date();
      console.log('Checking for passed classes at:', now.toLocaleTimeString());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        maxWidth:'549px',
        borderRadius: '36px',
        p: 3,
        backgroundColor: "background.paper",
        boxShadow: "0px 0px 20px 1px rgba(30, 30, 30, 0.10)",
      }}
    >
      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: 500,
          fontFamily: "Outfit",
          mb: 3,
          ml:'36px',
          color: "text.primary",
        }}
      >
        Calendar
      </Typography>

      <Box sx={{ position: "relative" }}>
        {displayEvents.map((event, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: index === displayEvents.length - 1 ? 0 : 2,
              position: "relative",
            }}
          >
            {/* Date column */}
            <Box
              sx={{
                width: 100,
                pr: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 500,
                  fontFamily: "Poppins",
                  color: "text.secondary",
                }}
              >
                {event.date}
              </Typography>
            </Box>

            {/* Timeline dot with connector */}
            <Box
              sx={{
                position: "relative",
                width: "1.3125rem",
                display: "flex",
                justifyContent: "center",
                zIndex: 2,
                // ml:'25px',
              }}
            >
              {/* Dot */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.0625rem"
                height="1.0625rem"
                viewBox="0 0 21 21"
                fill="none"
              >
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="10"
                  fill="white"
                  stroke="#F97D03"
                />
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="6"
                  fill={index === 0 ? "#F97D03" : "transparent"}
                  stroke="#F97D03"
                />
              </svg>

              {/* Connector Line */}
              {index !== displayEvents.length - 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "1.3125rem",
                    left: "50%",
                    transform: "translateX(-1px)",
                    width: "0.125rem",
                    height: "4.5rem",
                    backgroundImage: `repeating-linear-gradient(to bottom, #F97D03, #F97D03 0.625rem, transparent 0.625rem, transparent 0.875rem)`,
                  }}
                />
              )}
            </Box>

            {/* Subject card */}
            <Box sx={{ flex: 1, ml: '26px' }}>
              <Card
                sx={{
                  width: 355,
                  height: 74,
                  borderRadius: "20px",
                  border: index === 0 ? "2px solid #2196F3" : "1px solid #E1BFFF",
                  backgroundColor: "background.paper",
                  boxShadow: index === 0 ? "0px 2px 8px rgba(33, 150, 243, 0.2)" : "none",
                  mb:'15px'
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    py: 1.5,
                    px: 2,
                    "&:last-child": { pb: 1.5 },
                  }}
                >
                  <Box
                    component="img"
                    src={event.iconUrl}
                    sx={{
                      width: 40,
                      height: 40,
                      mr: 2,
                      objectFit: "contain",
                    }}
                    alt="subject icon"
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: 16,
                        fontFamily: "Poppins",
                        color: "text.primary",
                      }}
                    >
                      {event.subject}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "text.secondary",
                        fontFamily: "Poppins",
                      }}
                    >
                      {event.time}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CalendarTimeline;