import { SvgIcon as BaseSvgIcon } from '@mui/material';
import { FC } from 'react';
import { DefaultIconProps } from './type';

const MonotoneNumber: FC<DefaultIconProps> = ({ ...props }) => {
  return (
    <BaseSvgIcon {...props}>
      <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 .5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z"
          fill={'currentColor'}
          fillRule="nonzero"
        />
      </svg>
    </BaseSvgIcon>
  );
};

export default MonotoneNumber;
