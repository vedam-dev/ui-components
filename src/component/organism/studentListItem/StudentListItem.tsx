import React from 'react';
import { Box, Typography } from '@mui/material';
import { useCoreTheme, CoreTheme } from '../../../theme/core-theme';
import Button from '../../atom/button/Button';

export interface StudentListItemNameProps {
  name: string;
  email: string;
}

export const StudentListItemName: React.FC<StudentListItemNameProps> = ({ name, email }) => {
  const theme = useCoreTheme() as CoreTheme;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        px: theme.spacing(1),
        flex: 1,
        minWidth: '200px',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#6513AC',
          lineHeight: 1.2,
          marginBottom: '4px',
        }}
      >
        {name}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: '14px',
          fontWeight: 400,
          color: '#000',
          lineHeight: 1.2,
        }}
      >
        {email}
      </Typography>
    </Box>
  );
};

export interface StudentListItemStatusProps {
  status: 'Active' | 'Inactive';
}

export const StudentListItemStatus: React.FC<StudentListItemStatusProps> = ({ status }) => {
  const theme = useCoreTheme() as CoreTheme;

  const getStatusColor = (status: string) => {
    return status === 'Active' ? '#42B657' : '#777777';
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
          color: '#777',
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '8px',
        }}
      >
        Status
      </Typography>
      <Box
        sx={{
          backgroundColor: getStatusColor(status),
          color: 'white',
          padding: theme.spacing(0.5, 3),
          borderRadius: theme.spacing(25),
          fontSize: '14px',
          fontWeight: 400,
          whiteSpace: 'nowrap',
        }}
      >
        {status}
      </Box>
    </Box>
  );
};

export interface StudentListItemButtonProps {
  onClick?: () => void;
}

export const StudentListItemButton: React.FC<StudentListItemButtonProps> = ({ onClick }) => {
  const theme = useCoreTheme() as CoreTheme;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flex: '0 0 auto',
      }}
    >
      <Button
        variant="outlined"
        onClick={onClick}
        sx={{
          borderRadius: theme.spacing(3),
          border: '2px solid #8A18FF',
          color: '#8A18FF',
          fontSize: '16px',
          fontWeight: 500,
        //   textTransform: 'none',
          padding: theme.spacing(2,14.75),
        //   minWidth: '150px',
        //   '&:hover': {
        //     border: '2px solid #8A18FF',
        //     backgroundColor: 'rgba(138, 24, 255, 0.04)',
        //   },
        }}
      >
        View Details
      </Button>
    </Box>
  );
};

export interface StudentListItemProps {
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  onViewDetails?: () => void;
  bgColor?: string;
}

const StudentListItem: React.FC<StudentListItemProps> = ({
  name,
  email,
  status,
  onViewDetails,
  bgColor,
}) => {
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
          gap: theme.spacing(4),
        }}
      >
        <StudentListItemName name={name} email={email} />
        <StudentListItemStatus status={status} />
        <StudentListItemButton onClick={onViewDetails} />
      </Box>
    </Box>
  );
};

export default StudentListItem;