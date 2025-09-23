import React, { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  styled,
  Tooltip,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";

export interface CalendarEvent {
  id?: string | number;
  start: string | Date;
  end?: string | Date;
  name: string;
  description?: string;
  isImportant?: boolean;
}

export interface ReusableCalendarProps {
  events: CalendarEvent[];
  weekStart?: Date;
  onEventClick?: (ev: CalendarEvent) => void;
  onWeekChange?: (newWeekStart: Date) => void;
  sx?: SxProps<Theme>;
}

const Container = styled(Paper)(({ theme }) => ({
  padding: 0,
  overflow: "hidden",
  width: "80%",

  boxShadow: "none",
  backgroundColor: "white",
}));

const CalendarGrid = styled(Box)(({ theme }) => ({
  borderRadius: "24px",
  display: "grid",
  gridTemplateColumns: "100px repeat(7, 1fr)",
}));

const DayHeader = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #E8E9EA",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  minHeight: 60,
}));

const TimeSlot = styled(Box)(({ theme }) => ({
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center", // Changed to center to better fit narrower width
  fontWeight: 600,
  color: "#1E1E1E",
  fontFamily: "Outfit",
  fontSize: "16px", // Slightly smaller font for narrower space
  fontStyle: "normal",
  lineHeight: "normal",
  minHeight: 72,
  padding: theme.spacing(1),
}));

const DayCell = styled(Box)(({ theme }) => ({
  minHeight: 72,
  position: "relative",
}));

const EventCard = styled(Box, {
  shouldForwardProp: (p) => p !== "important" && p !== "eventType",
})<{
  important?: boolean;
  eventType?: string;
}>(({ theme, important, eventType }) => {
  let backgroundColor = "#F3F4F6";
  let borderColor = "#E5E7EB";
  let textColor = "#374151";
  let borderLeftWidth = "2px";

  if (eventType === "exam") {
    backgroundColor = "#FFF3EB";
    borderColor = "#FF7829";
    textColor = "#1E40AF";
    borderLeftWidth = "4px";
  } else if (eventType === "contest") {
    backgroundColor = "#EBF4FF";
    borderColor = "#1E40AF";
    textColor = "#1E40AF";
    borderLeftWidth = "4px";
  } else if (important) {
    backgroundColor = "#FEE2E2";
    borderColor = "#EF4444";
    textColor = "#DC2626";
    borderLeftWidth = "4px";
  }

  return {
    position: "absolute",
    left: 4,
    right: 4,
    borderRadius: 12,
    padding: theme.spacing(1, 1.5),
    backgroundColor,
    border: `1px solid ${borderColor}`,
    borderLeft: `${borderLeftWidth} solid ${borderColor}`,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    zIndex: 2,
    minHeight: 48,
    fontSize: "13px",
    fontWeight: 600,
    color: textColor,
    boxShadow: "0 2px 8px rgba(22, 27, 33, 0.06)",
    "&:hover": {
      opacity: 0.9,
      boxShadow: `0 4px 12px rgba(0,0,0,0.15)`,
    },
  };
});

const SemesterPill = styled(Box)(({ theme }) => ({
  color: "#8A18FF",
  padding: theme.spacing(1, 2), // Reduced padding for narrower column
  fontWeight: 600,
  fontSize: "16px", // Slightly smaller font
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid #E8E9EA",
  textAlign: "center",
  wordWrap: "break-word",
}));

function startOfWeek(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

function toDate(d: string | Date) {
  return d instanceof Date ? new Date(d) : new Date(d);
}

const HOURS_START = 8;
const HOURS_END = 18;
const HOUR_HEIGHT = 72;

const ReusableCalendar: React.FC<ReusableCalendarProps> = ({
  events,
  weekStart,
  onEventClick,
  onWeekChange,
  sx,
}) => {
  const theme = useTheme();
  const [start, setStart] = useState<Date>(
    weekStart ? startOfWeek(weekStart) : startOfWeek(new Date())
  );

  // Update internal state when weekStart prop changes
  React.useEffect(() => {
    if (weekStart) {
      const newStart = startOfWeek(weekStart);
      setStart(newStart);
    }
  }, [weekStart]);

  const days = useMemo(() => {
    const arr: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, [start]);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const ev of events) {
      const s = toDate(ev.start);
      const key = `${s.getFullYear()}-${s.getMonth()}-${s.getDate()}`;
      const list = map.get(key) || [];
      list.push(ev);
      map.set(key, list);
    }
    return map;
  }, [events]);

  function formatDayNumber(d: Date) {
    return d.getDate().toString().padStart(2, "0");
  }

  function formatMonth(d: Date) {
    return d.toLocaleString(undefined, { month: "long" });
  }

  function getEventType(event: CalendarEvent): string {
    const name = event.name.toLowerCase();
    if (name.includes("exam")) return "exam";
    if (name.includes("contest")) return "contest";
    return "regular";
  }

  function getTopAndHeight(startDt: Date, endDt: Date) {
    const startHours = startDt.getHours() + startDt.getMinutes() / 60;
    const endHours = endDt.getHours() + endDt.getMinutes() / 60;

    const startSlot = Math.max(0, startHours - HOURS_START);
    const endSlot = Math.min(HOURS_END - HOURS_START, endHours - HOURS_START);

    const top = startSlot * HOUR_HEIGHT + 8;
    const height = Math.max(40, (endSlot - startSlot) * HOUR_HEIGHT - 8);

    return { top, height };
  }

  const timeSlots = Array.from({ length: HOURS_END - HOURS_START }, (_, i) => {
    const hour = HOURS_START + i;
    return hour < 12 ? `${hour} AM` : `${hour === 12 ? 12 : hour - 12} PM`;
  });

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <Container sx={sx}>
      <CalendarGrid>
        <SemesterPill>Semester 1</SemesterPill>

        {/* Day headers */}
        {days.map((day, index) => (
          <DayHeader key={index}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                color: isToday(day) ? "#8A18FF" : "#1E1E1E",
                lineHeight: "normal",
                px: "35px",
                py: "26px",
              }}
            >
              {formatDayNumber(day)}, {formatMonth(day)}
            </Typography>
          </DayHeader>
        ))}

        {/* Time slots and day cells */}
        {timeSlots.map((timeLabel, timeIndex) => (
          <React.Fragment key={timeIndex}>
            <TimeSlot>
              <Typography
                sx={{ fontSize: "16px", fontWeight: 600, color: "#1E1E1E" }}
              >
                {timeLabel}
              </Typography>
            </TimeSlot>
            {days.map((day, dayIndex) => {
              const dayKey = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;
              const dayEvents = eventsByDay.get(dayKey) || [];
              const hourStart = HOURS_START + timeIndex;
              const hourEnd = hourStart + 1;

              const eventsInThisHour = dayEvents.filter((ev) => {
                const eventStart = toDate(ev.start);
                const eventHour = eventStart.getHours();
                return eventHour >= hourStart && eventHour < hourEnd;
              });

              return (
                <DayCell key={`${timeIndex}-${dayIndex}`}>
                  {eventsInThisHour.map((event) => {
                    const eventStart = toDate(event.start);
                    const eventEnd = toDate(
                      event.end ??
                        new Date(eventStart.getTime() + 60 * 60 * 1000)
                    );
                    const { top, height } = getTopAndHeight(
                      eventStart,
                      eventEnd
                    );
                    const eventType = getEventType(event);

                    return (
                      <Tooltip
                        key={event.id ?? event.name}
                        title={event.description || event.name}
                        arrow
                      >
                        <EventCard
                          eventType={eventType}
                          important={event.isImportant}
                          onClick={() => onEventClick?.(event)}
                          sx={{
                            top: top - timeIndex * HOUR_HEIGHT,
                            height: height,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 600,
                              lineHeight: 1.2,
                              color: "#3870CA",
                            }}
                          >
                            {event.name}
                          </Typography>
                          {event.description && (
                            <Typography
                              sx={{
                                fontSize: "16px",
                                lineHeight: "normal",
                                fontWeight: 400,
                                mt: 0.25,
                              }}
                            >
                              {event.description}
                            </Typography>
                          )}
                        </EventCard>
                      </Tooltip>
                    );
                  })}
                </DayCell>
              );
            })}
          </React.Fragment>
        ))}
      </CalendarGrid>
    </Container>
  );
};

export default ReusableCalendar;
