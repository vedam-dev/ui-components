import BaseBox from '@mui/material/Box';
import { ComponentProps, FC } from 'react';

export type BoxOwnProps = ComponentProps<typeof BaseBox>;

const Box: FC<BoxOwnProps> = ({ children, ...props }) => {
  return <BaseBox {...props}>{children}</BaseBox>;
};

export default Box;
