import { SvgIcon as BaseSvgIcon } from '@mui/material';
import { FC } from 'react';
import { DefaultIconProps } from './type';

const MonotoneChevronRight: FC<DefaultIconProps> = ({ ...props }) => {
  return (
    <BaseSvgIcon {...props}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.997 12.016c0 .333-.116.656-.329.912L9.53 21.485a1.43 1.43 0 0 1-2.013.185 1.427 1.427 0 0 1-.186-2.01l6.397-7.644-6.168-7.644a1.425 1.425 0 0 1 .214-2.01 1.429 1.429 0 0 1 2.084.199l6.897 8.556c.18.264.265.58.243.899z"
          fill={'currentColor'}
          fillRule="nonzero"
        />
      </svg>
    </BaseSvgIcon>
  );
};

export default MonotoneChevronRight;
