import React from 'react';
import { Box, Typography } from '@mui/material';
import { useCoreTheme, CoreTheme } from '../../../theme/core-theme';

export interface ContestListItemTitleProps {
  contestNumber: string;
}

export const ContestListItemTitle: React.FC<ContestListItemTitleProps> = ({ contestNumber }) => {
  const theme = useCoreTheme() as CoreTheme;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        px: theme.spacing(1),
        minWidth: '120px',
        flex: '0 0 auto',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: '#8A18FF',
          fontSize: '20px',
          fontWeight: 700,
        }}
      >
        {contestNumber}
      </Typography>
    </Box>
  );
};

export interface ContestListItemSubjectProps {
  subject: string;
}

export const ContestListItemSubject: React.FC<ContestListItemSubjectProps> = ({ subject }) => {
  const theme = useCoreTheme() as CoreTheme;
  const words = subject.split(' ');
  const shouldSplit = words.length === 2;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        px: theme.spacing(1),
        minWidth: '120px',
        maxWidth: '200px',
        flex: '1 1 auto',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: '22px',
          fontWeight: 600,
          color: '#3870CA',
          lineHeight: 1.2,
        }}
      >
        {shouldSplit ? (
          <>
            {words[0]}
            <br />
            {words[1]}
          </>
        ) : (
          subject
        )}
      </Typography>
    </Box>
  );
};

export interface ContestListItemDateProps {
  date: string;
}

export const ContestListItemDate: React.FC<ContestListItemDateProps> = ({ date }) => {
  const theme = useCoreTheme() as CoreTheme;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        px: theme.spacing(1),
        minWidth: '120px',
        flex: '0 0 auto',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: '#777',
          fontSize: '16px',
          lineHeight: '20px',
          fontWeight: 500,
          marginBottom: '6px',
        }}
      >
        Date
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#000',
          fontSize: '18px',
          lineHeight: '24px',
          fontWeight: 600,
        }}
      >
        {date}
      </Typography>
    </Box>
  );
};

export interface ContestListItemStatusProps {
  status: 'Submitted' | 'Absent';
}

export const ContestListItemStatus: React.FC<ContestListItemStatusProps> = ({ status }) => {
  const theme = useCoreTheme() as CoreTheme;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted':
        return '#8A18FF';
      case 'Absent':
        return '#FF0000';
      default:
        return '#8A18FF';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        px: theme.spacing(1),
        minWidth: '120px',
        flex: '0 0 auto',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: '#777',
          fontSize: '16px',
          lineHeight: '20px',
          fontWeight: 500,
          marginBottom: '6px',
        }}
      >
        Status
      </Typography>
      <Box
        sx={{
          backgroundColor: getStatusColor(status),
          color: 'white',
          padding: theme.spacing(0.75, 2.5),
          borderRadius: theme.spacing(25),
          fontSize: '12px',
          fontWeight: 500,
          whiteSpace: 'nowrap',
        }}
      >
        {status}
      </Box>
    </Box>
  );
};

export interface ContestListItemScoreProps {
  score: string;
}

export const ContestListItemScore: React.FC<ContestListItemScoreProps> = ({ score }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        minWidth: '60px',
        flex: '0 0 auto',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: '#777',
          fontSize: '16px',
          lineHeight: '20px',
          fontWeight: 500,
          marginBottom: '6px',
        }}
      >
        Score
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#000',
          fontSize: '18px',
          lineHeight: '24px',
          fontWeight: 600,
        }}
      >
        {score}
      </Typography>
    </Box>
  );
};

export interface ContestListItemProps {
  bgColor?: string;
  borderColor?: string;
  children: React.ReactNode;
}

const ContestListItem: React.FC<ContestListItemProps> = ({ bgColor, borderColor, children }) => {
  const theme = useCoreTheme() as CoreTheme;

  return (
    <Box
      sx={{
        borderRadius: theme.spacing(6),
        boxShadow: theme.vd.shadows.y4,
        backgroundColor: bgColor || '#FFFFFF',
        border: borderColor ? `2px solid ${borderColor}` : 'none',
        mb: theme.spacing(3),
        width: '100%',
        px: theme.spacing(13.25),
        py: theme.spacing(5.5),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: theme.spacing(2),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ContestListItem;
