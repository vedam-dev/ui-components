import BaseCardActions from '@mui/material/CardActions';
import { ComponentProps, FC } from 'react';

export type CardActionsProps = ComponentProps<typeof BaseCardActions>;

const CardActions: FC<CardActionsProps> = ({ children, ...props }) => {
  return <BaseCardActions {...props}>{children}</BaseCardActions>;
};

export default CardActions;
