import Box from '@mui/material/Box';
import BaseButton from '@mui/material/Button';
import { DefaultComponentProps, OverridableTypeMap } from '@mui/material/OverridableComponent';
import { Theme } from '@mui/material/styles';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import React, { ComponentProps, FC } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
export type { BoxProps } from '@mui/material/Box';

export type ShapeType = 'round' | 'square';

export interface IButtonProps {
  small?: boolean;
  shapeType?: ShapeType;
  isV2?: boolean; // improved paddings
  isDownloadable?: boolean;
  downloadIconUrl?: string;
}

export type ButtonVariant = 'text' | 'outlined' | 'contained';

export type DefaultColorType = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

export type ButtonProps = ComponentProps<typeof BaseButton> &
  IButtonProps &
  DefaultComponentProps<OverridableTypeMap>;

const Button: FC<ButtonProps> = ({
  small,
  children,
  shapeType,
  style,
  sx,
  isV2 = false,
  isDownloadable = false,
  downloadIconUrl = 'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Icon-3.png',
  ...buttonProps
}) => {
  const theme = useCoreTheme() as CoreTheme;

  const useMaterialButtons = theme.vd.useMaterialButtons;

  const variant: ButtonVariant = (buttonProps.variant ?? 'contained') as ButtonVariant;
  const color: DefaultColorType = (buttonProps.color ?? 'primary') as DefaultColorType;
  const isRound = shapeType === 'round';
  const isSmall = !!small;

  const defaultSizeStyles: React.CSSProperties = isV2 ? theme?.typography.button : {};
  const styles: React.CSSProperties = small ? theme?.vd!.typography.buttonS : defaultSizeStyles;

  const combinedStyles = useMaterialButtons
    ? {}
    : buttonStyles(theme, isRound, isSmall, color, variant, isV2, isDownloadable);

  const combinedInnerStyles = useMaterialButtons
    ? {}
    : buttonInnerStyles(theme, isRound, isSmall, variant);

  return (
    <BaseButton
      {...buttonProps}
      sx={{ ...combinedStyles, ...sx }}
      style={{ ...styles, ...style }}
      variant={variant}
      color={color}
    >
      {/* Center wrapper — ensures text is centered while icon sits absolutely on the right */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        {children}

        {/* Download icon positioned 22px from right edge and vertically centered */
        isDownloadable && (
          <Box
            component="img"
            src={downloadIconUrl}
            alt="Download icon"
            sx={{
              position: 'absolute',
              right: '-110px', 
              top: '50%',
              transform: 'translateY(-50%)',
              width: '38px',
              height: '38px',
              pointerEvents: 'none'
            }}
          />
        )}
      </Box>

      {useMaterialButtons ? null : (
        <Box className={`btnFocusState`} component={`span`} sx={combinedInnerStyles} />
      )}
    </BaseButton>
  );
};

export default Button;

const buttonInnerStyles = (
  theme: CoreTheme,
  isRound: boolean,
  small: boolean,
  variant: ButtonVariant
): SystemStyleObject<Theme> => {
  const buttonOuterValue = variant === 'outlined' ? -5 : -3;
  const defaultStyles: SystemStyleObject<Theme> = {
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    padding: theme.spacing(0),
    borderRadius: theme.spacing(4),
    zIndex: 0,
    top: buttonOuterValue,
    left: buttonOuterValue,
    right: buttonOuterValue,
    bottom: buttonOuterValue,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    border: `solid 2px ${theme.palette['grey']['900']}`
  };

  if (isRound) {
    defaultStyles.borderRadius = theme.spacing(2);
  }

  if (small) {
    defaultStyles.borderRadius = theme.spacing(2);
  }

  return defaultStyles;
};

const buttonStyles = (
  theme: CoreTheme,
  isRound: boolean,
  small: boolean,
  color: DefaultColorType,
  variant: ButtonVariant,
  isV2: boolean,
  isDownloadable: boolean
): SystemStyleObject<Theme> => {
  const roundBorderRadius = small ? theme.spacing(4) : theme.spacing(6);
  const borderRadius = isRound ? roundBorderRadius : theme.spacing(4);
  const v2Paddings = { small: theme.spacing(1.5, 3), large: theme.spacing(2.5, 4) };

  const defaultStyles: SystemStyleObject<Theme> = {
    borderRadius: borderRadius,
    paddingX: isV2 ? v2Paddings.large : theme.spacing(6),
    paddingY: isV2 ? v2Paddings.large : theme.spacing(3),
    borderWidth: 2,
    boxShadow: 'none',
    '&:disabled': {
      borderWidth: 2,
      color: variant === 'contained' ? theme.palette.common.white : theme.palette.grey[300],
      backgroundColor: variant === 'contained' ? theme.palette.grey[300] : 'transparent',
      borderColor: variant !== 'contained' ? theme.palette.grey[300] : 'transparent'
    },
    '> span.btnFocusState': { display: 'none' },
    '&:hover, &:active, &:focus-visible': {
      borderWidth: 2,
      boxShadow: 'none',
      backgroundColor: variant === 'contained' ? theme.palette[color].dark : 'transparent',
      borderColor: variant !== 'contained' ? theme.palette[color].dark : 'transparent'
    },
    '&:focus-visible': {
      borderRadius: borderRadius,
      border: `solid 1px ${theme.palette.common.white}`,
      outline: `solid 2px ${theme.palette.grey[900]}`
    }
  };

  // Downloadable variant — reserve equal left & right padding so the label stays centered
  if (isDownloadable) {

    defaultStyles.borderRadius = '18px';
    defaultStyles.border = '1px solid #FF7829';
    defaultStyles.background = '#FFF';
    defaultStyles.padding = '9px 121px';
    defaultStyles.position = 'relative';
    defaultStyles.color = '#FF7829';
    defaultStyles.minWidth = '200px';

    // Hover / active / focus styles for downloadable
    defaultStyles['&:hover, &:active, &:focus-visible'] = {
      backgroundColor: '#FFF',
      borderColor: '#FF7829',
      color: '#FF7829'
    };
  }

  if (variant === 'text') {
    defaultStyles.textDecoration = 'underline';
    defaultStyles['&:hover, &:active, &:focus-visible'] = {
      textDecoration: 'underline',
      backgroundColor: 'transparent'
    };
  }

  if (isRound) {
    defaultStyles.padding = isV2 ? v2Paddings.large : theme.spacing(3, 6);
  }

  if (small) {
    if (isRound) {
      defaultStyles.padding = isV2 ? v2Paddings.small : theme.spacing(1, 3);
    } else {
      defaultStyles.padding = isV2 ? v2Paddings.small : theme.spacing(1, 2);
    }
  }

  return defaultStyles;
};