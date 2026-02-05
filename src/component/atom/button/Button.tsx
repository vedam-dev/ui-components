import Box from '@mui/material/Box';
import BaseButton from '@mui/material/Button';
import { DefaultComponentProps, OverridableTypeMap } from '@mui/material/OverridableComponent';
import { Theme } from '@mui/material/styles';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import React, { ComponentProps, FC } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
export type { BoxProps } from '@mui/material/Box';

export type ShapeType = 'round' | 'square';
export type IconPosition = 'left' | 'right' | 'both';

export interface IButtonProps {
  small?: boolean;
  shapeType?: ShapeType;
  isV2?: boolean; // improved paddings
  isDownloadable?: boolean;
  downloadIconUrl?: string;
  leftIconUrl?: string | 'copy'; 
  iconPosition?: IconPosition;
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
  downloadIconUrl = 'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/others/Vector-4.png',
  leftIconUrl,
  iconPosition = 'right',
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

  const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="18" viewBox="0 0 15 18" fill="none">
      <path d="M1.7373 3.5127V15.7627H11.3623V17.4873H1.75C1.27209 17.4873 0.862844 17.3179 0.522461 16.9775C0.182078 16.6372 0.0126953 16.2279 0.0126953 15.75V3.5127H1.7373ZM5.25 0.0126953H13.125C13.6029 0.0126953 14.0122 0.182078 14.3525 0.522461C14.6929 0.862844 14.8623 1.27209 14.8623 1.75V12.25C14.8623 12.7279 14.6929 13.1372 14.3525 13.4775C14.0122 13.8179 13.6029 13.9873 13.125 13.9873H5.25C4.77209 13.9873 4.36284 13.8179 4.02246 13.4775C3.68208 13.1372 3.5127 12.7279 3.5127 12.25V1.75C3.5127 1.27209 3.68208 0.862844 4.02246 0.522461C4.36284 0.182078 4.77209 0.0126953 5.25 0.0126953ZM5.2373 12.2627H13.1377V1.7373H5.2373V12.2627Z" fill="#777777" stroke="#777777" strokeWidth="0.025"/>
    </svg>
  );

  const renderIcon = (url: string | 'copy', alt: string) => {
    if (url === 'copy') {
      return (
        <Box
          sx={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.10)',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CopyIcon />
        </Box>
      );
    }
    
    return (
      <Box
        sx={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.10)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={url}
          alt={alt}
          sx={{
            width: '18px',
            height: '18px',
            objectFit: 'contain',
          }}
        />
      </Box>
    );
  };

  return (
    <BaseButton
      {...buttonProps}
      sx={{ ...combinedStyles, ...sx }}
      style={{ ...styles, ...style }}
      variant={variant}
      color={color}
    >
      {isDownloadable ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
          }}
        >
          {/* Left icon - always reserve space for centering */}
          <Box sx={{ width: '38px', flexShrink: 0 }}>
            {(iconPosition === 'left' || iconPosition === 'both') && 
              (leftIconUrl ? renderIcon(leftIconUrl, 'Left icon') : null)}
          </Box>

          {/* Text content with fixed width and ellipsis */}
          <Box
            sx={{
              width: '182px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {children}
          </Box>

          <Box sx={{ width: '38px', flexShrink: 0 }}>
            {(iconPosition === 'right' || iconPosition === 'both') && 
              renderIcon(downloadIconUrl, 'Download icon')}
          </Box>
        </Box>
      ) : (
        /* Standard centered layout for non-downloadable buttons */
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {children}
        </Box>
      )}

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
    border: `solid 2px ${theme.palette['grey']['900']}`,
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
      borderColor: variant !== 'contained' ? theme.palette.grey[300] : 'transparent',
    },
    '> span.btnFocusState': { display: 'none' },
    '&:hover, &:active, &:focus-visible': {
      borderWidth: 2,
      boxShadow: 'none',
      backgroundColor: variant === 'contained' ? theme.palette[color].dark : 'transparent',
      borderColor: variant !== 'contained' ? theme.palette[color].dark : 'transparent',
    },
    '&:focus-visible': {
      borderRadius: borderRadius,
      border: `solid 1px ${theme.palette.common.white}`,
      outline: `solid 2px ${theme.palette.grey[900]}`,
    },
  };

  // Downloadable variant — uses flexible layout with gap
  if (isDownloadable) {
    defaultStyles.borderRadius = '18px';
    defaultStyles.border = '1px solid #FF7829';
    defaultStyles.background = '#FFF';
    defaultStyles.padding = '12px 14px';
    defaultStyles.position = 'relative';
    defaultStyles.color = '#FF7829';
    defaultStyles.minWidth = 'auto';
    defaultStyles.fontWeight = 500;
    defaultStyles.fontSize = '18px';

    // Hover / active / focus styles for downloadable
    defaultStyles['&:hover, &:active, &:focus-visible'] = {
      backgroundColor: '#FFF',
      borderColor: '#FF7829',
      color: '#FF7829',
    };
  }

  if (variant === 'text') {
    defaultStyles.textDecoration = 'underline';
    defaultStyles['&:hover, &:active, &:focus-visible'] = {
      textDecoration: 'underline',
      backgroundColor: 'transparent',
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