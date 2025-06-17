import BaseCardHeader from '@mui/material/CardHeader';
import { ComponentProps, FC } from 'react';

export type CardHeaderProps = ComponentProps<typeof BaseCardHeader>;

const CardHeader: FC<CardHeaderProps> = ({ children, ...props }) => {
  return <BaseCardHeader {...props}>{children}</BaseCardHeader>;
};

export default CardHeader;
