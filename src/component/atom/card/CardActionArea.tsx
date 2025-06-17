import BaseCardActionArea from '@mui/material/CardActionArea';
import { ComponentProps, FC } from 'react';

export type CardActionAreaProps = ComponentProps<typeof BaseCardActionArea>;

const CardActionArea: FC<CardActionAreaProps> = ({ children, ...props }) => {
  return <BaseCardActionArea {...props}>{children}</BaseCardActionArea>;
};

export default CardActionArea;
