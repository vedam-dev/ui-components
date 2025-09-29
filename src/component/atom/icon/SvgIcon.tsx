import { SvgIcon as BaseSvgIcon } from '@mui/material';
import { ComponentProps, FC, FunctionComponent } from 'react';
import MonoToneCart from './MonoToneCart';
import { useCoreTheme } from '../../../theme/core-theme';
import MonotoneChevronLeft from './MonotoneChevronLeft';
import MonotoneChevronRight from './MonotoneChevronRight';
import { DefaultIconProps, IconName } from './type';
import MonotoneChevronDown from './MonotoneChevronDown';
import WVRed80 from './lottery/wv/WVRed80';
import MonotoneCircle from './MonotoneCircle';
import MonotoneNumber from './MonotoneNumber';
import MonotoneMenu from './MonotoneMenu';
import MonotoneCheck from './MonotoneCheck';
import MonotoneClose from './MonotoneClose';
import MonotoneFilter from './MonotoneFilter';
import MonotoneWallet from './MonoToneWallet';
import MonotoneToken from './MonoToneToken';
import MonotoneChevronUp from './MonotoneChevronUp';
import YouTube from './YouTube';
import X from './X';
import Instagram from './Instagram';
import Facebook from './Facebook';
import OpenNewWindow from './OpenNewWindow';

export interface ISvgIconProps {
  iconName?: IconName;
}

export type SvgIconProps = ComponentProps<typeof BaseSvgIcon> & ISvgIconProps;

const componentMap: Record<IconName, FunctionComponent<DefaultIconProps>> = {
  monoToneCart: MonoToneCart,
  monotoneChevronLeft: MonotoneChevronLeft,
  monotoneChevronRight: MonotoneChevronRight,
  monotoneChevronDown: MonotoneChevronDown,
  monotoneChevronUp: MonotoneChevronUp,
  monotoneCircle: MonotoneCircle,
  monotoneNumber: MonotoneNumber,
  monotoneMenu: MonotoneMenu,
  monotoneCheck: MonotoneCheck,
  monotoneClose: MonotoneClose,
  monotoneFilter: MonotoneFilter,
  monotoneWallet: MonotoneWallet,
  monotoneToken: MonotoneToken,
  youtube: YouTube,
  x: X,
  instagram: Instagram,
  facebook: Facebook,
  'lottery.WVRed80': WVRed80,
  openNewWindow: OpenNewWindow,
};

const SvgIcon: FC<SvgIconProps> = ({ iconName, children, htmlColor, ...props }) => {
  const {
    palette: {
      primary: { main },
    },
  } = useCoreTheme();

  const iconColor = htmlColor ?? main;

  if (iconName) {
    const IconComponent = componentMap[iconName];
    return <IconComponent {...props} htmlColor={iconColor} />;
  }

  return (
    <BaseSvgIcon {...props} htmlColor={iconColor}>
      {children}
    </BaseSvgIcon>
  );
};

export default SvgIcon;
