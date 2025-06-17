import { SvgIcon as BaseSvgIcon } from '@mui/material';
import { FC } from 'react';
import { DefaultIconProps } from './type';

const YouTube: FC<DefaultIconProps> = ({ ...props }) => {
  return (
    <BaseSvgIcon {...props}>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path
            d="M21.833 8S21.667 6.583 21 6c-.75-.833-1.583-.833-2-.833C16.167 5 12 5 12 5s-4.167 0-7 .167C4.583 5.25 3.75 5.25 3 6c-.583.583-.833 2-.833 2S2 9.583 2 11.25v1.5c0 1.583.167 3.25.167 3.25s.166 1.417.833 2c.75.833 1.75.75 2.167.833C6.75 19 12 19 12 19s4.167 0 7-.25c.417-.083 1.25-.083 2-.833.583-.584.833-2 .833-2s.167-1.584.167-3.25v-1.5C22 9.583 21.833 8 21.833 8zM9.917 14.583V9l5.416 2.833-5.416 2.75z"
            id="edviq5g8qa"
          />
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0z" />
          <mask id="p59d0sbtfb" fill="#fff">
            <use xlinkHref="#edviq5g8qa" />
          </mask>
          <use fill="currentColor" xlinkHref="#edviq5g8qa" />
          <g mask="url(#p59d0sbtfb)" fill="currentColor">
            <path d="M0 0h24v24H0z" />
          </g>
        </g>
      </svg>
    </BaseSvgIcon>
  );
};

export default YouTube;
