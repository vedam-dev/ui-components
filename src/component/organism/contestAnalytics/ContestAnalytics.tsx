import React from 'react';
import { Box, Typography } from '@mui/material';
import { useCoreTheme, CoreTheme } from '../../../theme/core-theme';

// Individual column components
export interface ContestAnalyticsTitleProps {
  contestNumber: string;
}

export const ContestAnalyticsTitle: React.FC<ContestAnalyticsTitleProps> = ({ contestNumber }) => {
  const theme = useCoreTheme() as CoreTheme;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: '1 1 0',
        minWidth: 0,
        px: theme.spacing(1),
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: '#8A18FF',
          fontSize: '20px',
          fontWeight: 600,
        }}
      >
        {contestNumber}
      </Typography>
    </Box>
  );
};

export interface ContestAnalyticsDateProps {
  date: string;
}

export const ContestAnalyticsDate: React.FC<ContestAnalyticsDateProps> = ({ date }) => {
  const theme = useCoreTheme() as CoreTheme;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: '1 1 0',
        minWidth: 0,
        px: theme.spacing(1),
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: '#777',
          fontSize: '16px',
          fontWeight: 500,
        }}
      >
        Date
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#000',
          fontSize: '18px',
          fontWeight: 600,
        }}
      >
        {date}
      </Typography>
    </Box>
  );
};

export interface ContestAnalyticsSubmissionsProps {
  submissions: string;
}

export const ContestAnalyticsSubmissions: React.FC<ContestAnalyticsSubmissionsProps> = ({
  submissions,
}) => {
  const theme = useCoreTheme() as CoreTheme;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: '1 1 0',
        minWidth: 0,
        px: theme.spacing(1),
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: '#777',
          fontSize: '16px',
          fontWeight: 500,
        }}
      >
        Submissions
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#000',
          fontSize: '18px',
          fontWeight: 600,
        }}
      >
        {submissions}
      </Typography>
    </Box>
  );
};

export interface ContestAnalyticsAvgScoreProps {
  avgScore: string;
}

export const ContestAnalyticsAvgScore: React.FC<ContestAnalyticsAvgScoreProps> = ({ avgScore }) => {
  const theme = useCoreTheme() as CoreTheme;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: '1 1 0',
        minWidth: 0,
        px: theme.spacing(1),
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: '#777',
          fontSize: '16px',
          fontWeight: 500,
        }}
      >
        Average Score
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#000',
          fontSize: '18px',
          fontWeight: 600,
        }}
      >
        {avgScore}
      </Typography>
    </Box>
  );
};

// Main container component
export interface ContestAnalyticsListItemProps {
  bgColor?: string;
  borderColor?: string;
  children: React.ReactNode;
}

const ContestAnalyticsListItem: React.FC<ContestAnalyticsListItemProps> = ({
  bgColor: _bgColor,
  borderColor: _borderColor,
  children,
}) => {
  const theme = useCoreTheme() as CoreTheme;

  return (
    <Box
      sx={{
        borderRadius: theme.spacing(6),
        boxShadow: theme.vd.shadows.y4,
        backgroundColor: '#FFFFFF',
        mb: '20px',
        width: '100%',
        px: theme.spacing(12.25),
        py: theme.spacing(5.25),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '164px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ContestAnalyticsListItem;
