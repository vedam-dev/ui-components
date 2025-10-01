import React from 'react';
import { Box, Typography, IconButton, SxProps, styled, Theme } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export interface StudentCardProps {
  title?: string;
  description?: string;
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
  background: '#FFF',
  borderRadius: theme.spacing(7),
  boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.10)',
  width: '100%',
}));

const LeftSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
});

const Title = styled(Typography)({
  color: '#8A18FF',
  fontFamily: 'Poppins',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
});

const Description = styled(Typography)({
  color: 'rgba(30, 30, 30, 0.93)',
  fontFamily: 'Poppins',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
});

const StatsSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(20),
}));

const StatBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const StatLabel = styled(Typography)({
  color: '#777',
  fontFamily: 'Poppins',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal',
});

const StatValue = styled(Typography)({
  color: '#3870CA',
  fontFamily: 'Outfit',
  fontSize: '22px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
});

const NavigateButton = styled(IconButton)({
  background: '#E8D1FF',
  width: 40,
  height: 40,
  borderRadius: '50%',
  transition: 'all 200ms ease',
  '&:hover': {
    background: '#E8D1FF',
    transform: 'translateX(4px)',
  },
});

const StudentCard: React.FC<StudentCardProps> = ({
  title = 'Student Attendance',
  description = "Overall student's attendance for this semester",
  attendanceCount,
  totalCount,
  attendancePercentage,
  showNavigateButton = false,
  onNavigate,
  sx,
}) => {
  return (
    <CardContainer sx={sx}>
      <LeftSection>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </LeftSection>

      <StatsSection>
        <StatBox>
          <StatLabel>Attendance Count</StatLabel>
          <StatValue>
            {attendanceCount}/{totalCount}
          </StatValue>
        </StatBox>

        <StatBox>
          <StatLabel>Attendance Percentage</StatLabel>
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
        <ChevronRight sx={{ color: '#8A18FF', fontSize: 28 }} />
      </NavigateButton>
    </CardContainer>
  );
};

export default StudentCard;
