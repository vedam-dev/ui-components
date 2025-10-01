import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import React from 'react';

interface BackButtonProps {
  onClick?: () => void;
  size?: string;
  borderColor?: string;
  bgColor?: string;
  iconColor?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  size = '37px',
  borderColor = '#C2C2C2',
  bgColor = '#FFFFFF',
  iconColor = '#000000',
}) => (
  <Button
    onClick={onClick}
    variant="outlined"
    sx={{
      minWidth: size,
      width: size,
      height: size,
      padding: 0,
      borderRadius: 2,
      borderColor: borderColor,
      backgroundColor: bgColor,
      ':hover': {
        backgroundColor: bgColor,
        borderColor: borderColor,
      },
    }}
  >
    <ArrowBackIcon sx={{ color: iconColor }} />
  </Button>
);

export default BackButton;