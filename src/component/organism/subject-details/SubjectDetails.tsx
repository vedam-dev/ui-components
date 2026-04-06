import React from 'react';
import { Box, Typography } from '@mui/material';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import { ArrowButton } from '../../atom/button';

export interface ClassListItemRowProps {
  title: string;
  value: string;
  highlight?: boolean; // 👈 new prop
}

export const ClassListItemRow: React.FC<ClassListItemRowProps> = ({ title, value, highlight }) => {
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
          color: highlight ? theme.vd.palette.accentPrimary : theme.vd.palette.textMuted,
          fontSize: '16px',
          fontWeight: highlight ? 600 : 500,
          marginBottom: '3px',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.primary,
          fontSize: '16px',
          fontWeight: 600,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export interface ClassListItemSubjectProps {
  subject: string;
}

export const ClassListItemSubject: React.FC<ClassListItemSubjectProps> = ({ subject }) => {
  const theme = useCoreTheme() as CoreTheme;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        px: theme.spacing(1),
        minWidth: '120px',
        maxWidth: '200px',
      }}
    >
      <Box>
        <Typography
          variant="body1"
          sx={{
            fontSize: '18px',
            fontWeight: 600,
            color: theme.palette.primary.main,
            lineHeight: 1.2,
            // maxWidth:'200px'
          }}
        >
          {subject}
        </Typography>
      </Box>
    </Box>
  );
};

export interface ClassListItemStatusProps {
  status: 'Next Class' | 'Upcoming' | 'Completed' | 'Pending' | 'Partially Completed';
}

export const ClassListItemStatus: React.FC<ClassListItemStatusProps> = ({ status }) => {
  const theme = useCoreTheme() as CoreTheme;
  // Define custom colors for different statuses
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return theme.vd.palette.statusActive;
      case 'Upcoming':
      case 'Pending':
        return theme.vd.palette.accentSecondary;
      case 'Next Class':
      case 'Partially Completed':
        return theme.vd.palette.accentPrimary;
      default:
        return theme.vd.palette.statusActive;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        minWidth: '140px',
        flex: '0 0 auto',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: theme.vd.palette.textMuted,
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '3px',
        }}
      >
        Status
      </Typography>
      <Box
        sx={{
          backgroundColor: getStatusColor(status),
          color: 'white',
          padding: theme.spacing(0, 2.5),
          borderRadius: theme.spacing(25),
          fontSize: '12px',
          fontWeight: 400,
          whiteSpace: 'nowrap',
        }}
      >
        {status}
      </Box>
    </Box>
  );
};

export interface ClassListItemArrowProps {
  onClick?: () => void;
}

export const ClassListItemArrow: React.FC<ClassListItemArrowProps> = ({ onClick }) => {
  return <ArrowButton onClick={onClick} />;
};

// Divider component for the vertical line
export const ClassListItemDivider: React.FC = () => {
  return (
    <Box
      sx={{
        width: '1px',
        height: '24px',
        backgroundColor: '#B6B6B6',
        alignSelf: 'center',
        flex: '0 0 auto',
      }}
    />
  );
};

export interface ClassListItemProps {
  bgColor?: string;
  children: React.ReactNode;
}

const ClassListItem: React.FC<ClassListItemProps> = ({ bgColor, children }) => {
  const theme = useCoreTheme() as CoreTheme;
  return (
    <Box
      sx={{
        borderRadius: theme.spacing(6),
        boxShadow: theme.vd.shadows.y4,
        backgroundColor: bgColor || 'background.paper',
        mb: theme.spacing(3.75),
        width: '100%',
        px: theme.spacing(14.25),
        py: theme.spacing(4),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: theme.spacing(2),
          gap: theme.spacing(2),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ClassListItem;
