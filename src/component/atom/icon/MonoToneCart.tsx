import { SvgIcon as BaseSvgIcon } from '@mui/material';
import { FC } from 'react';
import { DefaultIconProps } from './type';

const MonoToneCart: FC<DefaultIconProps> = ({ ...props }) => {
  return (
    <BaseSvgIcon {...props}>
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.933 7.067h19.8l-2.2 8.066H9.4L7.933 7.067zm-5.373-4.4c-.68 0-1.227.572-1.227 1.283S1.88 5.233 2.56 5.233h2.664l3.082 16.924c.113.605.619 1.043 1.207 1.043H26.28c.68 0 1.227-.572 1.227-1.283s-.547-1.284-1.227-1.284H10.53l-.465-2.566H26.27c.731 0 1.375-.508 1.575-1.246l2.76-10.267c.292-1.09-.49-2.176-1.574-2.176H7.57l-.124-.669c-.112-.604-.618-1.042-1.206-1.042H2.56zm8.307 27.866a2.2 2.2 0 1 0-.002-4.4 2.2 2.2 0 0 0 .002 4.4zm16.866-2.2a2.2 2.2 0 1 0-4.4.002 2.2 2.2 0 0 0 4.4-.002z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </svg>
    </BaseSvgIcon>
  );
};

export default MonoToneCart;
