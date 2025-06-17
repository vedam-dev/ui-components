import { SvgIconOwnProps } from '@mui/material/SvgIcon/SvgIcon';

export type DefaultIconProps = Omit<SvgIconOwnProps, 'children'>;

export type IconName =
  | 'monoToneCart'
  | 'monotoneChevronLeft'
  | 'monotoneChevronRight'
  | 'monotoneChevronDown'
  | 'monotoneNumber'
  | 'monotoneCircle'
  | 'monotoneMenu'
  | 'monotoneCheck'
  | 'monotoneClose'
  | 'monotoneChevronUp'
  | 'monotoneFilter'
  | 'monotoneWallet'
  | 'monotoneToken'
  | 'facebook'
  | 'youtube'
  | 'x'
  | 'instagram'
  | 'lottery.WVRed80'
  | 'openNewWindow';
