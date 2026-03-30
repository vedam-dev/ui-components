import React from 'react';
import { Box, Typography, IconButton, SxProps, styled, Theme } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export interface AttendanceSummaryCardProps {
  keyTitle?: string;
  valueTitle?: string;
  averageAttendanceMin?: number;
  averageAttendanceMax?: number;
  currentStudents: number;
  totalStudents: number;
  showNavigateButton?: boolean;
  onNavigate?: () => void;
  sx?: SxProps<Theme>;
}

const CardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(5.5, 15),
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(6),
  boxShadow: '0 0 10px 1px rgba(0, 0, 0, 0.10)',
  width: '100%',
  gap: theme.spacing(4),
}));

const StatsSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(25),
  flex: 1,
}));

const StatBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const StatLabel = styled(Typography)(({ theme }) => ({
  color: (theme as CoreTheme).vd.palette.textMuted,
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal',
}));

const StatValue = styled(Typography)(({ theme }) => ({
  color: (theme as CoreTheme).vd.palette.accentPrimary,
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
}));

const StatValueSecondary = styled(Typography)(() => ({
  color: '#000',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
}));

const NavigateButton = styled(IconButton)(({ theme }) => ({
  background: (theme as CoreTheme).vd.palette.accentPrimaryLight,
  width: 40,
  height: 40,
  borderRadius: '50%',
  flexShrink: 0,
  transition: 'all 200ms ease',
  '&:hover': {
    background: '#DDB8FF',
    transform: 'translateX(4px)',
  },
}));

const AttendanceSummaryCard: React.FC<AttendanceSummaryCardProps> = ({
  keyTitle = 'Average Attendance',
  valueTitle = 'Number of Students',
  averageAttendanceMin = 81,
  averageAttendanceMax = 100,
  currentStudents,
  totalStudents,
  showNavigateButton = true,
  onNavigate,
  sx,
}) => {
  

  const theme = useCoreTheme() as CoreTheme;
  return (
    <CardContainer sx={sx}>
      <StatsSection>
        <StatBox>
          <StatLabel>{keyTitle}</StatLabel>
          <StatValue>
            {averageAttendanceMin}% - {averageAttendanceMax}%
          </StatValue>
        </StatBox>

        <StatBox>
          <StatLabel>{valueTitle}</StatLabel>
          <StatValueSecondary>
            {currentStudents}/{totalStudents}
          </StatValueSecondary>
        </StatBox>
      </StatsSection>

      {showNavigateButton && (
        <NavigateButton onClick={onNavigate} aria-label="Navigate">
          <ChevronRight sx={{ color: theme.vd.palette.accentPrimary, fontSize: 28 }} />
        </NavigateButton>
      )}
    </CardContainer>
  );
};

export default AttendanceSummaryCard;
