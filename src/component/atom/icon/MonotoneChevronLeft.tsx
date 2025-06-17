import { SvgIcon as BaseSvgIcon } from '@mui/material';
import { FC } from 'react';
import { DefaultIconProps } from './type';

const MonotoneChevronLeft: FC<DefaultIconProps> = ({ ...props }) => {
  return (
    <BaseSvgIcon {...props}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.003 12.016c0 .333.116.656.329.912l7.139 8.557a1.43 1.43 0 0 0 2.013.185c.607-.504.69-1.404.186-2.01l-6.397-7.644 6.168-7.644a1.425 1.425 0 0 0-.214-2.01 1.429 1.429 0 0 0-2.084.199l-6.897 8.556c-.18.264-.265.58-.243.899z"
          fill={'currentColor'}
          fillRule="nonzero"
        />
      </svg>
    </BaseSvgIcon>
  );
};

export default MonotoneChevronLeft;
