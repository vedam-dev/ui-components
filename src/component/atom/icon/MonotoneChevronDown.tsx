import { SvgIcon as BaseSvgIcon } from '@mui/material';
import { FC } from 'react';
import { DefaultIconProps } from './type';

const MonotoneChevronRight: FC<DefaultIconProps> = ({ ...props }) => {
  return (
    <BaseSvgIcon {...props}>
      <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.008 8.998a.713.713 0 0 0 .456-.164l4.278-3.57a.715.715 0 0 0-.912-1.099L6.008 7.363 2.186 4.28a.712.712 0 0 0-1.005.107.714.714 0 0 0 .1 1.043l4.278 3.448c.132.09.29.132.449.121z"
          fill={'currentColor'}
          fillRule="nonzero"
        />
      </svg>
    </BaseSvgIcon>
  );
};

export default MonotoneChevronRight;
