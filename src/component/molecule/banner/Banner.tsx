import React from 'react';
import { styled } from '@mui/system';
import { Box } from '../../atom/box';
import { BoxProps } from '@mui/material';

export interface IBannerProps extends BoxProps {
  imageUrl: string;
  label?: string;
  title?: string;
  altText?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '0.5rem',
});

const Banner: React.FC<IBannerProps> = ({ imageUrl, label, title, altText, onClick, ...props }) => {
  return (
    <Box {...props} onClick={onClick}>
      <StyledImage src={imageUrl} alt={altText} aria-label={label} title={title} />
    </Box>
  );
};

export default Banner;
