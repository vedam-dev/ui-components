import React, { useMemo, useState } from 'react';
import { Box, Paper, Typography, styled, Tooltip, SxProps, Theme } from '@mui/material';

export interface CalendarEvent {
  id?: string | number;
  start: string | Date;
  end?: string | Date;
  name: string;
  description?: string;
  isImportant?: boolean;
  color?: string;
  borderColor?: string;
}

export interface ReusableCalendarProps {
  events: CalendarEvent[];
  weekStart?: Date;
  semesterName?: string;
  onEventClick?: (ev: CalendarEvent) => void;
  onWeekChange?: (newWeekStart: Date) => void;
  sx?: SxProps<Theme>;
}

const Container = styled(Paper)(() => ({
  padding: 0,
  overflow: 'hidden',
  boxShadow: 'none',
  backgroundColor: 'white',
}));

const CalendarGrid = styled(Box)(() => ({
  borderRadius: '24px',
  display: 'grid',
  gridTemplateColumns: '100px repeat(7, 1fr)',
}));

const DayHeader = styled(Box)(() => ({
  borderBottom: '1px solid #E8E9EA',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 60,
}));

const TimeSlot = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 600,
  color: '#1E1E1E',
  fontSize: '18px',
  fontStyle: 'normal',
  lineHeight: 'normal',
  minHeight: 72,
  position: 'relative',
}));

const DayCell = styled(Box)(() => ({
  minHeight: 72,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: '1px',
    backgroundColor: '#E8E9EA',
    zIndex: 1,
  },
}));

const EventCard = styled(Box, {
  shouldForwardProp: (p) =>
    p !== 'important' && p !== 'eventType' && p !== 'customColor' && p !== 'customBorderColor',
})<{
  important?: boolean;
  eventType?: string;
  customColor?: string;
  customBorderColor?: string;
  event_index?: number;
  total_events?: number;
}>(({
  theme,
  important,
  eventType,
  customColor,
  customBorderColor,
  event_index = 0,
  total_events = 1,
}) => {
  const widthPercentage = 96 / total_events;
  const leftPosition = event_index * widthPercentage;
  const width = `${widthPercentage}%`;

  // If custom color is provided, use it
  if (customColor || customBorderColor) {
    const bgColor = customColor || '#F2F2F2';
    const borderColor = customBorderColor || customColor || '#E5E7EB';

    return {
      position: 'absolute',
      left: `${leftPosition}%`,
      width: width,
      borderRadius: 12,
      padding: theme.spacing(1, 1.5),
      backgroundColor: bgColor,
      borderLeft: `4px solid ${borderColor}`,
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      zIndex: 2,
      fontSize: '13px',
      fontWeight: 600,
      color: customColor ? '#FFFFFF' : '#374151',
      boxShadow: '0 2px 8px rgba(22, 27, 33, 0.06)',
      marginLeft: '2px',
      marginRight: '2px',
      '&:hover': {
        opacity: 0.9,
        boxShadow: `0 4px 12px rgba(0,0,0,0.15)`,
      },
    };
  }

  // Default color logic
  let backgroundColor = '#F2F2F2';
  let borderColor = '#E5E7EB';
  let textColor = '#374151';
  let borderLeftWidth = '4px';

  if (eventType === 'exam') {
    backgroundColor = '#FFF3EB';
    borderColor = '#FF7829';
    textColor = '#1E40AF';
    borderLeftWidth = '4px';
  } else if (eventType === 'contest') {
    backgroundColor = '#EBF4FF';
    borderColor = '#1E40AF';
    textColor = '#1E40AF';
    borderLeftWidth = '4px';
  } else if (important) {
    backgroundColor = '#FEE2E2';
    borderColor = '#EF4444';
    textColor = '#DC2626';
    borderLeftWidth = '4px';
  }

  return {
    position: 'absolute',
    left: `${leftPosition}%`,
    width: width,
    borderRadius: 12,
    padding: theme.spacing(1, 1.5),
    backgroundColor,
    borderLeft: `${borderLeftWidth} solid ${borderColor}`,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 2,
    fontSize: '13px',
    fontWeight: 600,
    color: textColor,
    boxShadow: '0 2px 8px rgba(22, 27, 33, 0.06)',
    marginLeft: '2px',
    marginRight: '2px',
    '&:hover': {
      opacity: 0.9,
      boxShadow: `0 4px 12px rgba(0,0,0,0.15)`,
    },
  };
});

const SemesterPill = styled(Box)(({ theme }) => ({
  color: '#8A18FF',
  padding: theme.spacing(1, 1),
  fontWeight: 600,
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '1px solid #E8E9EA',
  textAlign: 'center',
  wordWrap: 'break-word',
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

// Helper function to check if two events overlap
function eventsOverlap(eventA: CalendarEvent, eventB: CalendarEvent): boolean {
  const startA = toDate(eventA.start).getTime();
  const endA = toDate(eventA.end ?? new Date(startA + 60 * 60 * 1000)).getTime();
  const startB = toDate(eventB.start).getTime();
  const endB = toDate(eventB.end ?? new Date(startB + 60 * 60 * 1000)).getTime();

  return startA < endB && startB < endA;
}

// Function to group overlapping events
function groupOverlappingEvents(events: CalendarEvent[]): CalendarEvent[][] {
  const groups: CalendarEvent[][] = [];
  const sortedEvents = [...events].sort((a, b) => {
    return toDate(a.start).getTime() - toDate(b.start).getTime();
  });

  for (const event of sortedEvents) {
    let placed = false;

    for (const group of groups) {
      // Check if event overlaps with any event in the group
      const overlapsWithGroup = group.some((groupEvent) => eventsOverlap(event, groupEvent));

      if (overlapsWithGroup) {
        group.push(event);
        placed = true;
        break;
      }
    }

    if (!placed) {
      groups.push([event]);
    }
  }

  return groups;
}

const ReusableCalendar: React.FC<ReusableCalendarProps> = ({
  events,
  weekStart,
  semesterName = 'Semester 1',
  onEventClick,
  onWeekChange: _onWeekChange,
  sx,
}) => {
  const [start, setStart] = useState<Date>(
    weekStart ? startOfWeek(weekStart) : startOfWeek(new Date())
  );

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

    // Group overlapping events for each day
    map.forEach((eventList, key) => {
      const overlappingGroups = groupOverlappingEvents(eventList);

      // Flatten the groups but mark each event with its group info
      const flattenedEvents: CalendarEvent[] = [];
      overlappingGroups.forEach((group, groupIndex) => {
        group.forEach((event, event_index) => {
          // Add group metadata to the event
          const eventWithMeta = {
            ...event,
            _groupId: groupIndex,
            _event_indexInGroup: event_index,
            _totalInGroup: group.length,
          };
          flattenedEvents.push(eventWithMeta);
        });
      });

      map.set(key, flattenedEvents);
    });

    return map;
  }, [events]);

  function formatDayNumber(d: Date) {
    return d.getDate().toString().padStart(2, '0');
  }

  function formatMonth(d: Date) {
    return d.toLocaleString(undefined, { month: 'long' }).substring(0, 3);
  }

  function formatTime(d: Date) {
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm}`;
  }

  function getEventType(event: CalendarEvent): string {
    const name = event.name.toLowerCase();
    if (name.includes('exam')) return 'exam';
    if (name.includes('contest')) return 'contest';
    return 'regular';
  }

  function getTopAndHeight(startDt: Date, endDt: Date) {
    const startHours = startDt.getHours() + startDt.getMinutes() / 60;
    const endHours = endDt.getHours() + endDt.getMinutes() / 60;

    const startSlot = Math.max(0, startHours - HOURS_START);
    const endSlot = Math.min(HOURS_END - HOURS_START, endHours - HOURS_START);

    const top = startSlot * HOUR_HEIGHT + 40;
    const durationInHours = endSlot - startSlot;
    const minHeight = durationInHours <= 0.5 ? 28 : 40;
    const height = Math.max(minHeight, (endSlot - startSlot) * HOUR_HEIGHT - 8);

    return { top, height };
  }

  function getTooltipContent(event: CalendarEvent) {
    const eventStart = toDate(event.start);
    const eventEnd = toDate(event.end ?? new Date(eventStart.getTime() + 60 * 60 * 1000));

    const startTime = formatTime(eventStart);
    const endTime = formatTime(eventEnd);

    let firstLine = event.name;
    if (event.description) {
      firstLine += ` ${event.description}`;
    }

    return (
      <>
        <div>{firstLine}</div>
        <div>
          {startTime} - {endTime}
        </div>
      </>
    );
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
        <SemesterPill>{semesterName}</SemesterPill>

        {days.map((day, index) => (
          <DayHeader key={index}>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: 600,
                color: isToday(day) ? '#8A18FF' : '#1E1E1E',
                lineHeight: 'normal',
                px: '35px',
                py: '26px',
              }}
            >
              {formatDayNumber(day)}, {formatMonth(day)}
            </Typography>
          </DayHeader>
        ))}

        {timeSlots.map((timeLabel, timeIndex) => (
          <React.Fragment key={timeIndex}>
            <TimeSlot>
              <Typography sx={{ fontSize: '18px', fontWeight: 600, color: '#1E1E1E' }}>
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
                      event.end ?? new Date(eventStart.getTime() + 60 * 60 * 1000)
                    );
                    const { top, height } = getTopAndHeight(eventStart, eventEnd);
                    const eventType = getEventType(event);

                    // Get group info from the event metadata
                    const groupId = (event as any)._groupId || 0;
                    const event_indexInGroup = (event as any)._event_indexInGroup || 0;
                    const totalInGroup = (event as any)._totalInGroup || 1;

                    return (
                      <Tooltip key={event.id ?? event.name} title={getTooltipContent(event)} arrow>
                        <EventCard
                          eventType={eventType}
                          important={event.isImportant}
                          customColor={event.color}
                          customBorderColor={event.borderColor}
                          event_index={event_indexInGroup}
                          total_events={totalInGroup}
                          onClick={() => onEventClick?.(event)}
                          sx={{
                            top: top - timeIndex * HOUR_HEIGHT,
                            height: height,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '16px',
                              fontWeight: 600,
                              lineHeight: 1.2,
                              color: event.color ? '#FFFFFF' : '#3870CA',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {event.name}
                          </Typography>
                          {event.description && (
                            <Typography
                              sx={{
                                fontSize: '16px',
                                lineHeight: 'normal',
                                fontWeight: 400,
                                mt: 0.25,
                                color: event.color ? '#FFFFFF' : 'inherit',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
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
