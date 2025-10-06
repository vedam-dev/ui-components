import React from 'react';
import { Box, Typography } from '@mui/material';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

interface StudentAttendanceCardProps {
  name: string;
  email: string;
  attendance: number;
  value:string;
}

const StudentAttendanceCard: React.FC<StudentAttendanceCardProps> = ({
  name,
  email,
  attendance,
  value
}) => {
  const theme = useCoreTheme() as CoreTheme;
  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderRadius: theme.spacing(6),
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        py: theme.spacing(5.5),
        pl: theme.spacing(12.5),
        pr: theme.spacing(34),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'box-shadow 0.2s',
      }}
    >
      <Box>
        <Typography
          sx={{
            color: '#6513AC',
            fontFamily: 'Outfit',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal',
            mb: '8px',
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            color: '#000',
            fontFamily: 'Outfit',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
          }}
        >
          {email}
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'right' }}>
        <Typography
          sx={{
            color: '#777',
            fontFamily: 'Outfit',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            mb: '8px',
          }}
        >
          {value || 'Average Attendance'}
        </Typography>
        <Typography
          sx={{
            color: '#8A18FF',
            fontFamily: 'Outfit',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 600,
            textAlign: 'left',
            lineHeight: 'normal',
          }}
        >
          {attendance}%
        </Typography>
      </Box>
    </Box>
  );
};

export default StudentAttendanceCard;
