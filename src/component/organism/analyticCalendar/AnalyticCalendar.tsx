import React, { useState, useMemo } from 'react';
import { Box, Paper, Typography, styled } from '@mui/material';

export type AttendanceStatus = 'leave' | 'holiday' | 'present' | 'absent';

export interface MonthlyCalendarEvent {
  id?: string | number;
  date: string | Date;
  type?: 'single' | 'range-start' | 'range-middle' | 'range-end';
  status?: AttendanceStatus;
  color?: string;
}

export interface MonthlyCalendarProps {
  events?: MonthlyCalendarEvent[];
  currentDate?: Date;
  onDateClick?: (date: Date) => void;
  sx?: any;
}

const Container = styled(Paper)(() => ({
  overflow: 'hidden',
  boxShadow: 'none',
  backgroundColor: 'white',
  borderRadius: '24px',
  padding: '18px',
  paddingBottom: '0px',
}));

const HeaderWrapper = styled(Box)(() => ({
  borderBottom: '1px solid #C7C7C7',
}));

const HeaderGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '12px',
  paddingBottom: '16px',
  alignItems: 'center',
  minHeight: '76px',
}));

const CalendarGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '12px',
  paddingX: '24px',
  paddingBottom: '24px',
}));

const DayHeader = styled(Box)(() => ({
  color: '#1E1E1E',
  textAlign: 'center',
  fontFamily: 'Outfit',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
}));

const DayCell = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'isToday' &&
    prop !== 'isOtherMonth' &&
    prop !== 'hasEvent' &&
    prop !== 'eventType' &&
    prop !== 'attendanceStatus',
})<{
  isToday?: boolean;
  isOtherMonth?: boolean;
  hasEvent?: boolean;
  eventType?: string;
  attendanceStatus?: AttendanceStatus;
}>(({ isToday, isOtherMonth, hasEvent, eventType, attendanceStatus }) => {
  let backgroundColor = '#F5F5F7';
  let borderRadius = '0px';

  if (isOtherMonth) {
    backgroundColor = 'transparent';
  }

  if (hasEvent && attendanceStatus && !isOtherMonth) {
    switch (attendanceStatus) {
      case 'leave':
        backgroundColor = '#FDEBD9';
        break;
      case 'holiday':
        backgroundColor = '#3870CA26';
        break;
      case 'present':
        backgroundColor = '#42B65724';
        break;
      case 'absent':
        backgroundColor = '#F9D7D7';
        break;
    }
  }

  return {
    backgroundColor,
    borderRadius,
    padding: '20px',
    maxHeight: '80px',
    minWidth: '168px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    cursor: isOtherMonth ? 'default' : 'pointer',
    position: 'relative',
    transition: 'all 0.2s ease',
    ...(!isOtherMonth && {
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      },
    }),
    ...(isToday &&
      !isOtherMonth && {
        outline: '3px solid #FF9500',
        outlineOffset: '-3px',
      }),
  };
});

const DayNumber = styled(Typography)<{ isOtherMonth?: boolean }>(({ isOtherMonth }) => ({
  fontSize: '18px',
  fontWeight: 600,
  color: isOtherMonth ? 'transparent' : '#1E1E1E',
  fontFamily: 'Outfit',
  visibility: isOtherMonth ? 'hidden' : 'visible',
}));

function getDaysInMonth(date: Date): Date[] {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const days: Date[] = [];

  const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;

  for (let i = adjustedStartDay - 1; i >= 0; i--) {
    const prevDate = new Date(year, month, -i);
    days.push(prevDate);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  const remainingDays = 35 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
}

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({
  events = [],
  currentDate = new Date(),
  onDateClick,
  sx,
}) => {
  const [selectedMonth] = useState(currentDate);

  const days = useMemo(() => getDaysInMonth(selectedMonth), [selectedMonth]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, MonthlyCalendarEvent>();
    events.forEach((event) => {
      const eventDate = event.date instanceof Date ? event.date : new Date(event.date);
      const key = `${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`;
      map.set(key, event);
    });
    return map;
  }, [events]);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === selectedMonth.getMonth();
  };

  const getEventForDate = (date: Date) => {
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return eventsByDate.get(key);
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Container sx={sx}>
      <HeaderWrapper>
        <HeaderGrid>
          {weekDays.map((day) => (
            <DayHeader key={day}>{day}</DayHeader>
          ))}
        </HeaderGrid>
      </HeaderWrapper>

      <CalendarGrid>
        {days.map((day, index) => {
          const event = getEventForDate(day);
          const today = isToday(day);
          const otherMonth = !isCurrentMonth(day);

          return (
            <DayCell
              key={index}
              isToday={today}
              isOtherMonth={otherMonth}
              hasEvent={!!event}
              eventType={event?.type}
              attendanceStatus={event?.status}
              onClick={() => !otherMonth && onDateClick?.(day)}
            >
              <DayNumber isOtherMonth={otherMonth}>{day.getDate()}</DayNumber>
            </DayCell>
          );
        })}
      </CalendarGrid>
    </Container>
  );
};

export default MonthlyCalendar;
