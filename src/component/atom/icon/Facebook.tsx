import { SvgIcon as BaseSvgIcon } from '@mui/material';
import { FC } from 'react';
import { DefaultIconProps } from './type';

const Facebook: FC<DefaultIconProps> = ({ ...props }) => {
  return (
    <BaseSvgIcon {...props}>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path
            d="m9.299 21-.026-8.182H6V9.545h3.273V7.5c0-3.037 1.88-4.5 4.589-4.5 1.298 0 2.413.097 2.738.14v3.173l-1.879.001c-1.473 0-1.758.7-1.758 1.727v1.504h4.287l-1.636 3.273h-2.651V21H9.299z"
            id="7igsq76ksa"
          />
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0z" />
          <mask id="hcf8w9qj3b" fill="#fff">
            <use xlinkHref="#7igsq76ksa" />
          </mask>
          <use fill="currentColor" xlinkHref="#7igsq76ksa" />
          <g mask="url(#hcf8w9qj3b)" fill="currentColor">
            <path d="M0 0h24v24H0z" />
          </g>
        </g>
      </svg>
    </BaseSvgIcon>
  );
};

export default Facebook;
