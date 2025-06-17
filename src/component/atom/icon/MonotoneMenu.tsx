import { SvgIcon as BaseSvgIcon } from '@mui/material';
import { FC } from 'react';
import { DefaultIconProps } from './type';

const MonotoneMenu: FC<DefaultIconProps> = ({ ...props }) => {
  return (
    <BaseSvgIcon {...props}>
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <g
          transform="translate(1.333 6.667)"
          stroke={'currentColor'}
          fill={'currentColor'}
          fillRule="evenodd"
        >
          <rect x=".5" y=".5" width="28.333" height="2.067" rx="1.033" />
          <rect x=".5" y="8.5" width="21.667" height="2.067" rx="1.033" />
          <rect x=".5" y="16.5" width="21.667" height="2.067" rx="1.033" />
        </g>
      </svg>
    </BaseSvgIcon>
  );
};

export default MonotoneMenu;
