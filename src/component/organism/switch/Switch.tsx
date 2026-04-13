import React, { useState } from 'react';
import { Box, Typography, SxProps, Theme, styled, CircularProgress } from '@mui/material';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export interface RoleOption {
  value: string;
  role: string;
  campus: string;
  institutionName: string;
  disabled?: boolean;
}

export interface SwitchRoleProps {
  options?: RoleOption[];
  onSwitchRole?: (role: RoleOption) => Promise<void> | void;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  title?: string;
  subtitle?: string;
  loadingValue?: string;
}

const Outer = styled(Box)(({ theme }) => ({
  padding: '26px 32px 32px 32px',
  borderRadius: theme.spacing(9),
  background: theme.palette.common.white,
  boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.10)',
  border: 'none',
  width: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '22px',
  fontWeight: 600,
  color: (theme as CoreTheme).vd.palette.textStrong,
  lineHeight: 'normal',
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: (theme as CoreTheme).vd.palette.textMuted,
  fontSize: '20px',
  fontWeight: 400,
  lineHeight: 'normal',
}));

const CardsRow = styled(Box)({
  display: 'flex',
  gap: '16px',
  marginTop: '34px',
  alignItems: 'stretch',
  flexWrap: 'wrap',
});

const Card = styled(Box)<{ disabled?: boolean }>(({ theme, disabled }) => ({
  display: 'flex',
  width: '230px',
  padding: '16px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '6px',
  flexShrink: 0,
  borderRadius: theme.spacing(5),
  cursor: disabled ? 'not-allowed' : 'default',
  opacity: disabled ? 0.5 : 1,
  boxSizing: 'border-box',
}));

const CampusLabel = styled(Typography)(({ theme }) => ({
  color: (theme as CoreTheme).vd.palette.textMuted,
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: 'normal',
  alignSelf: 'flex-start',
}));

const RoleLabel = styled(Typography)(({ theme }) => ({
  color: (theme as CoreTheme).vd.palette.accentPrimary,
  fontSize: '22px',
  fontWeight: 600,
  lineHeight: '24px',
  alignSelf: 'flex-start',
}));

const InstitutionName = styled(Typography)(({ theme }) => ({
  color: (theme as CoreTheme).vd.palette.textStrong,
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '18px',
  alignSelf: 'flex-start',
  height: '36px',
  flex: 1,
}));

const SwitchButton = styled('button')<{ isLoading?: boolean }>(({ theme, isLoading }) => ({
  width: '100%',
  padding: '8px 20px',
  borderRadius: '14px',
  maxHeight: '40px',
  border: `1px solid ${(theme as CoreTheme).vd.palette.accentPrimary}`,
  background: 'transparent',
  color: (theme as CoreTheme).vd.palette.accentPrimary,
  fontSize: '15px',
  fontWeight: 500,
  cursor: isLoading ? 'default' : 'pointer',
  lineHeight: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  transition: 'all 200ms ease',
  minHeight: '40px',
  alignSelf: 'stretch',
  '&:hover': {
    background: 'transparent',
  },
  '&:active': {
    transform: isLoading ? 'none' : 'scale(0.98)',
  },
}));

const SwitchRole: React.FC<SwitchRoleProps> = ({
  options = [],
  onSwitchRole,
  sx,
  disabled = false,
  title = 'Your Roles',
  subtitle = 'Choose a role to switch your access level',
  loadingValue,
}) => {
  const theme = useCoreTheme() as CoreTheme;
  const [internalLoading, setInternalLoading] = useState<string | undefined>(undefined);

  const activeLoading = loadingValue ?? internalLoading;

  const handleSwitch = async (opt: RoleOption) => {
    if (disabled || opt.disabled || activeLoading) return;
    if (onSwitchRole) {
      const result = onSwitchRole(opt);
      if (result instanceof Promise) {
        setInternalLoading(opt.value);
        try {
          await result;
        } finally {
          setInternalLoading(undefined);
        }
      }
    }
  };

  return (
    <Outer sx={sx}>
      <Box>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Box>

      <CardsRow role="list" aria-label={title}>
        {options.map((opt, index) => {
          const isLoading = activeLoading === opt.value;
          const isDisabled = disabled || opt.disabled || (!!activeLoading && !isLoading);

          const cardBackground =
            index % 2 === 0
              ? `linear-gradient(180deg, ${theme.palette.common.white} 0%, ${theme.vd.palette.accentPrimaryLight} 100%)`
              : `linear-gradient(180deg, ${theme.palette.common.white} 0%, ${theme.palette.secondary[50]} 100%)`;

          const cardBorder =
            index % 2 === 0
              ? `1px solid ${theme.palette.primary[200]}`
              : `1px solid ${theme.palette.secondary[200]}`;

          return (
            <Card
              key={opt.value}
              role="listitem"
              aria-label={`${opt.role} at ${opt.campus}`}
              disabled={isDisabled}
              style={{
                background: cardBackground,
                border: cardBorder,
              }}
            >
              <CampusLabel>{opt.campus}</CampusLabel>
              <RoleLabel>{opt.role}</RoleLabel>
              <InstitutionName>{opt.institutionName}</InstitutionName>

              <SwitchButton
                sx={{ mt: '4px' }}
                isLoading={isLoading}
                disabled={isDisabled}
                onClick={() => handleSwitch(opt)}
                aria-label={`Switch to ${opt.role} at ${opt.campus}`}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <CircularProgress
                    size={18}
                    thickness={3}
                    sx={{ color: theme.vd.palette.accentPrimary }}
                  />
                ) : (
                  'Switch Role'
                )}
              </SwitchButton>
            </Card>
          );
        })}
      </CardsRow>
    </Outer>
  );
};

export default SwitchRole;
