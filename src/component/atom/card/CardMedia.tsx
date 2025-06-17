import BaseCardMedia from '@mui/material/CardMedia';
import { ComponentProps, FC } from 'react';

export type CardMediaProps = ComponentProps<typeof BaseCardMedia>;

const CardMedia: FC<CardMediaProps> = ({ children, ...props }) => {
  return <BaseCardMedia {...props}>{children}</BaseCardMedia>;
};

export default CardMedia;
