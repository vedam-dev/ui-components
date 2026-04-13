import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { alpha, Box, Button, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import Checkbox from '../../atom/checkbox/Checkbox';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export const PERMISSION_MATRIX_TYPES = ['read', 'create', 'update', 'delete'] as const;
export type PermissionMatrixType = (typeof PERMISSION_MATRIX_TYPES)[number];

export interface PermissionMatrixRow {
  featureName: string;
  featureCode: string;
  groupName: string;
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

export interface PermissionMatrixProps {
  permissions: PermissionMatrixRow[];
  onPermissionToggle: (featureCode: string, type: PermissionMatrixType) => void;
  onGroupPermissionToggle: (groupName: string, type: PermissionMatrixType) => void;
  actionLabel?: string;
  permissionsLabel?: string;
  hidePermissionsLabel?: string;
}

const PermissionMatrix: React.FC<PermissionMatrixProps> = ({
  permissions,
  onPermissionToggle,
  onGroupPermissionToggle,
  actionLabel = 'Action',
  permissionsLabel = 'Permissions',
  hidePermissionsLabel = 'Hide Permissions',
}) => {
  const theme = useCoreTheme() as CoreTheme;
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const borderColor = theme.vd?.palette?.borderDefault || theme.palette.grey[300];
  const textStrong = theme.vd?.palette?.textStrong || theme.palette.text.primary;
  const textMuted = theme.vd?.palette?.textMuted || theme.palette.text.secondary;
  const headerBgBase = theme.vd?.palette?.accentPrimary || theme.palette.primary.main;
  const headerBg = alpha(headerBgBase, 0.12);
  const groupBg = alpha(headerBgBase, 0.06);
  const surfaceDefault = theme.vd?.palette?.surfaceDefault || theme.palette.background.paper;
  const spacing = {
    headerPadding: theme.spacing(2, 4),
    rowPadding: theme.spacing(1.5, 4),
    gap: theme.spacing(2),
    chevronMarginLeft: theme.spacing(0.5),
    subItemGap: theme.spacing(1.25),
    subItemDashMarginTop: theme.spacing(-0.25),
  };

  const groupedPermissions = useMemo(() => {
    const groups = new Map<string, PermissionMatrixRow[]>();

    permissions.forEach((permission) => {
      const groupName = permission.groupName || 'Other';
      if (!groups.has(groupName)) {
        groups.set(groupName, []);
      }
      groups.get(groupName)!.push(permission);
    });

    return Array.from(groups.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([groupName, items]) => ({
        groupName,
        items: [...items].sort((a, b) => a.featureName.localeCompare(b.featureName)),
      }));
  }, [permissions]);

  useEffect(() => {
    if (groupedPermissions.length === 0) {
      setExpandedGroups({});
      return;
    }

    setExpandedGroups((prev) => {
      const next: Record<string, boolean> = {};
      groupedPermissions.forEach(({ groupName }) => {
        next[groupName] = prev[groupName] ?? false;
      });
      return next;
    });
  }, [groupedPermissions]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  return (
    <Box
      sx={{
        border: `1px solid ${borderColor}`,
        borderRadius: theme.spacing(1.5),
        overflow: 'hidden',
        backgroundColor: surfaceDefault,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 190px',
          bgcolor: headerBg,
          p: spacing.headerPadding,
          gap: spacing.gap,
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 600,
            color: textStrong,
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          {actionLabel}
        </Typography>
        {PERMISSION_MATRIX_TYPES.map((type) => (
          <Typography
            key={type}
            sx={{
              fontSize: '20px',
              fontWeight: 600,
              color: textStrong,
              fontFamily: 'Outfit, sans-serif',
              textAlign: 'center',
              textTransform: 'capitalize',
            }}
          >
            {type}
          </Typography>
        ))}
        <Box />
      </Box>

      {groupedPermissions.map(({ groupName, items }, groupIndex) => {
        const isExpanded = expandedGroups[groupName] ?? false;
        const title = groupName || `Access ${groupIndex + 1}`;

        return (
          <Box key={groupName || `${groupIndex}`} sx={{ borderTop: `1px solid ${borderColor}` }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 190px',
                p: spacing.rowPadding,
                gap: spacing.gap,
                alignItems: 'center',
                bgcolor: groupBg,
              }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  color: textStrong,
                  fontWeight: 500,
                  fontFamily: 'Outfit, sans-serif',
                }}
              >
                {title}
              </Typography>

              {PERMISSION_MATRIX_TYPES.map((type) => {
                const groupChecked =
                  items.length > 0 && items.every((permission) => permission[type]);
                return (
                  <Box
                    key={type}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Checkbox
                      variant="squared"
                      checked={groupChecked}
                      onChange={() => onGroupPermissionToggle(groupName, type)}
                    />
                  </Box>
                );
              })}

              <Button
                variant="text"
                onClick={() => toggleGroup(groupName)}
                sx={{
                  justifyContent: 'flex-end',
                  textTransform: 'none',
                  color: textStrong,
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '14px',
                  minWidth: 'unset',
                  p: 0,
                  '&:hover': { backgroundColor: 'transparent', opacity: 0.8 },
                }}
              >
                {isExpanded ? hidePermissionsLabel : permissionsLabel}
                <ExpandMoreIcon
                  sx={{
                    ml: spacing.chevronMarginLeft,
                    fontSize: '18px',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(270deg)',
                  }}
                />
              </Button>
            </Box>

            {isExpanded &&
              items.map((permission) => (
                <Box
                  key={permission.featureCode}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 190px',
                    p: spacing.rowPadding,
                    gap: spacing.gap,
                    borderTop: `1px solid ${borderColor}`,
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '18px',
                      color: textMuted,
                      fontFamily: 'Outfit, sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.subItemGap,
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        fontSize: '26px',
                        lineHeight: 1,
                        color: textMuted,
                        mt: spacing.subItemDashMarginTop,
                      }}
                    >
                      -
                    </Box>
                    {permission.featureName}
                  </Typography>

                  {PERMISSION_MATRIX_TYPES.map((type) => (
                    <Box
                      key={type}
                      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Checkbox
                        variant="squared"
                        checked={permission[type]}
                        onChange={() => onPermissionToggle(permission.featureCode, type)}
                      />
                    </Box>
                  ))}
                  <Box />
                </Box>
              ))}
          </Box>
        );
      })}
    </Box>
  );
};

export default PermissionMatrix;
