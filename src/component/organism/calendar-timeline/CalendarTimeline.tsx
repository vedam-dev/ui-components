"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

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
  const itemHeight = 96;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const newActiveIndex = Math.round(scrollPosition / itemHeight);
      setActiveIndex(getOriginalIndex(newActiveIndex));
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [groupedEvents]);

  return (
    <Box
      sx={{
        width: "549px",
        height: "443px",
        flexShrink: 0,
        borderRadius: "36px",
        background: "#FFF",
        boxShadow: "0px 0px 20px 1px rgba(30, 30, 30, 0.10)",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          height: `${itemHeight * visibleItems}px`,
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#bdbdbd",
            borderRadius: "3px",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          {/* Continuous Purple Timeline Line */}
          <Box
            sx={{
              position: "absolute",
              top: "48px",
              left: "120px",
              width: "2px",
              height: `calc(100% - 96px)`,
              backgroundColor: "#E1BFFF",
              transform: "translateX(-50%)",
            }}
          />

          {renderItems.map((event, index) => (
            <Box
              key={`${event.date}-${index}`}
              sx={{
                display: "flex",
                height: `${itemHeight}px`,
              }}
            >
              {/* Date Column - only show for first event in group */}
              {event.isFirstInGroup && (
                <Box
                  sx={{
                    width: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: "16px",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#4F4F4F",
                      fontFamily: "Poppins",
                      fontSize: "18px",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    {event.date}
                  </Typography>
                </Box>
              )}

              {/* Empty space for date column when not first in group */}
              {!event.isFirstInGroup && <Box sx={{ width: "100px" }} />}

              {/* Timeline Column */}
              <Box
                sx={{
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {/* Only show dot for first event in group */}
                {event.isFirstInGroup && (
                  <Box
                    sx={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      border: "2px solid #F97D03",
                      backgroundColor:
                        index === activeIndex ? "#F97D03" : "#FAF9F6",
                      zIndex: 2,
                    }}
                  />
                )}

                {/* Extend the line for subsequent events in group */}
                {!event.isFirstInGroup && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: "50%",
                      top: 0,
                      height: "100%",
                      width: "2px",
                      backgroundColor: "#E1BFFF",
                      transform: "translateX(-50%)",
                    }}
                  />
                )}
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
                    width: "355px",
                    height: "74px",
                    flexShrink: 0,
                    borderRadius: "20px",
                    border: "1px solid #E1BFFF",
                    background: "#FFF",
                    boxShadow: "none",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      padding: "12px 16px !important",
                    }}
                  >
                    {/* Replaced Avatar with Box for icon display */}
                    <Box
                      component="img"
                      src={event.iconUrl}
                      sx={{
                        width: "40px",
                        height: "40px",
                        marginRight: "16px",
                        objectFit: "contain",
                      }}
                      alt="subject icon"
                    />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          fontSize: "16px",
                          color: "#333",
                          fontFamily: "Poppins",
                        }}
                      >
                        {event.subject}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          fontSize: "14px",
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