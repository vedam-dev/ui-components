import BasePaper from '@mui/material/Paper';
import { ComponentProps, FC } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import SxOverride from '../../../util/SxOverride';

export interface IPaperProps {
  shadow?: 'y8' | 'y12' | 'y16' | 'none';
}

export type PaperProps = ComponentProps<typeof BasePaper> & IPaperProps;

const Paper: FC<PaperProps> = ({ children, sx, shadow, elevation, ...props }) => {
  const {
    vd: { shadows }
  } = useCoreTheme() as CoreTheme;

  const shadowVal = shadow ? shadows[shadow] : shadows.y12;

  const sxValue = SxOverride({ boxShadow: shadowVal }, sx);

  return (
    <BasePaper elevation={elevation ?? 0} {...props} sx={sxValue}>
      {children}
    </BasePaper>
  );
};

export default Paper;
