"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Card, CardContent, useTheme } from "@mui/material";

interface ClassSession {
  date: string;
  time: string;
  subject: string;
  iconUrl: string;
}

interface CalendarTimelineProps {
  events: ClassSession[];
  visibleItems?: number;
}

const CalendarTimeline: React.FC<CalendarTimelineProps> = ({
  events,
  visibleItems = 4,
}) => {
  const theme = useTheme();
  const itemHeight = 96;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeDate, setActiveDate] = useState<string | null>(null);

  // Style constants
  const styles = {
    outerBox: {
      width: 549,
      height: 443,
      borderRadius: '36px',
      p: 3,
      boxShadow: "0px 0px 20px 1px rgba(30, 30, 30, 0.10)",
    },
    dateColumn: {
      width: 100,
      pr: 2,
    },
    timelineColumn: {
      width: 40,
    },
    subjectCard: {
      width: 355,
      height: 74,
      borderRadius: '20px',
      border: "1px solid #E1BFFF",
    },
    icon: {
      size: 40,
      mr: 2,
    },
  };

  // Group events by date
  const groupedEvents = events.reduce((acc, event) => {
    const dateGroup = acc.find(group => group.date === event.date);
    if (dateGroup) {
      dateGroup.events.push(event);
    } else {
      acc.push({ date: event.date, events: [event] });
    }
    return acc;
  }, [] as { date: string; events: ClassSession[] }[]);

  // Flatten grouped events for rendering while maintaining date grouping
  const renderItems = groupedEvents.flatMap((group, groupIndex) => {
    return group.events.map((event, eventIndex) => ({
      ...event,
      isFirstInGroup: eventIndex === 0,
      isLastInGroup: eventIndex === group.events.length - 1,
      groupIndex,
    }));
  });

  // Calculate the actual index mapping for active item detection
  const getOriginalIndex = (scrollIndex: number) => {
    let count = 0;
    for (let i = 0; i < groupedEvents.length; i++) {
      if (scrollIndex < count + groupedEvents[i].events.length) {
        return scrollIndex;
      }
      count += groupedEvents[i].events.length;
    }
    return scrollIndex;
  };

  // Scroll to the first event of the selected date
  const handleDateClick = (date: string, groupIndex: number) => {
    setActiveDate(date);
    const firstEventIndex = renderItems.findIndex(
      item => item.date === date && item.isFirstInGroup
    );
    if (firstEventIndex >= 0 && containerRef.current) {
      containerRef.current.scrollTo({
        top: firstEventIndex * itemHeight,
        behavior: 'smooth'
      });
      setActiveIndex(firstEventIndex);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const newActiveIndex = Math.round(scrollPosition / itemHeight);
      setActiveIndex(getOriginalIndex(newActiveIndex));
      
      // Update active date based on scroll position
      if (renderItems[newActiveIndex]) {
        setActiveDate(renderItems[newActiveIndex].date);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [groupedEvents]);

  return (
    <Box
      sx={{
        ...styles.outerBox,
        backgroundColor: "background.paper",
        boxSizing: "border-box",
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          height: itemHeight * visibleItems,
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: theme.spacing(0.75) },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.grey[400],
            borderRadius: theme.spacing(0.375),
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          {/* Continuous Timeline Line */}
          <Box
            sx={{
              position: "absolute",
              top: itemHeight / 2,
              left: styles.dateColumn.width + styles.timelineColumn.width / 2,
              width: 2,
              height: `calc(100% - ${itemHeight}px)`,
              backgroundColor: "#E1BFFF",
              transform: "translateX(-50%)",
            }}
          />

          {renderItems.map((event, index) => (
            <Box
              key={`${event.date}-${index}`}
              sx={{
                display: "flex",
                height: itemHeight,
              }}
            >
              {/* Date Column - only show for first event in group */}
              {event.isFirstInGroup && (
                <Box
                  sx={{
                    ...styles.dateColumn,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                  onClick={() => handleDateClick(event.date, event.groupIndex)}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: activeDate === event.date ? "#7B2CBF" : "text.secondary",
                      fontFamily: "Poppins",
                      fontSize: 18,
                      fontWeight: activeDate === event.date ? 600 : 500,
                      lineHeight: "normal",
                    }}
                  >
                    {event.date}
                  </Typography>
                </Box>
              )}

              {/* Empty space for date column when not first in group */}
              {!event.isFirstInGroup && (
                <Box sx={{ width: styles.dateColumn.width }} />
              )}

              {/* Timeline Column */}
              <Box
                sx={{
                  ...styles.timelineColumn,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {/* Dot and Connector Line */}
                <Box
                  sx={{
                    position: "relative",
                    width: "1.3125rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {/* Dot - show for all items */}
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
                      stroke={activeDate === event.date ? "#7B2CBF" : "#E0E0E0"}
                    />
                    <circle
                      cx="10.5"
                      cy="10.5"
                      r="6"
                      fill={activeDate === event.date ? "#F97D03" : "#E0E0E0"}
                      stroke={activeDate === event.date ? "#F97D03" : "#E0E0E0"}
                    />
                  </svg>

               {/* Connector Line - show for all items except last in last group */}
{(index < renderItems.length - 1) && (
  <Box
    sx={{
      position: "absolute",
      top: "1.3125rem",
      left: "50%",
      transform: "translateX(-1px)",
      width: "0.125rem",
      height: `${itemHeight - 21}px`,
      backgroundImage:
        activeDate === event.date || (activeDate && renderItems.findIndex(item => item.date === activeDate) < index)
          ? `repeating-linear-gradient(to bottom, #F97D03, #F97D03 0.625rem, transparent 0.625rem, transparent 0.875rem)`
          : `repeating-linear-gradient(to bottom, #E0E0E0, #E0E0E0 0.625rem, transparent 0.625rem, transparent 0.875rem)`,
      transition: "all 0.3s ease",
      backgroundColor: "transparent", 
    }}
  />
)}
                </Box>
              </Box>

              {/* Subject Card */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Card
                  sx={{
                    ...styles.subjectCard,
                    backgroundColor: activeDate === event.date ? "#F8F1FF" : "background.paper",
                    boxShadow: "none",
                    transition: theme.transitions.create(["box-shadow", "background-color"]),
                    "&:hover": {
                      boxShadow: theme.shadows[2],
                    },
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
                        width: styles.icon.size,
                        height: styles.icon.size,
                        mr: styles.icon.mr,
                        objectFit: "contain",
                      }}
                      alt="subject icon"
                    />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          fontSize: 16,
                          color: "text.primary",
                          fontFamily: "Poppins",
                        }}
                      >
                        {event.subject}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: 14,
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
    </Box>
  );
};

export default CalendarTimeline;