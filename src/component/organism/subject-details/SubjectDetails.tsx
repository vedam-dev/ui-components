import React from "react";
import { Box, Typography } from "@mui/material";
import { useCoreTheme, CoreTheme } from '../../../theme/core-theme';

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
          color: highlight ? '#8A18FF' : '#777', 
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
          color:'#000',
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
              color: '#3870CA',
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
        return '#42B657'; 
      case 'Upcoming':
      case 'Pending':
        return '#F97D03'; 
      case 'Next Class':
      case 'Partially Completed':
        return '#983DF6';
      default:
        return '#42B657';
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
          color: '#777',
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
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        flex: '0 0 auto',
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          width: '39px',
          height: '39px',
          borderRadius: '39px',
          background: '#E8D1FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': onClick ? {
            background: '#D4B8FF',
          } : {},
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="10" 
          height="19" 
          viewBox="0 0 10 19" 
          fill="none"
        >
          <path 
            d="M9.75562 10.0788L1.42322 18.2602C1.3458 18.3363 1.2539 18.3965 1.15275 18.4377C1.0516 18.4788 0.943187 18.5 0.833703 18.5C0.72422 18.5 0.615808 18.4788 0.514659 18.4377C0.413509 18.3965 0.321602 18.3363 0.244186 18.2602C0.166769 18.1842 0.105359 18.094 0.0634615 17.9947C0.021564 17.8953 0 17.7889 0 17.6814C0 17.5739 0.021564 17.4675 0.0634615 17.3681C0.105359 17.2688 0.166769 17.1786 0.244186 17.1026L7.98811 9.5L0.244186 1.89743C0.0878359 1.74391 -1.64741e-09 1.5357 0 1.3186C1.64741e-09 1.10149 0.0878359 0.893277 0.244186 0.739761C0.400535 0.586245 0.612592 0.5 0.833703 0.5C1.05482 0.5 1.26687 0.586245 1.42322 0.739761L9.75562 8.92116C9.83309 8.99715 9.89455 9.08738 9.93649 9.1867C9.97842 9.28602 10 9.39248 10 9.5C10 9.60752 9.97842 9.71398 9.93649 9.8133C9.89455 9.91262 9.83309 10.0028 9.75562 10.0788Z" 
            fill="#8A18FF"
          />
        </svg>
      </Box>
    </Box>
  );
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
        py: theme.spacing(6),
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