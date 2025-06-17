import { Typography as BaseTypography } from '@mui/material';
import React, { ComponentProps, FC } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import { DefaultComponentProps, OverridableTypeMap } from '@mui/material/OverridableComponent';

export interface ITypographyProps {
  isButtonS?: boolean;
}

export type TypographyProps = ComponentProps<typeof BaseTypography> &
  ITypographyProps &
  DefaultComponentProps<OverridableTypeMap>;

const Typography: FC<TypographyProps> = ({ children, isButtonS, ...props }) => {
  const theme = useCoreTheme() as CoreTheme;
  let styles: React.CSSProperties = {};
  if (isButtonS && props.variant === 'button') {
    styles = theme.pbl.typography.buttonS;
  }
  return (
    <BaseTypography {...props} style={styles}>
      {children}
    </BaseTypography>
  );
};

export default Typography;
