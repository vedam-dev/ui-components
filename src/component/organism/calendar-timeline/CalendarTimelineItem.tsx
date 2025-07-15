"use client";

import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { useCoreTheme } from '../../../theme/core-theme';

interface ClassSession {
  date: string;
  time: string;
  subject: string;
  iconUrl: string;
}

interface CalendarTimelineItemProps {
  event: ClassSession;
  index: number;
  isLast: boolean;
  isFirst: boolean;
}

const CalendarTimelineItem: React.FC<CalendarTimelineItemProps> = ({
  event,
  index,
  isLast,
  isFirst,
}) => {
  const theme = useCoreTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: isLast ? 0 : 2,
        position: "relative",
      }}
    >
      {/* Date column */}
      <Box
        sx={{
          ml: theme.spacing(8),
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: theme.spacing(4.5),
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
          display: "flex",
          justifyContent: "center",
          zIndex: 2,
          ml: theme.spacing(5),
        }}
      >
        {/* Dot */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
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
            fill={isFirst ? "#F97D03" : "transparent"}
            stroke="#F97D03"
          />
        </svg>

        {/* Connector Line */}
        {!isLast && (
          <Box
            sx={{
              position: "absolute",
              top: theme.spacing(5.5),
              left: "50%",
              transform: "translateX(-1px)",
              width: theme.spacing(0.5),
              height: theme.spacing(18),
              backgroundImage: `repeating-linear-gradient(to bottom, #F97D03, #F97D03 0.625rem, transparent 0.625rem, transparent 0.875rem)`,
            }}
          />
        )}
      </Box>

      {/* Subject card */}
      <Box sx={{ flex: 1, ml: theme.spacing(6.5) }}>
        <Card
          sx={{
            height: theme.spacing(18.5),
            borderRadius: theme.spacing(5),
            border: isFirst ? "1px solid #2196F3" : "1px solid #E1BFFF",
            backgroundColor: "background.paper",
            boxShadow: isFirst ? "0px 2px 8px rgba(33, 150, 243, 0.2)" : "none",
            mb: theme.spacing(3.75),
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(7),
              height: "100%",
              px: theme.spacing(2),
              "&:last-child": { pb: theme.spacing(4) },
            }}
          >
            <Box
              component="img"
              src={event.iconUrl}
              sx={{
                width: theme.spacing(10),
                height: theme.spacing(10),
                ml: theme.spacing(4),
                objectFit: "contain",
              }}
              alt="subject icon"
            />
            <Box>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: theme.spacing(4),
                  fontFamily: "Inter",
                  color: "text.primary",
                }}
              >
                {event.subject}
              </Typography>
              <Typography
                sx={{
                  fontSize: theme.spacing(3.5),
                  fontWeight: 500,
                  color: "text.secondary",
                  fontFamily: "Inter",
                }}
              >
                {event.time}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CalendarTimelineItem;