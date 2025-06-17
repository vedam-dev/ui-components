import BaseCardContent from '@mui/material/CardContent';
import { ComponentProps, FC } from 'react';

export type CardContentProps = ComponentProps<typeof BaseCardContent>;

const CardContent: FC<CardContentProps> = ({ children, ...props }) => {
  return <BaseCardContent {...props}>{children}</BaseCardContent>;
};

export default CardContent;
