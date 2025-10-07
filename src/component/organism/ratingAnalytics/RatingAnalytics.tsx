import React from 'react';
import { Box, Typography } from '@mui/material';
import { useCoreTheme, CoreTheme } from '../../../theme/core-theme';

// Individual column components
export interface RatingAnalyticsDateProps {
  date: string;
  day: string;
}

export const RatingAnalyticsDate: React.FC<RatingAnalyticsDateProps> = ({ date, day }) => {
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
          color: '#999',
          fontSize: '16px',
          fontWeight: 500,
        }}
      >
        Date
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#333',
          fontSize: '18px',
          fontWeight: 600,
        }}
      >
        {date}
      </Typography>
    </Box>
  );
};

export interface RatingAnalyticsDayProps {
  day: string;
}

export const RatingAnalyticsDay: React.FC<RatingAnalyticsDayProps> = ({ day }) => {
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
          color: '#999',
          fontSize: '16px',
          fontWeight: 500,
        }}
      >
        Day
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#333',
          fontSize: '18px',
          fontWeight: 600,
        }}
      >
        {day}
      </Typography>
    </Box>
  );
};

export interface RatingAnalyticsTitleProps {
  title: string;
}

export const RatingAnalyticsTitle: React.FC<RatingAnalyticsTitleProps> = ({ title }) => {
  const theme = useCoreTheme() as CoreTheme;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: '1 1 0',
        minWidth: '200px',
        px: theme.spacing(1),
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: '#4A90E2',
          fontSize: '20px',
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export interface RatingAnalyticsRatingProps {
  rating: string;
}

export const RatingAnalyticsRating: React.FC<RatingAnalyticsRatingProps> = ({ rating }) => {
  const theme = useCoreTheme() as CoreTheme;

  // Determine color based on rating value
  const getRatingColor = (rating: string): string => {
    const numRating = parseFloat(rating);
    if (numRating >= 4.0) return '#25A32E';
    if (numRating >= 3.0) return '#FF6B6B';
    return '#DA1414'; // Green for low ratings
  };

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
          color: '#999',
          fontSize: '16px',
          fontWeight: 500,
        }}
      >
        Rating
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: getRatingColor(rating),
          fontSize: '18px',
          fontWeight: 600,
        }}
      >
        {rating}
      </Typography>
    </Box>
  );
};

// Main container component
export interface LectureListItemProps {
  bgColor?: string;
  borderColor?: string;
  children: React.ReactNode;
}

const LectureListItem: React.FC<LectureListItemProps> = ({
  bgColor = '#FFFFFF',
  borderColor,
  children,
}) => {
  const theme = useCoreTheme() as CoreTheme;

  return (
    <Box
      sx={{
        borderRadius: theme.spacing(6),
        boxShadow: theme.vd.shadows.y4,
        backgroundColor: bgColor,
        mb: '20px',
        width: '100%',
        px: theme.spacing(13.75),
        py: theme.spacing(5.5),
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

export default LectureListItem;
