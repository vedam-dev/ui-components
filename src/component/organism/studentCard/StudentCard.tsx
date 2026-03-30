import React from 'react';
import { Box, Typography, IconButton, SxProps, styled, Theme } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export interface StudentCardProps {
  title?: string;
  description?: string;
  scoreTitle?: string;
  percentageTitle?: string;
  attendanceCount: number;
  totalCount: number;
  attendancePercentage: number;
  showNavigateButton?: boolean;
  onNavigate?: () => void;
  sx?: SxProps<Theme>;
}

const CardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(11),
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(7),
  boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.10)',
  width: '100%',
}));

const LeftSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '444px',
});

const Title = styled(Typography)(({ theme }) => ({
  color: (theme as CoreTheme).vd.palette.accentPrimary,
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
}));

const Description = styled(Typography)(() => ({
  color: 'rgba(30, 30, 30, 0.93)',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
}));

const StatsSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(20),
}));

const StatBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  minWidth: '192px',
});

const StatLabel = styled(Typography)(({ theme }) => ({
  color: (theme as CoreTheme).vd.palette.textMuted,
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal',
}));

const StatValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '22px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
}));

const NavigateButton = styled(IconButton)(({ theme }) => ({
  background: (theme as CoreTheme).vd.palette.accentPrimaryLight,
  width: 40,
  height: 40,
  borderRadius: '50%',
  transition: 'all 200ms ease',
  '&:hover': {
    background: (theme as CoreTheme).vd.palette.accentPrimaryLight,
    transform: 'translateX(4px)',
  },
}));

const StudentCard: React.FC<StudentCardProps> = ({
  title = 'Student Attendance',
  description = "Overall student's attendance for this semester",
  scoreTitle = 'Attendance Count',
  percentageTitle = 'Attendance Percentage',
  attendanceCount,
  totalCount,
  attendancePercentage,
  showNavigateButton = false,
  onNavigate,
  sx,
}) => {
  

  const theme = useCoreTheme() as CoreTheme;
  return (
    <CardContainer sx={sx}>
      <LeftSection>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </LeftSection>

      <StatsSection>
        <StatBox>
          <StatLabel>{scoreTitle}</StatLabel>
          <StatValue>
            {attendanceCount}/{totalCount}
          </StatValue>
        </StatBox>

        <StatBox>
          <StatLabel>{percentageTitle}</StatLabel>
          <StatValue>{attendancePercentage}%</StatValue>
        </StatBox>
      </StatsSection>

      <NavigateButton
        onClick={onNavigate}
        aria-label="Navigate"
        sx={{
          visibility: showNavigateButton ? 'visible' : 'hidden',
          pointerEvents: showNavigateButton ? 'auto' : 'none',
        }}
      >
        <ChevronRight sx={{ color: theme.vd.palette.accentPrimary, fontSize: 28 }} />
      </NavigateButton>
    </CardContainer>
  );
};

export default StudentCard;
