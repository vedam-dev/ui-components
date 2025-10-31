import React from 'react';
import { Box, Typography } from '@mui/material';
import { useCoreTheme, CoreTheme } from '../../../theme/core-theme';
import Button from '../../atom/button/Button';

export interface StudentListItemNameProps {
  name: string;
  email: string;
}

export const StudentListItemName: React.FC<StudentListItemNameProps> = ({ name, email }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
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
          lineHeight: '23px',
          marginBottom: '8px',
        }}
      >
        {name}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: '16px',
          fontWeight: 500,
          color: '#000',
          lineHeight: '21px',
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
          fontWeight: 500,
          marginBottom: '6px',
          lineHeight: '20px',
        }}
      >
        Status
      </Typography>
      <Box
        sx={{
          backgroundColor: getStatusColor(status),
          color: 'white',
          padding: theme.spacing(1, 2.5),
          borderRadius: theme.spacing(25),
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '18px',
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
          padding: theme.spacing(2, 14.75),
        }}
      >
        View Details
      </Button>
    </Box>
  );
};

export interface StudentListItemProps {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  onViewDetails?: () => void;
  bgColor?: string;
}

const StudentListItem: React.FC<StudentListItemProps> = ({
  id,
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
        mb: theme.spacing(4.5),
        width: '100%',
        px: theme.spacing(13.5),
        py: theme.spacing(5.25),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
